const mongoose = require("mongoose");
const JobsSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "please provide a company name"],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, "please enter a position name"],
      maxlength: 50,
    },
    status: {
      type: String,
      enum: ["interview", "declined", "pending"],
      required: [true, "please enter a name"],
      maxlength: 50,
      default: "pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      require: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("job", JobsSchema);
