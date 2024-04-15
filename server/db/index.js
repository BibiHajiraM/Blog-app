const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

mongoose
  .connect(
    "mongodb+srv://bibihajiram2020:2uMf7JAgRd0e1xvU@cluster0.71jhncn.mongodb.net/"
  )
  .then(() => console.log("Connected mongodb"))
  .catch((e) => console.log(e));
