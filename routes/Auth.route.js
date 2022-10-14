const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const User = require("../Models/User.Model");
const { authSchema } = require("../helper/validation_schema");
const {signAccessToken} = require('../helper/jwt_helper')

router.post("/register", async (req, res, next) => {
  //   console.log(req.body);
  try {
    // const { email, password } = req.body;
    //sanitized req body
    const result = await authSchema.validateAsync(req.body);

    // if (!email || !password) {
    //   throw createError.BadRequest();
    // }
    const doesExist = await User.findOne({ email: result.email });
    if (doesExist) {
      throw createError.Conflict(`User ${result.email} already exit`);
    }
    const user = new User(result);
    const savedUser = await user.save();
    const accessToken = await signAccessToken(savedUser.id)
    res.send(accessToken);
  } catch (e) {
    if (e.isJoi === true) e.status = 422;
    next(e);
  }
});
router.post("/login", async (req, res, next) => {
  res.send("Login Route");
});
router.post("/refresh-token", async (req, res, next) => {
  res.send("Refresh Token Route");
});
router.delete("/logout", async (req, res, next) => {
  res.send("Logout Route");
});

module.exports = router;
