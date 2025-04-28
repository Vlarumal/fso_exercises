const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const todosRouter = require('./routes/todos');
const statisticsRouter = require('./routes/statistics');

const app = express();

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.set('json spaces', 2);

app.use('/', indexRouter);
app.use('/todos', todosRouter);
app.use('/statistics', statisticsRouter);

module.exports = app;
