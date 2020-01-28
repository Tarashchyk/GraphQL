import express from "express";
import graphqlHTTP from "express-graphql";
import schema from "./schema/schema";
import mongoose from "mongoose";
import cors from "cors";
import { createServer } from "http";

const PORT = process.env.PORT || 3000;

const app = express();

//Allow cross-origin request
app.use(cors());

//connect to mongoDB !!!!!!!!!!!!
mongoose
  .connect(
    "mongodb+srv://admin:789054k12@graphql-test-eylcu.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Owww yeah MongoDB connected"))
  .catch(err => console.log(err));

const server = createServer(app);
app.use(
  "/graphql",
  graphqlHTTP({
    schema,

    graphiql: true
  })
);

server.listen(PORT, () => console.log(`server is up. PORT: ${PORT}`));
