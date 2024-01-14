"use strict"
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */

const router = require('express').Router()

const User = require('../controller/userController')

// ------------------------------------------
// User
// ------------------------------------------

// Login/logout:
// router.post('/login', User.login)
// router.all('/logout', User.logout)


router.route('/users')
    .get(User.list)

router.route('/register')
    .post(User.create)

router.route('/:userId')
    .get(User.read)
    .put(User.update)
    .delete(User.delete)

module.exports = router