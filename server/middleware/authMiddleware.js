const uuid = require('uuid');
const bcrypt = require('bcrypt');
const db = require('../models/dbModel');



// req.body.auth.authAction
// req.body.auth.username
// req.body.auth.password


function globalAuthMiddleware(req, res, next) {

  const LOGIN = 'LOGIN';
  const LOGOUT = 'LOGOUT';
  const SIGNUP = 'SIGNUP';
  const WORK_FACTOR = 10;
  const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

  const uuidValidateV4 = input => uuid.validate(input) && uuid.version(input) === 4;
  
  res.locals.auth = 
  { 
    authenticated: false,
    ssid: null,
    userId: null,
    username: null
  };

  switch (req.body.auth.authAction) {
    case LOGIN:
      console.log('Login');
      // check password against database
      // set cookie
      break;
    case LOGOUT:
      console.log('Logout');
      // delete cookie and mark session state as false in db
      break;
    case SIGNUP:
      console.log('Signup');
      const usrName = req.body.auth.username;
      res.locals.auth.username = usrName;
      bcrypt.hash(req.body.auth.password, WORK_FACTOR)
      .then(hashedPwd => {
        // create user in database
        return db.query('INSERT INTO users (username, pwd) VALUES ($1, $2) RETURNING _id;', [usrName, hashedPwd]);
      })
      .then(res => {
        console.log(res);
        const id = res.rows[0]._id;
        const session = uuid.v4();
        res.locals.auth.ssid = session;
        res.local.auth.userId = id;
        // create session in database
        return db.query('INSERT INTO session_log (user_id, ssid) VALUES ($1, $2)', [id, session]);
      })
      .then(res => {
        // set ssid cookie in res object
        res.cookie('ssid', session, {maxAge: THIRTY_DAYS, httpOnly: true})
        res.locals.auth.authenticated = true;
        return next();
      })
      .catch(err => next(err));
      break;
    default:
      // check for a ssid cookie against the database
      // validate ssid cookie
      // if everything is in order the user is authenticated
      return next();
  }

}


module.exports = globalAuthMiddleware;
