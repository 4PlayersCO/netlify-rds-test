const connectToRds = (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write("<h1>Hello from Express.js!</h1>");
  res.end();
};

module.exports = {
  connectToRds,
};
