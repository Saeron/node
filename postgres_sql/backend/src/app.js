const express = require('express');
const morgan = require('morgan');
const comression = require('compression');
const helmet = require('helmet');

const middlewares = require('./middlewares');
const api = require('./api');
const project = require('./constants/project');

const app = express();
app.use(morgan('tiny'));
app.use(comression());
app.use(helmet());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: project.message
    });
});
app.use('/api/v1', api);

// El ordend de los middlewares importa, es importante que errorHandler sea el ultimo
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;