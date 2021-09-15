const {
  Schema,
  model,
  Types: { ObjectId },
} = require("mongoose");

const ReviewSchema = new Schema(
  {
    masterID: { type: ObjectId, required: true, ref: 'master' },
    saleID: { type: String, required: true }, //type: ObjectId, required: true, ref: 'service' }
    memberID: { type: ObjectId, required: true, ref: 'member' },
    content: { type: String, required: true },
    score: { type: Number, required: true }
  },
  { timestamps: true }
);

const Review = model("review", ReviewSchema);

module.exports = { Review };
