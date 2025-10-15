"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
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
exports.default = config;
//# sourceMappingURL=knexfile.js.map