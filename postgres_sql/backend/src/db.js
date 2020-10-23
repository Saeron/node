const Knex = require('knex');
const knex = require('knex');

const knexConfig = require('../knexfile');
const enviroment = process.env.NODE_ENV || 'development';
const connectionConfig = knexConfig[enviroment];

const connection = Knex(connectionConfig);

module.exports = connection;
