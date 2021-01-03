const express = require("express");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const app = express();

// Create MongoDB client
const client = new MongoClient(process.env.DB_CONNECTION, {
  useUnifiedTopology: true
});

// Connect client to DB
const connectDB = async () => {
  try {
    // Connect the client to the server
    await client.connect();
    
    console.log("Connected successfully to DB");
  } catch (error) {
    console.error(error.message);
    process.exit(-1);
  }
}

// Connect to DB
connectDB();

app.get("/", (req, res ) => res.send({ msg: "API Running" }));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
