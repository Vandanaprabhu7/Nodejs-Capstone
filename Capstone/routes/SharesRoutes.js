const express = require("express");
const router = express.Router();
const TradeController = require("../controller/SharesHandler");
const apiError = require("../utils/apiError");
const authenticateToken = require("../middleware/AuthMiddleware");

router
  .route("/trades")
  .post(TradeController.addNewTrade)
  .get(authenticateToken, TradeController.getAllTrades);

router
  .route("/trades/:id")
  .get(authenticateToken, TradeController.getTradeById)
  .delete((req, res, next) => {
    next(new apiError(405, "Method Not Allowed"));
  })
  .patch((req, res, next) => {
    next(new apiError(405, "Method Not Allowed"));
  });

module.exports = router;
