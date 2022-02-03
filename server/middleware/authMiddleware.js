const uuid = require('uuid');
const bcrypt = require('bcrypt');
const db = require('../models/dbModel');


function generateCookieParams() {
  const ONE_MONTH = 1000 * 60 * 60 * 24 * 30;
  return { maxAge: ONE_MONTH, httpOnly: true, path: '/' };
}

function formatResponse(success, message)  {
  return { success, message };
}


// req.body.auth.authAction
// req.body.auth.username
// req.body.auth.password

// Place this in app.use so it is used globally
function globalAuthMiddleware(req, res, next) {

  // set default values for res.locals.authInfo object
  res.locals.authInfo = { 
    authenticated: false,
    ssid: null,
    username: null,
    user_id: null,
    message: 'No SSID cookie found'
  };

  // check for ssid cookie presence
  if (!req.cookies.ssid) return next();

  const unverifiedSsid = req.cookies.ssid;
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
      if (!data.rows.length) {
        res.locals.authInfo.message = 'Invalid SSID cookie';
        return next();
      } 
      const { user_id, username, ssid } = data.rows[0];
      res.locals.authInfo = { authenticated: true, user_id, username, ssid, message: 'Success' };
      return next();
    })
    .catch(err => next(err));
}


function signupUser(req, res, next) {

  // validate body of request

  if (!req.body.auth) return res.json(formatResponse(false, 'Bad request: please specify username and password'));

  const { username, password } = req.body.auth;
  if (!username || !password) return res.json(formatResponse(false, 'Bad request: please specify username and password'));


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
    res.locals.createSession = {
      userId: result.rows[0]._id,
      username: result.rows[0].username,
    };
    return next();
  })
  .catch(err => {
    if (err.constraint === 'users_username_key') {
      return res.json(formatResponse(false, 'Error: username already exists in database'));
    }
    return next(err);
  })
}

function loginUser(req, res, next) {
  if (!req.body.auth) return res.json(formatResponse(false, 'Bad request: please specify username and password'));

  const { username, password } = req.body.auth;
  if (!username || !password) return res.json(formatResponse(false, 'Bad request: please specify username and password'));

  const dbQuery = 'SELECT _id, pwd FROM users WHERE username = $1';
  const vars = [username];
  db.query(dbQuery, vars)
    .then(result => {
      if (!result.rows.length) return res.json(formatResponse(false, 'Error: incorrect username and/or password'));
      const { _id, pwd } = result.rows[0];
      res.locals.createSession = {
        userId: _id,
        username: username
      };
      return bcrypt.compare(password, pwd);
    })
    .then(result => {
      if (!result) {
        return res.json(formatResponse(false, 'Error: incorrect username and/or password'));
      } 
      return next();
    })
}

function logoutUser(req, res, next) {
  const session = req.cookies.ssid;
  if (!session) return res.json(formatResponse(false, 'You are not logged in'));
  res.clearCookie('ssid', generateCookieParams());
  const dbQuery = 'UPDATE session_log SET isactive = false WHERE ssid = $1';
  const vars = [session];
  db.query(dbQuery, vars)
    .then(result => next())
    .catch(err => next(err));
}

function protectPage(req, res, next) {
  if (!res.locals.authInfo.authenticated) return res.json(formatResponse(false, 'You must be logged in to view this page'));
  return next();
}

function validateUsername(req, res, next) {
  const { username } = req.params;
  const dbQuery = 'SELECT username FROM users WHERE username = $1';
  const vars = [username];
  db.query(dbQuery, vars)
    .then(result => {
      if(!result.rows.length) return res.json(formatResponse(false, 'Username not found'));
      return next();
    })
    .catch(err => next(err));
}

function createSession(req, res, next) {
  const { userId, username } = res.locals.createSession;
  const createSessionQuery = `
    INSERT INTO session_log (user_id, ssid)
    VALUES ($1, $2);
    `;
  const ssid = uuid.v4();
  const vars = [userId, ssid];
  db.query(createSessionQuery, vars)
  .then(result => {
    res.cookie('ssid', ssid, generateCookieParams());
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
