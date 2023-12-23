const { Mongoose, default: mongoose } = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      uniqo: true,
      maxLength: 50,
      validate: [validator.isEmail, "invalid email"],
    },
    password: {
      type: String,
      require: true,
      uniqo: true,
      maxLength: 50,
      validate: {
        validator: function (value) {
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
            value
          );
        },
        message: "The password should be valid",
      },
    },
    userAccessToken: {
      type: String,
      require: false,
    },
  },
  { timestamps: true }
);
const usermodel = mongoose.model("users", userSchema);
module.exports = usermodel;
