var knex = require("knex")({
  debug: true,
  client: "pg",
  connection: {
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
  },
});

const setupDb = () => {
  return knex("users")
    .insert({ name: "netlify man", age: 37 })
    .then((res) => {
      console.log("inserted!", res);
    })
    .then(() => knex("users"))
    .catch(console.error);
};

module.exports = {
  setupDb,
};
