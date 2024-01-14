"use strict"

/*--------------------------------------*
BLOG APP
/*--------------------------------------*/

//! Call Models:
const Comments = require('../models/comments')

module.exports = {

    list: async (req, res) => {

        const data = await Comments.find()

        res.status(200).send({
            error: false,
            count: data.length,
            result: data
        })
    },

    create: async (req, res) => {
        
        const data = await Comments.create(req.body)

        res.status(201).send({
            error: false,
            body: req.body,
            result: data,
        })
    },

    read: async (req, res) => {

        const data = await Comments.findOne({ _id: req.params.commentId })
        res.status(200).send({
            error: false,
            result: data,

        })

    },

    update: async (req, res) => {
        
        const data = await Comments.updateOne({ _id: req.params.commentId }, req.body, { runValidators: true })

        res.status(202).send({
            error: false,
            body: req.body,
            result: data,
            newData: await Comments.findOne({ _id: req.params.commentId })
        })

    },

    delete: async (req, res) => {
        
        const data = await Comments.deleteOne({ _id: req.params.commentId })

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