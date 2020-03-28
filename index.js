const server = require("./src/config/server");

const port = process.env.PORT || 3000;

var listener = server.listen(port, () => {
  console.log("Server running on PORT: ", listener.address().port);
});
