"use strict";
/** Database setup for jobly. */
const { Client } = require("pg");
const { getDatabaseUri } = require("./config");

let db;

if (process.env.NODE_ENV === "production") {
  db = new Client({
    connectionString: getDatabaseUri(),
    ssl: {
      rejectUnauthorized: false
    }
  });
} else {
  db = new Client({
    connectionString: "postgresql://jeffreyng:beachbodyp90x@127.0.0.1:5433/jobly"
  });
}

db.connect();

module.exports = db;