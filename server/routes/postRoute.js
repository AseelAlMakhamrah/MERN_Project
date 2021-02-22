
const User = require('../models/postModels');
const PostController = require('../controllers/PostController');


module.exports = function(appPost){
    appPost.get('/', PostController.getPosts);

    appPost.post('/', PostController.createPost);
    appPost.patch('/:id', PostController.postsEdit);

    appPost.delete('/:id', PostController.deletePost);

}