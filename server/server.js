const path = require('path');
const express = require('express');
const router = require('./routes/router');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/api', router);

app.use('/assets', express.static(path.resolve(__dirname, '../client/assets')));

app.use((req, res) => {
    console.log('Error: page not found')
    res.status(400).send('Error: page not found');
});

app.use((err, req, res, next) => {
  if (!err) err = {
    log: 'Express error handler caught unknown middleware',
    message: { err: 'An unknown error occurred'},
  };
  console.log(err);
  return res.status(500).json(err);
});


module.exports = app.listen(port, () => console.log(`Listening on port ${port}`));