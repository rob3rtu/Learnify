const express = require("express");
const { createHandler } = require("graphql-http/lib/use/express");
const schema = require("./graphql");
const db = require("./models");
const cors = require("cors");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
const port = 3001;

const checkAuthorization = async (req, res, next) => {
  const token = req.headers.authorization
    ? req.headers.authorization.split(" ")[1]
    : null;

  if (!token) {
    req.user = null;
    return next();
  }

  jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    if (err) {
      console.log(err);
      req.user = null;
      return next();
    }

    req.user = decoded;
    next();
  });
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

app.all(
  "/graphql",
  checkAuthorization,
  createHandler({
    schema,
    context: (req) => ({
      req,
    }),
  })
);

app.listen(3001, () => {
  console.log(`App running on port ${port}`);
});
