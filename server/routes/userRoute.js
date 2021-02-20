const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');
const validateLogin = require('../validation/validateLogin');
const validateSignup = require('../validation/validateSignup');
const User = require('../models/userModel');


// const router = new express.Router();


module.exports = function(router){
    router.get('/api', ProductController.index);
    router.post('/api/create', ProductController.createProduct);
    router.get('/api/find', ProductController.findpro);
}