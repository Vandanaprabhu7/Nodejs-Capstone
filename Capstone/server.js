const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const port = process.env.PORT || 3333;

mongoose
  .connect(process.env.DB_LOCAL_URL)
  .then((conn) => {
    console.log("Connected successfully");
  })
  .catch((err) => {
    console.log("Connection failed", err);
  });

app.listen(port, () => {
  console.log(`Express app is running on port ${port}`);
});
