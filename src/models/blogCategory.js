"use strict"

/*--------------------------------------*
BLOG APP
/*--------------------------------------*/

const mongoose = require('mongoose')

const blogCategorySchema= new mongoose.Schema({
   
    name: {
        type: String,
        trim: true,
        required: true
    }


},{collection:'blogCategory', timestamps:{createdAt:'publish_date', updatedAt:'update_date'}})

module.exports= mongoose.model('BlogCategory', blogCategorySchema)