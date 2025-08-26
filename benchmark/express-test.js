const express = require("express");
const app = express();

app.get("*", (req, res) => {
  res.send("OK");
});

app
  .listen(3008, () => {
    console.log("Regular Express server running on port 3008");
  })
  .on("error", (err) => {
    console.log(err);
  });
