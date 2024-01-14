"use strict"

/*--------------------------------------*
BLOG APP
/*--------------------------------------*/

const mongoose = require('mongoose')

const likeSchema= new mongoose.Schema({
   
    owner:{
        type:String,
        trim:true,
    }


},{collection:'likes', timestamps:{createdAt:'publish_date', updatedAt:'update_date'}})

module.exports= mongoose.model('Likes', likeSchema)