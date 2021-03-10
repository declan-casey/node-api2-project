// implement your posts router here
const express = require('express')

const router = express.Router()

const Posts = require('./posts-model')

router.get('/api/posts', (req, res) => {
    Posts.find(req.query)
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(err => {
            res.status(500).json({
                message: "The posts information could not be retrieved"
            })
        })
})

router.get('/api/posts/:id', (req, res) => {
    Posts.findById(req.params.id)
        .then(post => {
            if(!post){
                res.status(404).json({
                    message: `The post with the ID: ${id} does not exist`
                })
            }else{
                res.status(200).json(post)
            }
        })
        .catch(err => {
            res.status(500).json({
                message: "The post information could not be retrieved"
            })
        })
})

router.post('/api/posts', (req, res) => {
    const newPost = req.body

    if(!newPost.title || !newPost.contents){
        res.status(400).json({
            message: "Please provide title and contents for the post"
        })
    } else{
        Posts.insert(newPost)
            .then(post => {
                res.status(201).json(post)
            })
            .catch( err => {
                res.status(500).json({
                    message: "There was an error while saving the post to the database"
                })
            })
    }
})

router.put('/api/posts/:id', (req, res) => {
    const changes = req.body
    const id = req.params.id

    Posts.update(id, changes)
        .then(change => {
            if(change){
                res.status(200).json(change)
            }else if(!req.title || req.contents){
                res.status(400).jsaon({
                    message: "Please provide title and contents for the post"
                })
            } else {
                res.status(404).json({
                    message: `The post with the ID: ${id} does not exist`
                })
            }
        })

        .catch( err => {
            res.status(500).json({
                message: "The post information could not be modified"
            })
        })
})

router.delete('/api/posts/:id', (req, res) => {
    const id = req.params.id;
    Posts.remove(id)
        .then(deleted => {
            if(!deleted){
                res.status(404).json({ message: `Them post with ${id} does not exist` });
            } else {
                res.status(200).json(deleted)
            }
        })
        .catch( err => {
            res.status(500).json({
                message: "The post could not be removed"
            })
        })
})

router.get("api/posts/:id/comments", (req, res) => {
    Posts.findById(req.params.id)
        .then(post => {
            if(!post){
                res.status(404).json({
                    message: "The comments information could not be retrieved"
                })
            } else{
                res.status(200).json(post)
            }
        })
        .catch(err => {
            res.status(500).json({
                message: "The comments information could not be retrieved"
            })
        })
})

router.get("/", (req, res) => {
    res.send(`yoooooooo what's up`);
  });

  module.exports = router;

