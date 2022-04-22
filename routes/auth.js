const router = require("express").Router();
const User = require("../models/User");
var CryptoJS = require("crypto-js");
const { findOne } = require("../models/User");
const jwt = require("jsonwebtoken");

//Register
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASSWORD_SEC
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(500).json("Wrong Credentials");

    const hashPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASSWORD_SEC
    );

    const OriginalPassword = hashPassword.toString(CryptoJS.enc.Utf8);
    OriginalPassword != req.body.password &&
      res.status(500).json("Invalid Credtials");

    const { password, ...others } = user._doc;

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user._isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );

    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
