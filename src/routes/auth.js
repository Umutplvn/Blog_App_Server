"use strict"
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */

const router = require('express').Router()

const Auth = require('../controller/auth')

// ------------------------------------------
// User
// ------------------------------------------

// Login/logout:

router.post('/login', Auth.login)
router.get('/logout', Auth.logout)
router.post('/logout', Auth.logout)

module.exports=router