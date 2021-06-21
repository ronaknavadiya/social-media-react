const express = require("express");
const app = express();
const port = 5000;
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");
const mongoose = require("mongoose");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Connection established");
  })
  .catch((err) => console.log("Error:", err));

// middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

app.listen(port, () => {
  console.log(`listenin to port ${port}`);
});
