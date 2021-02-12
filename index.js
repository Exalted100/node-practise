const express = require('express');
const app = express();

const absolutePath = __dirname + "/view/index.html";

app.get("/", (req, res) => {
    res.sendFile(absolutePath)
})

let PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Listening on port ' + PORT);
  });