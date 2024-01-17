"use strict"

/*--------------------------------------*
BLOG APP
/*--------------------------------------*/

const mongoose = require('mongoose')

const commentsSchema= new mongoose.Schema({
   
    comment:{
        type:String,
        trim:true,
        required:true
    },

    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }

},{collection:'comments', timestamps:{createdAt:'publish_date', updatedAt:'update_date'}})

module.exports= mongoose.model('Comments', commentsSchema)