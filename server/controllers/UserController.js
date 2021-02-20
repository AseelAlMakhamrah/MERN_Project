const { User } = require('../models/userModels');
const bcrypt = require('bcrypt');
// const express = require('express');
// const jwt = require('jsonwebtoken');
const validateLogin = require('../validation/validateLogin');
const validateSignup = require('../validation/validateSignup');


// get all users 
module.exports.getAllUsers = async (request, response) => {
    const users = await User.find();
    response.status(200).json(users);
    response.json({
        message: "there is an testtttttttttttt"
    });
}
// login 
module.exports.signUp = async (request, response) => {
    response.json({
        message: "there is an testttttttttttttsign"
    });
    const { errors, isValid } = validateSignup(request.body);

    if (!isValid) {
        return response.status(400).json(errors);
    }

    try {
        const user = await User.find({ email: request.body.email }).exec();
        if (user.length > 0) {
            return response.status(409).json({ error: 'Email already exists.' });
        }
        return bcrypt.hash(request.body.password, 10, (error, hash) => {
            if (error) {
                return response.status(500).json({ error });
            }
            const newUser = new User({
                createdAt: new Date().getTime(),
                email: request.body.email,
                name: request.body.name,
                password: hash,
                passwordConfirm: hash,
            });
            return newUser
                .save()
                .then((result) => {
                    response.status(201).json({ result });
                })
                .catch((err) => {
                    response.status(500).json({ error: err });
                });
        });
    } catch (err) {
        return response.status(500).json({ err });
    }
}

module.exports.logIn = async (request, response) => {
    response.json({
        message: "there is an testttttttttttttLogin"
    });
    const { errors, isValid } = validateLogin(request.body);

    if (!isValid) {
        return response.status(400).json(errors);
    }

    try {
        const user = await User.findOne({ email: request.body.email }).exec();
        if (!user) {
            return response.status(401).json({
                email: 'Could not find email.'
            });
        }

        return bcrypt.compare(request.body.password, user.password, (err, result) => {
            if (err) {
                return response.status(401).json({
                    message: 'Auth failed.'
                });
            }
            if (result) {
                const token = jwt.sign(
                    {
                        createdAt: user.createdAt,
                        name: user.name,
                        email: user.email,
                        userId: user._id
                    },
                    process.env.REACT_APP_JWT_KEY || require('../secrets').jwtKey,
                    {
                        expiresIn: '1h'
                    }
                );
                return response.status(200).json({
                    message: 'Auth successful.',
                    token
                });
            }
            return response.status(401).json({
                password: 'Wrong password. Try again.'
            });
        });
    } catch (err) {
        return response.status(500).json({ message: err });
    }
}
// function
module.exports.findUser = async (request, response) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        if (user) {
            res.json({ user });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ err });
    }
}

module.exports.updateUser = async (request, response) => {
    const { id } = req.params;

    try {
        const user = await User.findOneAndUpdate(
            { _id: id },
            {
                $set: {
                    bio: request.body.bio || '',
                    email: request.body.email,
                    name: request.body.name,
                }
            },
            { new: true, upsert: true, setDefaultsOnInsert: true },
            (err) => {
                if (err != null && err.name === 'MongoError' && err.code === 11000) {
                    return response
                        .status(500)
                        .send({ message: 'This email is already in use.' });
                }
            }
        );
        if (!user) {
            return response.status(404).json({ message: 'User not found.' });
        }

        const token = jwt.sign(
            {
                bio: user.bio,
                createdAt: user.createdAt,
                name: user.name,
                email: user.email,
                userId: user._id
            },
            process.env.REACT_APP_JWT_KEY || require('../secrets').jwtKey,
            {
                expiresIn: '24h'
            }
        );

        return response.json({ user, token });
    } catch (err) {
        return response.status(500).json({ message: err });
    }
}
module.exports.addUserFollowing = async (request, response) => {
    const { id } = request.params;

    if (!request.body.idToFollow) {
        return response.status(404).json({ message: 'No ID found' });
    }

    try {
        await User.findByIdAndUpdate(
            id,
            { $addToSet: { following: request.body.idToFollow } },
            { new: true, upsert: true },
            (err, doc) => {
                if (err) {
                    return response.status(400).json(err);
                }
                return response.status(201).json(doc);
            }
        );
    } catch (e) {
        return response.status(500).json(err);
    }
}
module.exports.removeFollowing = async (request, response) => {
    const { id } = request.params;

    if (!request.body.idToUnfollow) {
        return response.status(404).json({ message: 'No ID found' });
    }

    try {
        await User.findByIdAndUpdate(
            id,
            { $pull: { following: request.body.idToUnfollow } },
            { new: true, upsert: true },
            (err, doc) => {
                if (err) {
                    return response.status(400).json(err);
                }
                return response.status(200).json(doc);
            }
        );
    } catch (e) {
        return response.status(500).json(err);
    }
}
module.exports.addUserFollowers = async (request, response) => {
    const { id } = request.params;

    if (!request.body.followerId) {
        return response.status(404).json({ message: 'No ID found' });
    }

    try {
        await User.findByIdAndUpdate(
            id,
            { $addToSet: { followers: request.body.followerId } },
            { new: true, upsert: true },
            (err, doc) => {
                if (err) {
                    return response.status(400).json(err);
                }
                return response.status(201).json(doc);
            }
        );
    } catch (e) {
        return response.status(500).json(err);
    }
}

module.exports.removeFollowers = async (request, response) => {
    const { id } = request.params;

    if (!request.body.idToUnfollow) {
        return response.status(404).json({ message: 'No ID found' });
    }

    try {
        await User.findByIdAndUpdate(
            id,
            { $pull: { followers: request.body.unfollowerId } },
            { new: true, upsert: true },
            (err, doc) => {
                if (err) {
                    return response.status(400).json(err);
                }
                return response.status(200).json(doc);
            }
        );
    } catch (e) {
        return response.status(500).json(err);
    }
}
module.exports.delete = async (request, response) => {
    try {
        await User.remove({ _id: request.params.id }).exec();
        response.status(200).json({ message: 'Successfully deleted user.' });
    } catch (err) {
        response.status(500).json({ message: err });
    }
}



