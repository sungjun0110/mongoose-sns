const Photo = require('../models/photo');
const Post = require('../models/post');

module.exports = {
    show,
    create,
    index,
    delete: deletePost,
    update,
}

function show(req, res) {
    Post.findById(req.params.postId, function(err, post) {
        res.send(post);
    })
}

function create(req, res, next) {
    Photo.findById(req.params.photoId, function(err, photo) {
        req.body.user = req.user._id;
        req.body.userName = req.user.name;
        req.body.userAvatar = req.user.avatar;
        req.body.coords = req.body.coords.split('-');
        const post = new Post(req.body);
        photo.posts.push(post._id);
        photo.save(function(err) {
            post.save(function(err) {
                res.redirect('back');
            })
        })
    })
};

function index(req, res) {
    const photoId = req.params.photoId;

    Photo.findById(photoId).populate('posts').exec(function(err, photo) {
        res.send(photo);
    })
}

function deletePost(req, res) {
    const photoId = req.params.photoId;
    const postId = req.params.postId;

    Post.findByIdAndDelete(postId, function(err, post) {
        Photo.findById(photoId, function(err, photo) {
            const posts = photo.posts;
            for (let i = 0; i < posts.length; i++) {
                if (posts[i].valueOf() === postId) {
                    posts.splice(i, 1);
                    photo.posts = posts;
                    photo.save(function(err) {
                        res.redirect('back');
                    });
                }
            }
        })
    })
}

function update(req, res) {
    Post.findById(req.params.postId, function(err, post) {
        post.title = req.body.title;
        post.content = req.body.content;
        post.save(function(err) {
            res.redirect(`/photos/${req.params.photoId}`);
        })
    })
}