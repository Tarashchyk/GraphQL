const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    // testing
    graphiql: true
  })
);

app.listen(3000, () => {
  console.log("now listening for request on port 3000");
});
