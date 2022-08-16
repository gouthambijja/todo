const mongoose = require("mongoose");
const listSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  data: {
    type: [String],
    required: true,
  },
});
const List = mongoose.model("List", listSchema);
module.exports = List;
