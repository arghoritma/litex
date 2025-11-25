import type { Knex } from "knex";
require("dotenv").config();

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "better-sqlite3",
    connection: {
      filename: "./db/development.sqlite3"
    },
    useNullAsDefault: true
  },

  production: {
    client: "better-sqlite3",
    connection: {
      filename: `${process.env.DB_FILENAME}.sqlite3`
    },
    useNullAsDefault: true
  },

};

export default config