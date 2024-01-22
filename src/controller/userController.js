"use strict";

/*--------------------------------------*
BLOG APP
/*--------------------------------------*/

// Catch async-errors and send to errorHandler:
require("express-async-errors");
const passwordEncrypt=require('../helpers/passwordEncrypt')

const User = require("../models/userModel");
const Token = require("../models/token");

// ------------------------------------------
// User
// ------------------------------------------
module.exports = {
  list: async (req, res) => {
    const data = await req.getModelList(User);

    res.status(200).send({
      error: false,
      count: data.length,
      result: data,
    });
  },

  create: async (req, res) => {

    const data = await User.create(req.body);

    const { email, password } = req.body;

    if (email && password) {
      const user = await User.findOne({ email: email, password: password });
      if (user) {
        const tokenData ="Token "+passwordEncrypt(user._id+`${new Date()}`);
        
        await Token.create({ userId: user._id, token: tokenData });
    res.status(201).send({
        error:false,
        email:data.email,
        fistName:data.firstName,
        lastName:data.lastName,
        username:data.username,
        token:tokenData,
        image:data.image,
        userId:user._id,
        bio:data.bio
    });
      }}},

  read: async (req, res) => {
    const data = await User.findOne({ _id: req.params.userId });

    res.status(200).send({
      error: false,
      result: data,
    });
  },

  update: async (req, res) => {
    const data = await User.updateOne({ _id: req.params.userId }, req.body, {
      runValidators: true,
    });

    res.status(202).send({
      error: false,
      body: req.body,
      result: data, // update infos
      newData: await User.findOne({ _id: req.params.userId }),
    });
  },

  delete: async (req, res) => {
    const data = await User.deleteOne({ _id: req.params.userId });

    if (data.deletedCount >= 1) {
      res.send({
        message: "Successfully deleted",
      });
    } else {
      res.send({
        message: "There is no recording to be deleted.",
      });
    }
  },

  updatePassword:async(req, res)=>{

    const password=req.body.password
    
    await User.updateOne({_id:req.user}, {password:password}, {
      runValidators: true,
    })
    const newData= await User.findOne({_id:req.user})

    res.status(202).send({
      error:false,
      message:"Password has changed successfully.",
      newData
    })
  }
};
