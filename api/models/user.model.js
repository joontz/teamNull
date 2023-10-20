const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const saltRounds = 10;
const secret = "verysecret";

const Schema = mongoose.Schema;

//define a user object
const userSchema = new Schema(
  {
    email: {
      type: String,
      // required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    password: {
      type: String,
      // required: true,
    },
  },
  {
    timestamps: true,
  }
);
//we are using bcrypt to hash the password before it is saved to db
userSchema.pre("save", function (next) {
  // Check if document is new or a new password has been set
  if (this.isNew || this.isModified("password")) {
    // Saving reference to this because of changing scopes
    const document = this;
    bcrypt.hash(document.password, saltRounds, function (err, hashedPassword) {
      if (err) {
        next(err);
      } else {
        document.password = hashedPassword;
        next();
      }
    });
  } else {
    next();
  }
});

userSchema.methods.checkPassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

module.exports = mongoose.model("User", userSchema);
