// https://www.youtube.com/watch?v=5pQsl9u_10M
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const middleware = require('./middlewares');
const logs = require('./api/logs');

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
app.use(morgan('common')); // request info on server terminal.
app.use(helmet()); // add son headers protection.
app.use(cors({
  origin: process.env.CORS_ORIGIN,
}));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World',
  });
});

app.use('/api/logs', logs);

// Middleware
app.use(middleware.notFound);
app.use(middleware.errorHandler);

const port = process.env.PORT || 1337;

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
