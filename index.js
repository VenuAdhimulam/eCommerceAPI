const  express = require("express"); //Imported Express
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB CONNECTION SUCCESSFULL!!"))
  .catch((err) => {
    console.log(err);
  });

app.listen(process.env.PORT || 5001, () => {
  console.log("Working");
});

app.use(express.json());
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);