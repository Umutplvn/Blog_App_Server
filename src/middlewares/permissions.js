"use strict";

const blogPost = require("../models/blogPost");

/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */

// Middleware: permissions

module.exports = {
  isLogin: (req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.errorStatusCode = 403;
      throw new Error("NoPermission: You must login.");
    }
  },

  isBlogOwner: async (req, res, next) => {
    const blog = await blogPost
      .findOne({ _id: req.params.postId })
      .populate("author");

    if (blog?.author?.id == req.user) {
      next();
    } else {
      res.errorStatusCode = 403;
      res.send({
        error: true,
        message:
          "NoPermission: Only the owner of this content have right to proceed.",
      });
    }
  },
};
