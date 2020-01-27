import express from "express";
import graphqlHTTP from "express-graphql";
import schema from "./schema/schema";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

//Allow cross-origin request
app.use(cors());

//connect to mongoDB !!!!!!!!!!!!
mongoose.connect(
  "mongodb+srv://admin:789054k12@graphql-test-eylcu.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

app.use(
  "/graphql",
  graphqlHTTP({
    schema,

    graphiql: true
  })
);

app.listen(3000, () => {
  console.log("now listening for request on port 3000");
});
