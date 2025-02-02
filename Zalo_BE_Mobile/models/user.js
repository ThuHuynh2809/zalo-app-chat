const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
  },
  about: {
    type: String,
  },
  dateOfBirth: {
    type: String,
  },
  gender: {
    type: String,
  },
  phone: {
    type: String,
  },
  avatar: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    validate: {
      validator: function (email) {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      },
      message: (props) => `Email (${props.value}) is invalid!`,
    },
  },
  password: {
    type: String,
  },
  passwordConfirm: {
    type: String,
  },
  passwordChangedAt: {
    type: Date,
  },
  passwordResetToken: {
    type: String,
  },
  passwordResetExpires: {
    type: Date,
  },
  creaateAt: {
    type: Date,
    default: Date.now(),
  },
  updateAt: {
    type: Date,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  otp: {
    type: String,
  },
  otp_expiry_time: {
    type: Date,
  },
  socket_id: {
    type: String,
  },
  friends: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      // validate: {
      //   validator: function (value) {
      //     const uniqueFriends = [...new Set(value.map(String))];
      //     return value.length === uniqueFriends.length;
      //   },
      //   message: 'Friends list must contain unique user IDs.',
      // },
    }
  ],
  status: {
    type: String,
    enum: ["online", "offline"],
  }
});

userSchema.pre("save", async function (next) {
  //Only run this fxn if OTP is actually modified
  if (!this.isModified("otp") || !this.otp) return next();

  //Hash the OTP with the cost of 12
  this.otp = await bcrypt.hash(this.otp, 12);

  console.log(this.otp.toString(), "From Pre Save Hook");
  next();
});

userSchema.pre("save", async function (next) {
  //Only run this fxn if OTP is actually modified
  if (!this.isModified("password") || !this.password) return next();

  //Hash the OTP with the cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  next();
});
userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew || !this.password)
    return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
userSchema.methods.correctOTP = async function (candidateOTP, userOTP) {
  return await bcrypt.compare(candidateOTP, userOTP);
};

userSchema.methods.createPasswordResetToken = function () {
  //Generate a random token
  const resetToken = crypto.randomBytes(32).toString("hex");

  //Hash the token and set it to passwordResetToken field
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  //Set the passwordResetExpires field
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

userSchema.methods.changedPasswordAfter = function (JWTTimeStamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimeStamp < changedTimeStamp;
  }

  // FALSE MEANS NOT CHANGED
  return false;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
