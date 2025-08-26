const express = require("ultimate-express");
const app = express();

app.get("*", (req, res) => {
  res.send("OK");
});

// Activate webserver by calling .listen(port, callback);
app
  .listen(3006, () => {
    console.log("LiteX (Ultimate Express) server running on port 3006");
  })
  .catch((err) => {
    console.log(err);
  });
