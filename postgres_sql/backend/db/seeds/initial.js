const Knex = require("knex");
const bcrypt = require('bcrypt');
const tableNames = require('../../src/constants/tableNames');
const countries = require("../../src/constants/countries");
const spain_states = require("../../src/constants/spainStates");

/**
 * @param {Knex} knex 
 */
exports.seed = async (knex) => {
  // Deletes ALL existing entries
  await Promise.all(Object.keys(tableNames).map((name) => knex(name).del()));


  const user = {
    email: 'antdcs@gmail.com',
    name: 'saeron',
    password: await bcrypt.hash('admin', 12),
  }

  const [createdUser] = await knex(tableNames.user).insert(user).returning('*');

  console.log('Created User: ', createdUser);

  const insertedCountries = await knex(tableNames.country).insert(countries, '*');

  const spain = insertedCountries.find((country) => country.name === 'ES');
  spain_states.forEach(state => {
    state.country_id = spain.id;
  });
  await knex(tableNames.state).insert(spain_states);
  // Inserts seed entries
  // await knex('table_name').insert([
  //   { id: 1, colName: 'rowValue1' },
  //   { id: 2, colName: 'rowValue2' },
  //   { id: 3, colName: 'rowValue3' }
  // ]);
};
