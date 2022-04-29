const path = require('path');
const express = require('express');
const router = require('./routes/router');
const auth = require('./routes/auth');
const app = express();
const cookieParser = require('cookie-parser');
const { globalAuthMiddleware } = require('./middleware/authMiddleware');
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(globalAuthMiddleware);

app.use('/api', router);
app.use('/auth', auth);

app.use('/assets', express.static(path.join(__dirname, '../client/assets')));

app.use((req, res) => {
    console.log('Error: page not found')
    res.status(404).send('Error: page not found');
});

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign(defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

module.exports = app.listen(port, () => console.log(`Listening on port ${port}`));
