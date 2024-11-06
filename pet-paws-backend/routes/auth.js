const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { generateAccessToken, generateRefreshToken, REFRESH_TOKEN_SECRET } = require("../utils/jwt");

const router = express.Router();


router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error registering user" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save()
    res.json({ accessToken, refreshToken });
  } catch (err) {
    res.status(500).json({ error: "Error logging in" });
  }
});

router.post('/refresh-token', async(req, res) => {
  const {refreshToken} = req.body;
  if(!refreshToken) {
    return res.status(401).json({error: 'Refresh token required'})
  }

  try {
    const user = await User.findOne({refreshToken});
    if(!user) {
      return res.status(403).json({error: 'Invalid refresh token'})
    }

    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, decoded) => {
      if(err) {
        return res.status(403).json({error: 'Invalid refresh token'});
      }
      const accessToken = generateAccessToken(user);
      res.json({accessToken})
    })
  } catch(err) {
    res.status(500).json({error: 'Error refreshing token'})
  }
});

router.post('/logout', async (req, res) => {
  const {refreshToken} = req.body;
  if(!refreshToken) {
    return res.status(401).json({error: 'Refresh token required'});
  }
  try {
    const user = await User.findOne({refreshToken});
    if(!user) {
      return res.status(403).json({error: 'Invalid refresh token'})
    }
    user.refreshToken = null;
    await user.save();
    res.json({message: 'Logged out successfully'})
  } catch(err) {
    res.status(500).json({error: 'Error logging out'});
  }
})

module.exports = router;
