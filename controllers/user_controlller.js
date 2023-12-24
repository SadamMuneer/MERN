const usermodel = require("../models/usermodels");
const jwt = require("jsonwebtoken");
const UserLogin = async (req, res) => {
  try {
    //destructor
    const { email, password } = req.body;
    //1- check user exist or not
    const userExist = await usermodel.findOne({ email });
    if (!userExist) {
      return res.status(404).json({ msg: "User not Exist!" });
    }

    // ? passwprd matching
    if (password !== userExist.password) {
      return res.status(400).json({ msg: "incorrect password!" });
    }
    // jwt token
    const token = jwt.sign({ userid: userExist?._id }, process.env.JWT_SECRET, {
      algorithm: "HS384",
      audience: "user",
      expiresIn: "2m",
      issuer: "server",
    });
    console.log(token, "jwt token is working");

    // create cookie
    res.cookie("access", token, {
      httpOnly: true, // client/ user will not access. only server will access
      secure: false,
      expires: new Date(Date.now() + 2 * 60 * 1000), //For next 2 minutes
      sameSite: "None",
    });
    //user record modificatoin
    const newUserRecord = await usermodel.findOneAndUpdate(
      { _id: userExist._id },
      {
        $set: { userAccessToken: token },
      },
      {
        new: true,
      }
    );
    return res.status(200).json({ success: true, user: newUserRecord });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};
//method @GET
const Allusers = async (req, res) => {
  const { email } = req.query;
  // Reading
  const users = await usermodel.find({ email: email });
  res.status(200).json({ users });
};
module.exports = { UserLogin, Allusers };
