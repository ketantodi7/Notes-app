const connectToMongo = require("./db");
const express = require('express');
var cors = require('cors')


connectToMongo();
const app = express()

app.use(cors())
app.use(express.json());
const port = 5000

app.use("/api/auth", require("./routes/auth_route"));
app.use("/api/notes", require("./routes/notes_route"));



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});