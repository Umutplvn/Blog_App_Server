"use strict";

/*--------------------------------------*
BLOG APP
/*--------------------------------------*/

//! Call Models:
const BlogPost = require("../models/blogPost");
const Comments = require("../models/comments");
const User = require("../models/userModel");

module.exports = {
  list: async (req, res) => {
    const data = await BlogPost.find()
      .populate("category_name")
      .populate("comments")
      .populate("likes")
      .populate("author")

    res.status(200).send({
      error: false,
      count: data.length,
      result: data,
    });
  },

  create: async (req, res) => {

    const user=await User.findOne({_id:req.user})

    const body = req.body;
    const author = req.user;
    body.author = author;
    body.userImage=user.image

    const data = (await BlogPost.create(body))

    res.status(201).send({
      error: false,
      body: req.body,
      result: data,
    });
  },

  read: async (req, res) => {

      await BlogPost.updateOne({ _id: req.params.postId }, { $addToSet: { post_views: req.user } })
      
      const data = await BlogPost.findOne({ _id: req.params.postId })
      .populate("category_name")
      .populate("comments")
      .populate("likes")
      .populate("author")

    res.status(200).send({
      error: false,
      result: data,
      user:req.user
    });
  },

  update: async (req, res) => {
    const data = await BlogPost.updateOne(
      { _id: req.params.postId },
      req.body,
      { runValidators: true }
    );

    res.status(202).send({
      error: false,
      body: req.body,
      result: data,
      newData: await BlogPost.findOne({ _id: req.params.postId }),
    });
  },

  delete: async (req, res) => {
    const data = await BlogPost.deleteOne({ _id: req.params.postId });
    console.log("data", data);

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

  pushComment: async (req, res) => {
    
    const user = await User.findOne({_id:req.user})

    const yorum =  await Comments.create({
       comment: req.body.comment,
       author: req?.user,
       username:user?.username,
       userImage:user.image
     });
    
     const data = await BlogPost.updateOne(
      { _id: req.params.postId },
      { $push: { comments: yorum._id } }
    );
    const newData = await BlogPost.findOne({ _id: req.params.postId })
    .populate("comments")


    res.status(202).send({
      error: false,
      commentsCount: newData.comments.length,
      new: newData,
    });
  },

  pullComment: async (req, res) => {
    const user = req.user;
    const blog = await BlogPost.findOne({ _id: req.params.postId }).populate(
      "comments"
    );
    const commentFind = await blog.comments.filter(
      (item) => item._id == req.body.commentId
    );

    const commentId = req.body.commentId;

    let message = undefined;

    if (commentFind[0].author == user) {
      const data = await BlogPost.updateOne(
        { _id: req.params.postId },
        { $pull: { comments: commentId } }
      );
      message = "Successfully Deleted";
    } else {
      message = "You can only delete your own comments.";
    }

    const newData = await BlogPost.findOne({ _id: req.params.postId });
    res.status(202).send({
      error: false,
      new: newData,
      message,
    });
  },


  createLike: async (req, res) => {
    const user=req.user
    const data = await BlogPost.findOne({ _id: req.params.postId, likes:req.user })

    let newData = undefined;
    let message = undefined;

    if (!data) {
      const body = req.body;
      body.owner = req.user;

      newData = await BlogPost.updateOne({ _id: req.params.postId },
        { $push: { likes: req.user }}

      );
      console.log(req.user);

      message = "Liked";
    } else {
      newData = await BlogPost.updateOne(
        { _id: req.params.postId },
        { $pull: { likes: req.user } }
      );
      message = "Disliked";

    }

    const result = await BlogPost.findOne({ _id: req.params.postId });

    res.status(200).send({
      error: false,
      result: result,
      message,
    });
  },
};
