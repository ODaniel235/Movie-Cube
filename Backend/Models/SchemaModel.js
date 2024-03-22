import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail],
  },
  password: {
    type: String,
    minlength: 8,
    required: [true, "Please add a password"],
    select: false,
  },
  passwordConfirm: {
    type: String,
    minlength: 8,
    required: [true, "Please add confirm your password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same",
    },
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
const UserModel = mongoose.model("UserModel", userSchema);
export default UserModel;
