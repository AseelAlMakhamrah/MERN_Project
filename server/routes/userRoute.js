
const User = require('../models/userModels');
const UserController = require('../controllers/UserController');


module.exports = function(app){
    app.get('/', UserController.getAllUsers);
    // Login
    app.post('/signup', UserController.signUp);
    app.post('/login', UserController.logIn);

    // Get a user by their id
    app.get('/:id', UserController.findUser);
    // Update a user's information, ProductController.findpro);
    app.patch('/login', UserController.updateUser);
    // Add a user to the list of users you are following
    app.patch('/following/:id', UserController.addUserFollowing);
    // Remove a user from the list of users you are following
    app.patch('/unfollowing/:id', UserController.removeFollowing);
    // Add a user to the list of users that are following you
    app.patch('/followers/:id', UserController.addUserFollowers);
    // Remove a user from the list of users that are following you
    app.patch('/unfollowers/:id', UserController.removeFollowers);
    // Delete a user
    app.delete('/:id', UserController.delete);

}