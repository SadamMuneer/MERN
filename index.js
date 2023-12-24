require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 3000;
//database connection
require("./db/connec");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
const UserRoute = require("./routes/user_routes");
//Middleware
app.use("/api", UserRoute);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
