const express = require("express");
const path = require("path");
const serverless = require("serverless-http");
const app = express();
const bodyParser = require("body-parser");
// const aws = require("./aws");
require("dotenv").config();
require("pg");

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

const router = express.Router();
router.get("/", (req, res) => {
  setupDb()
    .then((rows) => {
      console.log("rows!", rows);
      res.send(rows);
    })
    .catch((e) => {
      res.status(500).send(e);
    });
  // res.writeHead(200, { "Content-Type": "text/html" });
  // res.write("<h1>Hello from Express.js!</h1>");
  // res.end();
});

app.use(bodyParser.json());
app.use("/.netlify/functions/server", router); // path must route to lambda
app.use("/", (req, res) => res.sendFile(path.join(__dirname, "../index.html")));

module.exports = app;
module.exports.handler = serverless(app);
