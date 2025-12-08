const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 8, select: false },
    role: { type: String, enum: ["admin", "user"], default: "user" },
  },
  { timestamps: true }
);

// ---- MUST BE BEFORE EXPORT ----
userSchema.pre("save", async function () {
  console.log("👉 inside pre hook, typeof next:");

  if (!this.isModified("password")) return ;

  try{
    const salt = await bcrypt.genSaltSync(10);
    this.password = await bcrypt.hashSync(this.password, salt);
  }
  catch(err){
    throw new Error(`Password hashing failed: ${err.message}`);
  }
});

userSchema.methods.comparePassword = function (plain) {
  return bcrypt.compare(plain, this.password);
};

// ---- EXPORT AFTER EVERYTHING ----
const User = mongoose.model("User", userSchema);
module.exports = User;

