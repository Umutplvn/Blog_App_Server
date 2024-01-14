"use strict"

/*--------------------------------------*
BLOG APP
/*--------------------------------------*/

//! Call Models:
const BlogCategory = require('../models/blogCategory')

module.exports = {

    list: async (req, res) => {

        const data = await BlogCategory.find()

        res.status(200).send({
            error: false,
            count: data.length,
            result: data
        })
    },

    create: async (req, res) => {
        
        const data = await BlogCategory.create(req.body)

        res.status(201).send({
            error: false,
            body: req.body,
            result: data,
        })
    },

    read: async (req, res) => {

        const data = await BlogCategory.findOne({ _id: req.params.categoryId })
        
        res.status(200).send({
            error: false,
            result: data
        })

    },

    update: async (req, res) => {
        
        const data = await BlogCategory.updateOne({ _id: req.params.categoryId }, req.body, { runValidators: true })

        res.status(202).send({
            error: false,
            body: req.body,
            result: data,
            newData: await BlogCategory.findOne({ _id: req.params.categoryId })
        })

    },

    delete: async (req, res) => {
        
        const data = await BlogCategory.deleteOne({ _id: req.params.categoryId })

        if((data.deletedCount >= 1)){

            res.send({
                message:'Successfully deleted'
            })
        }else{
            res.send({
                message:"There is no recording to be deleted."
            })
        }

    },
}