"use strict"

/*--------------------------------------*
BLOG APP
/*--------------------------------------*/


const router = require('express').Router()
const permission=require('../middlewares/permissions')

//! Call controller

 const Comments = require('../controller/comments')

router.route('/comment')
.get(Comments.list)
.post(permission.isLogin, Comments.create)

router.route('/comments/:commentId')
.get(Comments.read)
.put(Comments.update)
.delete(Comments.delete)


module.exports = router