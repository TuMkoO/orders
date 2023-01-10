const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  roles: [{ type: String, ref: "Role" }],

  firstName: { type: String, required: false, default: "" },
  secondName: { type: String, required: false, default: "" },
  lastName: { type: String, required: false, default: "" },
  post: { type: String, required: false, default: "" },
  phone: { type: String, required: false, default: "" },

  companyFullName: { type: String, required: false, default: "" },
  companyShortName: { type: String, required: false, default: "" },
  companyOwnershipType: { type: String, required: false, default: "" },
  companyLegalAddressCode: { type: String, required: false, default: "" },
  companyLegalAddressCity: { type: String, required: false, default: "" },
  companyLegalAddressTownship: { type: String, required: false, default: "" },
  companyLegalAddressStreet: { type: String, required: false, default: "" },
  companyLegalAddressHouse: { type: String, required: false, default: "" },
  companyLegalAddressRoom: { type: String, required: false, default: "" },
  companyMailAddressCode: { type: String, required: false, default: "" },
  companyMailAddressCity: { type: String, required: false, default: "" },
  companyMailAddressTownship: { type: String, required: false, default: "" },
  companyMailAddressStreet: { type: String, required: false, default: "" },
  companyMailAddressHouse: { type: String, required: false, default: "" },
  companyMailAddressRoom: { type: String, required: false, default: "" },
  companyPhone: { type: String, required: false, default: "" },
  companyEmail: { type: String, required: false, default: "" },
  companyBank: { type: String, required: false, default: "" },
  companyPayment: { type: String, required: false, default: "" },
  companyInn: { type: String, required: false, default: "" },
  companyOkpo: { type: String, required: false, default: "" },
  companyBik: { type: String, required: false, default: "" },
  companyDirPost: { type: String, required: false, default: "" },
  companyDirFirstName: { type: String, required: false, default: "" },
  companyDirSecondName: { type: String, required: false, default: "" },
  companyDirLastName: { type: String, required: false, default: "" },
  companyGrounds: { type: String, required: false, default: "" },

  // card: { type: Object, required: false },
  // company: { type: Types.ObjectId, ref: "Company" },
  // company: { type: String, required: false, default: "" },
  ordersTraining: [{ type: Types.ObjectId, ref: "OrderTraining" }],
  listener: [{ type: Types.ObjectId, ref: "Listener" }],
});

module.exports = model("User", schema);
