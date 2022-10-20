const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    match: [/^[가-힣a-zA-Z]+$/, "한글, 영문 이름만 입력 가능합니다"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [
      /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
      "유효하지 않은 이메일 형식입니다",
    ],
  },
  password: {
    type: String,
    required: true,
    trim: true,
    match: [
      /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$/,
      "비밀번호는 영문 숫자를 포함하여 8 - 20자리이여야 합니다.",
    ],
  },
});

userSchema.pre("save", async () => {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 5);
  }
});

const User = model("User", userSchema);

module.exports = User;
