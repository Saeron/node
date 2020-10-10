const Knex = require("knex");
const bcrypt = require('bcrypt');
const tableNames = require('../../src/constants/tableNames');
const orderTableNames = require('../../src/constants/orderTablenames');
const countries = require("../../src/constants/countries");

/**
 * @param {Knex} knex 
 */
exports.seed = async (knex) => {
  // Deletes ALL existing entries
  await orderTableNames
    .reduce(async (promise, table_name) => {
      await promise;
      console.log('Clearing', table_name);
      return knex(table_name).del();
    },
      Promise.resolve())


  const user = {
    email: 'antdcs@gmail.com',
    name: 'saeron',
    password: await bcrypt.hash('admin', 12),
  }

  const [createdUser] = await knex(tableNames.user).insert(user).returning('*');

  console.log('Created User: ', createdUser);

  await knex(tableNames.country).insert(countries);
  // Inserts seed entries
  // await knex('table_name').insert([
  //   { id: 1, colName: 'rowValue1' },
  //   { id: 2, colName: 'rowValue2' },
  //   { id: 3, colName: 'rowValue3' }
  // ]);
};
