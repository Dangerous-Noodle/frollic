const uuid = require('uuid');
const bcrypt = require('bcrypt');
const db = require('../models/dbModel');
const { createResponse } = require('../models/responseModel');

function genCookieParams() {
  const ONE_MONTH = 1000 * 60 * 60 * 24 * 30;
  return { maxAge: ONE_MONTH, httpOnly: true, path: '/' };
}

// Place this in app.use so it is used globally
function globalAuthMiddleware(req, res, next) {

  console.log('inside global auth middleware')

  // set default values for res.locals.authInfo object
  // authInfo object model
  res.locals.authInfo = { 
    authenticated: false,
    ssid: null,
    username: null,
    user_id: null,
    message: 'No SSID cookie found'
  };

  // if there is no ssid cookie or falsy value
  if (!req.cookies.ssid) return next();

  const unverifiedSsid = req.cookies.ssid;
  if (!uuid.validate(unverifiedSsid)) return next();
  // check ssid against the database table session_log
  const queryString = `
    SELECT l.user_id, u.username, l.ssid
    FROM session_log l
    INNER JOIN users u 
    ON l.user_id = u._id
    WHERE l.isActive = true
    AND CURRENT_TIMESTAMP < l.expiration_time
    AND l.ssid = $1
    `;
  const input = [unverifiedSsid];
  
  db.query(queryString, input)
    .then(data => {
      console.log(data.rows);
      if (!data.rows.length) {
        res.locals.authInfo.message = 'Invalid SSID cookie';
        return next();
      } 
      const { user_id, username, ssid } = data.rows[0];
      res.locals.authInfo = { authenticated: true, user_id, username, ssid, message: 'Success' };
      console.log('about to call next');
      return next();
    })
    .catch(err => {
      console.log('error querying db in global auth middleware')
      return next(err);
    } );
}


function signupUser(req, res, next) {

  // validate body of request

  if (!req.body.auth) return res.status(400).json(createResponse(false, 400, 'Error: please specify username and password'));
  const { username, password } = req.body.auth;
  if (!username || !password) return res.status(400).json(createResponse(false, 400, 'Error: please specify username and password'));


  bcrypt.hash(password, 10)
  .then(hashedPwd => {
    // create user in database
    const createUserQuery = `
    INSERT INTO users (username, pwd)
    VALUES ($1, $2)
    RETURNING _id, username;
    `;
    const vars = [username, hashedPwd];
    return db.query(createUserQuery, vars);
  })
  .then(result => {
    // createSession object template
    res.locals.createSession = {
      userId: result.rows[0]._id,
      username: result.rows[0].username,
      valid: true
    };
    return next();
  })
  .catch(err => {
    if (err.constraint === 'users_username_key') {
      return res.status(400).json(createResponse(false, 400, 'Error: user already exists'));
    }
    return next(err);
  })
}

function loginUser(req, res, next) {
  if (!req.body.auth) return res.status(400).json(createResponse(false, 400, 'Error: please specify username and password'));
  const { username, password } = req.body.auth;
  if (!username || !password) return res.status(400).json(createResponse(false, 400, 'Error: please specify username and password'));

  const dbQuery = 'SELECT _id, pwd FROM users WHERE username = $1';
  const vars = [username];
  db.query(dbQuery, vars)
    .then(result => {
      if (!result.rows.length) return res.status(400).json(createResponse(false, 400, 'Error: incorrect username and/or password'));
      const { _id, pwd } = result.rows[0];
      res.locals.createSession = {
        userId: _id,
        username: username
      };
      return bcrypt.compare(password, pwd);
    })
    .then(result => {
      if (typeof result !== 'boolean') return;
      if (result === false) {
        return res.status(400).json(createResponse(false, 400, 'Error: incorrect username and/or password'));
      } else {
        res.locals.createSession.valid = true;
        return next();
      }
    })
    .catch(err => next(err));
}

function logoutUser(req, res, next) {
  const session = req.cookies.ssid;
  if (!session) return res.status(400).json(createResponse(false, 400, 'Error: you are not logged in'));
  res.clearCookie('ssid', genCookieParams());
  const dbQuery = 'UPDATE session_log SET isactive = false WHERE ssid = $1';
  const vars = [session];
  db.query(dbQuery, vars)
    .then(result => next())
    .catch(err => next(err));
}

function protectPage(req, res, next) {
  if (!res.locals.authInfo.authenticated) return res.status(400).json(createResponse(false, 400, 'Error: you must be logged in to view this content'));
  return next();
}

function validateUsername(req, res, next) {
  const { username } = req.params;
  const dbQuery = 'SELECT username FROM users WHERE username = $1';
  const vars = [username];
  db.query(dbQuery, vars)
    .then(result => {
      if(!result.rows.length) return res.status(400).json(createResponse(false, 400, 'Username not found'));
      else return next();
    })
    .catch(err => next(err));
}

function createSession(req, res, next) {
  if (!res.locals.createSession || !res.locals.createSession.valid) {
    console.log('Error: Cannot create session');
    return next(err);
  }
  const { userId, username } = res.locals.createSession;
  const createSessionQuery = `INSERT INTO session_log (user_id, ssid) VALUES ($1, $2);`;
  const ssid = uuid.v4();
  const vars = [userId, ssid];
  db.query(createSessionQuery, vars)
  .then(result => {
    res.cookie('ssid', ssid, genCookieParams());
    // update authInfo object
    res.locals.authInfo = { 
      authenticated: true,
      ssid: ssid,
      username: username,
      user_id: userId,
      message: 'Success'
    };
    return next();
  })
  .catch(err => next(err));
}

module.exports = { globalAuthMiddleware, signupUser, loginUser, logoutUser, createSession, protectPage, validateUsername };
