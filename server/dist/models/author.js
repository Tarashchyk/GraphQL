"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose.default.Schema;
const authorSchema = new Schema({
  name: String,
  age: Number
}); // authorSchema.pre('save', (req, res, next) => {
// });

var _default = _mongoose.default.model("Author", authorSchema);

exports.default = _default;