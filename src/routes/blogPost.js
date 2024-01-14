"use strict"

/*--------------------------------------*
BLOG APP
/*--------------------------------------*/


const router = require('express').Router()
const permission =require('../middlewares/permissions')

//! Call controller

 const BlogPost = require('../controller/blogPost')

router.route('/blogs')
.get(BlogPost.list)
.post(permission.isLogin, BlogPost.create)

router.route('/blogs/:postId')
.get(permission.isLogin, BlogPost.read)
.put(permission.isBlogOwner, BlogPost.update)
.delete(permission.isBlogOwner, BlogPost.delete)

router.route('/blogs/:postId/comment')
.post(permission.isLogin, BlogPost.pushComment)

router.route('/blogs/:postId/commentdelete')
.post(permission.isBlogOwner, BlogPost.pullComment)

router.route('/blogs/:postId/like')
.post(permission.isLogin, BlogPost.createLike)

module.exports = router