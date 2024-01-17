"use strict"

/*--------------------------------------*
BLOG APP
/*--------------------------------------*/

const mongoose = require('mongoose')
const commentModel=require('./comments')
const likes = require('./likes')
const blogPostSchema= new mongoose.Schema({
   
    title: {
        type: String,
        trim: true,
        required: true
    },

    content: {
        type: String,
        trim: true,
        required: true
    },

    image:{
        type: String,
        trim: true,
    },

    category_name: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'BlogCategory',
        required: true,
    },

    // category: {
    //     type: mongoose.Schema.Types.ObjectId, 
    //     ref: 'BlogCategory',
    //     required: true,
    // },

    status:{
        type:String,
        enum:['p', 'd']
    },

    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comments',
    }],

    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    
    likes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],

    likes_n:{
        type: Number,
        // default: function(){ return this.likes.length }
        transform: function(){ return this.likes.length }
    },

    post_views:[{
        type:mongoose.Schema.Types.ObjectId,
        res:"User"
    }]
    

},{collection:'blogPost', timestamps:{createdAt:'publish_date', updatedAt:'update_date'}})


module.exports= mongoose.model('BlogPost', blogPostSchema)

