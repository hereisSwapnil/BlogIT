const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// register a new user
router.post("/register", async (req, res) => {
  try {
    console.log(req.body);
    const { username, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hashSync(password, salt);
    const newUser = new User({ username, email, password: hashedPassword });
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

// login in a new user
router.post("/login", async (req, res) => {
  //   try {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json("User not found");
  }
  //   console.log(user);
  const matchPassword = await bcrypt.compareSync(password, user.password);
  if (!matchPassword) {
    return res.status(401).json("Invalid Credentials");
  }
  const token = jwt.sign(
    { id: user._id, username: user.username, email: user.email },
    process.env.SECRET,
    {
      expiresIn: "14d",
    }
  );
  const { password: UserPassword, ...info } = user._doc;
  res
    .cookie("token", token, { secure: true, sameSite: "lax" })
    .status(200)
    .json(info);
  //   res.status(200).json(user);
  //   } catch (error) {
  //     res.status(500).json(error);
  //   }
});

// logout a user by deleting cookies
router.get("/logout", async (req, res) => {
  try {
    res
      .clearCookie("token", { secure: true })
      .status(200)
      .send("user successfully logged out");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/refetch", (req, res) => {
  const token = req.cookies.token;
  jwt.verify(token, process.env.SECRET, {}, async (err, data) => {
    if (err) {
      return res.status(404).json(err);
    }
    console.log(data);
    res.status(200).json(data);
  });
});

module.exports = router;
