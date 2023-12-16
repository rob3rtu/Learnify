const express = require("express");
const { createHandler } = require("graphql-http/lib/use/express");
const schema = require("./graphql");
const db = require("./models");

const app = express();
app.use(express.json());
const port = 3001;

const checkAuthorization = async (req, res, next) => {
  //will verify token here
  next();
};

const testDbConnection = async () => {
  try {
    await db.sequelize.authenticate();
    console.log("Database connnected successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

testDbConnection();

app.all("/graphql", createHandler({ schema }));

app.listen(3001, () => {
  console.log(`App running on port ${port}`);
});
