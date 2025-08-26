const express = require("hyper-express");
const webserver = express();

webserver.get("*", (request, response) => {
  response.send("OK");
});

// Activate webserver by calling .listen(port, callback);
webserver
  .listen(3009, () => {
    console.log("Hyper-Express server running on port 3009");
  })
  .catch((err) => {
    console.log(err);
  });
