### Crear modelo sql
- https://www.lucidchart.com/
- Installar docker y docker compose
- Usar fichero docker compose:
# Use postgres/example user/password credentials
version: '3.1'

services:

  db:
    image: postgres
    restart: always
    volumes:
      - ./docker-data/db-data:/var/lib/postgresql/data
    environment:
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: ${POSTGRES_DB}
    ports: 
      - 5432:5432

  adminer:
    depends_on: 
      - db
    image: adminer
    restart: always
    ports:
      - 8090:8080

- sudo docker-compose up
- Generar node default npm init -y
- Installar knex npm i knex
- Instalar modulo para postgress npm i pg
- Instalar dotenv npm i dotenv
- Crear knex config file npx knex init
- Editar el archivo de configuración de knex para añadir dotenv y asi tener las variables:
// Update with your config settings.
require("dotenv").config();

module.exports = {

  development: {
    client: 'pg',
    connection: {
      databse: process.env.POSTGRES_DB,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD
    },
    migrations: {
      directory: './db/migrations'
    }
  }
};

- Generar migrations npx knex migrate:make initial.
- Editar el archivo migrations, up es creacion, down drop cambiamos up a async por que muchas funcines van a ser async dentro.
- Crear un fichero con los nombres de las tablas
- Crear tablas en up y destruir en drop.
- Hacer migracion npx knex migrate:latest, se puede añadir en el json-config
- Se puede hacer rollback con npx migrate:rollback
- Crear seeds con npx knex seed:make name pero debes modificar knexfile,js primero.
- Para guardar contraseñas de usuarios es mejor usar bcrypt, npm i bcrypt
- Crear un js para el orden de depenmdacias de eliminar datos en las tablas.
- Para crear test usamos supertest y para ejecutarlos todos un framework llamado jest:
npm i -D supertest jest
- El test simula una ejecucion y no usa el puerto asignado, por eso es util tener app separada.
