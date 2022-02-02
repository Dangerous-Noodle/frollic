const uuid = require('uuid');
const bcrypt = require('bcrypt');
const db = require('../models/dbModel');



// req.body.auth.authAction
// req.body.auth.username
// req.body.auth.password

// Place this in app.use so it is used globally
function globalAuthMiddleware(req, res, next) {

  const uuidValidateV4 = input => uuid.validate(input) && uuid.version(input) === 4;

  res.locals.authInfo = { authenticated: false };
  // check for ssid cookie presence
  if (!req.cookies.ssid) return next();
  // validate ssid cookie value
  if (!uuidValidateV4(req.cookies.ssid)) {
    console.log('Error: Received invalid SSID cookie');
    // clear cookie
    // return next(err);
  }
  // check ssid against the database
  // if found and isactive and is not expired => authenticate user
  // else do nothing and continue
  return next();
}


function signupUser(req, res, next) {

  // validate body of request

  const usrName = req.body.auth.username;
  res.locals.auth.username = usrName;
  bcrypt.hash(req.body.auth.password, WORK_FACTOR)
  .then(hashedPwd => {
    // create user in database
    return db.query('INSERT INTO users (username, pwd) VALUES ($1, $2) RETURNING _id;', [usrName, hashedPwd]);
  })
  .then(result => {
    console.log(result);
    const id = result.rows[0]._id;
    res.locals.auth.userId = id;
    const session = uuid.v4();
    result.locals.auth.ssid = session;
    // create session in database
    return db.query('INSERT INTO session_log (user_id, ssid) VALUES ($1, $2)', [id, session]);
  })
  .then(result => {
    console.log(result);
    // set ssid cookie in res object
    res.cookie('ssid', session, {maxAge: THIRTY_DAYS, httpOnly: true})
    res.locals.auth.authenticated = true;
    return next();
  })
  .catch(err => next(err));

}
