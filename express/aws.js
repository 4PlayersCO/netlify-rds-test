const { setupDb } = require("./utils");

const handler = (req, res) => {
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
};

module.exports = {
  handler,
};
