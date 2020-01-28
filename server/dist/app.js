"use strict";

var _express = _interopRequireDefault(require("express"));

var _expressGraphql = _interopRequireDefault(require("express-graphql"));

var _schema = _interopRequireDefault(require("./schema/schema"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _cors = _interopRequireDefault(require("cors"));

var _http = require("http");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PORT = process.env.PORT || 3000;
const app = (0, _express.default)(); //Allow cross-origin request

app.use((0, _cors.default)()); //connect to mongoDB !!!!!!!!!!!!

_mongoose.default.connect("mongodb+srv://admin:789054k12@graphql-test-eylcu.mongodb.net/test?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("Owww yeah MongoDB connected")).catch(err => console.log(err));

const server = (0, _http.createServer)(app);
app.use("/graphql", (0, _expressGraphql.default)({
  schema: _schema.default,
  graphiql: true
}));
server.listen(PORT, () => console.log(`server is up. PORT: ${PORT}`));