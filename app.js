const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

const { authRouter, gameRouter } = require('./routes');

app.use(logger(formatsLogger));

app.use(cors());

app.use(express.json());

app.use('/api', authRouter);
app.use('/api', gameRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

module.exports = app;
