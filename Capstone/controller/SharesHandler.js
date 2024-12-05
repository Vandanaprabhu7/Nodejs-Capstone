const ShareModel = require("./../models/StockModel");
const apiError = require("../utils/apiError");
const jwt = require("jsonwebtoken");

exports.addNewTrade = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    const error = new Error("Request has no body!");
    error.statusCode = 400;
    return next(error);
  }
  const { shares, type, user_id } = req.body;
  if (typeof shares !== "number" || shares < 1 || shares > 100) {
    const error = new Error("Share value out of range");
    error.statusCode = 400;
    return next(error);
  }
  if (type !== "buy" && type !== "sell") {
    return next(new apiError(400, `Incorrect type value provided`));
  }
  try {
    const newTrade = await ShareModel.create(req.body);
    const accessToken = jwt.sign({ user_id }, process.env.SECRET_KEY);
    res.status(201).json({
      status: "Successful",
      message: "Trade added successfully",
      data: {
        "Details of trade": newTrade,
        accessToken: accessToken,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: err.message,
    });
  }
};

exports.getAllTrades = async (req, res) => {
  const { user_id, type } = req.query;
  const query = {};
  if (user_id) {
    query.user_id = user_id;
  }
  if (type) {
    query.type = type;
  }

  try {
    const Trades = await ShareModel.find(query);
    res.status(200).json({
      status: "Successful",
      "Trade Details": Trades,
    });
  } catch (err) {
    res.status(404).json({
      status: "Failure",
      msg: err.message,
    });
  }
};

exports.getTradeById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const trade = await ShareModel.findById(id);
    if (!trade) {
      return next(new apiError(404, `Trade with id ${id} not found`));
    }
    res.status(200).json({
      status: "Successful",
      "Trade Details": trade,
    });
  } catch (err) {
    next(new apiError(500, err.message));
  }
};
