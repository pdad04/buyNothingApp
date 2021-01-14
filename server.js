const express = require("express");
const db = require("./db");

require("dotenv").config();

const app = express();

app.use(express.json({ extended: false }));

app.get("/", (req, res ) => res.send({ msg: "API Running" }));

// Define routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/posts", require("./routes/api/posts"));

const PORT = process.env.PORT || 5000;

db.initDb((error, db) => {
  if(error){
    console.log(error);
  }
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));  
})

