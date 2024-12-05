const express = require("express");
const TradeRouter = require("./routes/SharesRoutes");
const app = express();
const errorHandler = require("./controller/errorController");
const apiError = require("./utils/apiError");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", TradeRouter);

app.all("*", (req, res, next) => {
  next(
    new apiError(404, `${req.originalUrl} is not found, please check again`)
  );
});

app.use(errorHandler.errorMiddleware);
module.exports = app;
