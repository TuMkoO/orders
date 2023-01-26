const { Schema, model, Types } = require("mongoose");
const moment = require("moment-timezone");
const dateRU = moment.tz(Date.now(), "Europe/Moscow");

const schema = new Schema({
  commentUser: { type: String, required: false, default: "" },
  commentListener: { type: String, required: false, default: "" },
  commentOrder: { type: String, required: false, default: "" },
  program: { type: String, required: true },
  status: { type: String, required: true },
  created: { type: Date, default: Date.now },
  date: { type: Date, required: false, default: dateRU },
  number: { type: String, required: false },
  contractDate: { type: Date, required: false },
  contractNumber: { type: String, required: false },
  type: { type: String, required: true },
  user: { type: Object, required: true },
  listener: { type: Object, required: true },
  ownerUser: { type: Types.ObjectId, ref: "User" },
  ownerListener: { type: Types.ObjectId, ref: "Listener" },
});

module.exports = model("OrderTraining", schema);
