"use strict";

const express = require("express");
const Token = require("../models/token");
const User = require("../models/userModel");
const passwordEncrypt = require("../helpers/passwordEncrypt.js");

module.exports = {
  login: async (req, res) => {
    const { email, password } = req.body;

    if (email && password) {
      // const user = await User.findOne({ email: email, password: passwordEncrypt(password) })
      // No need passwordEncrypt, because using "set" in model:
      const user = await User.findOne({ email: email, password: password });
      if (user) {
        const tokenData ="Token "+passwordEncrypt(user._id+`${new Date()}`);
        
        await Token.create({ userId: user._id, token: tokenData });

        res.status(200).send({
          user: {
            error: false,
            email: user.email,
            userId: user._id,
            Token: tokenData,
          },
        });
      } else {
        res.errorStatusCode = 401;
        throw new Error("Login parameters are not true.");
      }
    } else {
      res.errorStatusCode = 400;
      throw new Error("Email and Password are required.");
    }
  },

  logout: async (req, res) => {
    const token =await req.headers?.authorization || null;
    let message = "";

    if (token) {
      const deletedToken = await Token.deleteOne({ token: token });
      message= "Logout OK";
    } else {
      message= "Logout failed";
    }

    res.status(200).send({
      error: false,
      message: message,
    });
  },
};
