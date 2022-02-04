function createResponse(actionSuccess, statusCode = 200, message = '', data = {}) {
  return {
    actionSuccess, // boolean
    statusCode,    // HTTP code
    message,       // string
    data           // object
  };
}

// function createError(log, status, message) {

//   if (!log) log = 'Express error handler caught unknown middleware error';
//   if (!status) status = 500;
//   if (!message) message = { err: 'An error occurred' };
//   else message = { err: message };

//   return { log, status, message };
// }

module.exports = { createResponse };