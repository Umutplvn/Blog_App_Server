"use strict"

/*--------------------------------------*
BLOG APP
/*--------------------------------------*/


const router = require('express').Router()

//! Call controller

 const BlogCategory = require('../controller/blogCategory')

router.route('/categories')
.get(BlogCategory.list)
.post(BlogCategory.create)

router.route('/categories/:categoryId')
.get(BlogCategory.read)
.put(BlogCategory.update)
.delete(BlogCategory.delete)


module.exports = router