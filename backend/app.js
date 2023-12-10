const express = require("express");
const { createHandler } = require("graphql-http/lib/use/express");
const schema = require("./graphql");

const app = express();
app.use(express.json());
const port = 3001;

const checkAuthorization = async (req, res, next) => {
  //will verify token here
  next();
};

app.all("/graphql", createHandler({ schema }));

app.listen(3001, () => {
  console.log(`App running on port ${port}`);
});
