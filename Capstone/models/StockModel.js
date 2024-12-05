const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
  type: {
    type: String,
    required: [true, "Type of share is needed and it can be buy or sell"],
  },
  user_id: {
    type: Number,
    required: [true, "User id is needed"],
  },
  symbol: {
    type: String,
    required: [true, "Stock symbol is needed and it should be unique"],
    unique: true,
  },
  shares: {
    type: Number,
    required: [
      false,
      "Shares quantity is optional, but if provided, it must be unique",
    ],
    min: 1,
    max: 100,
  },
  price: {
    type: Number,
    required: [true, "Stock price is needed"],
  },
  timestamp: {
    type: Number,
    required: [true, "Time of the stock trade in milliseconds is required"],
  },
});

const StockModel = mongoose.model("StockModel", stockSchema);

module.exports = StockModel;
