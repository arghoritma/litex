import type { Knex } from "knex";

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
      filename: "./db/production.sqlite3"
    },
    useNullAsDefault: true
  },

};

export default config