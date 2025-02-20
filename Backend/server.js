const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const dbName = "PassFort";
const app = express(); // Initialize app first
app.use(cors());
const port = 3000;
app.use(express.json());

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  }
}

async function getCollection() {
  const db = client.db(dbName);
  return db.collection("passwords");
}

app.get("/", async (_, res) => {
  try {
    const collection = await getCollection();
    const findResult = await collection.find({}).toArray();
    console.log(findResult);
    res.json(findResult);
  } catch (err) {
    console.error("Error fetching data", err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/", async (req, res) => {
  try {
    const password = req.body;
    const collection = await getCollection();
    const findResult = await collection.insertOne(password);
    console.log(findResult);
    res.send({ success: true });
  } catch (err) {
    console.error("Error fetching data", err);
    res.status(500).send("Internal Server Error");
  }
});

app.delete("/", async (req, res) => {
  try {
    const password = req.body;
    const collection = await getCollection();
    const findResult = await collection.deleteOne(password);
    console.log(findResult);
    res.send({ success: true });
  } catch (err) {
    console.error("Error fetching data", err);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
  connectToDatabase();
});
