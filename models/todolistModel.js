const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Each List must have a name"],
    unique: true,
  },
  items: [
    {
      type: String,
    },
  ],
});

const List = mongoose.model("List", listSchema);

module.exports = List;
