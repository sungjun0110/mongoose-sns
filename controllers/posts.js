const Post = require('../models/post');

module.exports = {
    index,
    new: newPost,
    create,
}

function index(req, res) {
    Post.find({}, function(err, posts) {
        res.render('posts/index', {
            title: 'All Posts',
            posts
        })
    })
}

function newPost(req, res) {
    res.render('posts/new', { title: 'New Post' })
}

function create(req, res) {
    const post = new Post(req.body);
    post.save(function(err) {
        if (err) {
            console.log(err);
            return res.redirect('back');
        }
        res.redirect(`back`)
    })
}