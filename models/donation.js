const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DonationSchema = new Schema({
  donor_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  food_name: { type: String, required: true },
  description:{ type: String, required: true },
  quantity: { type: String, required: true },
  expiry_date: { type: Date, required: true },
  address: { type: String, required: true },
  status: {
    type: String,
    enum: ["available", "accepted", "collected", "expired"],
    default: "available"
  },
  receiver_id: { type: Schema.Types.ObjectId, ref: "User", default: null },
  image_url: { type: String, default: "" },
});

module.exports = mongoose.model("Donation", DonationSchema);
