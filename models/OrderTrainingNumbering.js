const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  prefix: { type: String, required: true },
  num: { type: Number, required: true },
});

module.exports = model("OrderTrainingNumbering", schema);
