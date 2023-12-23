const express = require("express");
const router = express.Router();

const { UserLogin, Allusers } = require("../controllers/user_controlller");
const { UserLog } = require("../controllers/user_login");
const { UserVerification } = require("../controllers/user_verification");
const { UserLogout } = require("../controllers/useer_logout");

// Middleware (req (middleware)=> res)
const verifyusersName = (req, res, next) => {
  console.log("Middleware Running");
  const { name } = req.query;
  if (!name) {
    return res.status(400).json({ msg: "Incomplete query" });
  }
  next();
};
// routes for user Authentication
// router.post("/register");
router.post("/login", UserLogin);
router.get("/verification", UserVerification);
router.get("/logout", UserLogout);
router.get("/readuser", verifyusersName, Allusers);

module.exports = router;
