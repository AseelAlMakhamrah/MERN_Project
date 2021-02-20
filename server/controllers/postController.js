const { Post } = require('../models/userModels');
const bcrypt = require('bcrypt');
// const express = require('express');
// const jwt = require('jsonwebtoken');
const validateLogin = require('../validation/validateLogin');
const validateSignup = require('../validation/validateSignup');


module.exports.getPosts = async (request, response) => {
    const posts = await Post.find();
    response.status(200).json(posts);
    response.json({
        message: "there is an testtttttttttttt"
    });
}

module.exports.createPost = async (request, response) => {
    const newPost = new Post({
        authorId: request.body.authorId,
        comments: [],
        likers: [],
        likesCount: 0,
        text: request.body.text,
        timestamp: new Date().getTime()
    });
    try {
        const post = await newPost.save();
        return response.status(201).json(post);
    } catch (err) {
        return response.status(400).send(err);
    }
}

module.exports.postsEdit = async (request, response) => {
    const { id } = request.params;

    if (!ObjectID.isValid(id)) {
        return response.status(404).send();
    }

    if (request.body.action === 'like') {
        try {
            return Post.findByIdAndUpdate(
                id,
                {
                    $inc: { likesCount: 1 },
                    $addToSet: { likers: request.body.id }
                },
                { new: true },
                (err, post) => {
                    if (err) return response.status(400).send(err);
                    return response.send(post);
                }
            );
        } catch (err) {
            return response.status(400).send(err);
        }
    }
    if (request.body.action === 'unlike') {
        try {
            return Post.findByIdAndUpdate(
                id,
                {
                    $inc: { likesCount: -1 },
                    $pull: { likers: request.body.id }
                },
                { new: true },
                (err, post) => {
                    if (err) return response.status(400).send(err);
                    return response.send(post);
                }
            );
        } catch (err) {
            return response.status(400).send(err);
        }
    }

    if (request.body.action === 'addComment') {
        try {
            return Post.findByIdAndUpdate(
                id,
                {
                    $push: {
                        comments: {
                            commenterId: request.body.commenterId,
                            text: request.body.text,
                            timestamp: new Date().getTime()
                        }
                    }
                },
                { new: true },
                (err, post) => {
                    if (err) return response.status(400).send(err);
                    return response.send(post);
                }
            );
        } catch (err) {
            return response.status(400).send(err);
        }
    }

    if (request.body.action === 'deleteComment') {
        try {
            return Post.findByIdAndUpdate(
                id,
                {
                    $pull: {
                        comments: {
                            _id: request.body.commentId
                        }
                    }
                },
                { new: true },
                (err, post) => {
                    if (err) return response.status(400).send(err);
                    return response.send(post);
                }
            );
        } catch (err) {
            return response.status(400).send(err);
        }
    }

    if (request.body.action === 'editComment') {
        try {
            return Post.findById(id, (err, post) => {
                const { comments } = post;
                const theComment = comments.find(comment =>
                    comment._id.equals(request.body.commentId));

                if (!theComment) return response.status(404).send('Comment not found');
                theComment.text = request.body.text;

                return post.save((error) => {
                    if (error) return response.status(500).send(error);
                    return response.status(200).send(post);
                });
            });
        } catch (err) {
            return response.status(400).send(err);
        }
    }

    try {
        return Post.findByIdAndUpdate(
            id,
            { $set: { text: request.body.text } },
            { new: true },
            (err, post) => {
                if (err) return response.status(400).send(err);
                return response.send(post);
            }
        );
    } catch (err) {
        return response.status(400).send(err);
    }
}

module.exports.deletePost = async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);
        await post.remove();
        return response.json({ success: true });
    } catch (err) {
        return response.status(404).send(err);
    }
}



