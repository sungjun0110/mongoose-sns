const Photo = require('../models/photo');
const Post = require('../models/post')

module.exports = {
    create,
}

function create(req, res, next) {
    Photo.findById(req.params.photoId, function(err, photo) {
        const post = new Post(req.body);
        req.body.coords = req.body.coords.split('-');
        photo.groups.push(req.body);
        photo.save(function(err) {
            const group = photo.groups[photo.groups.length - 1];
            group.posts.push(post._id);
            photo.save(function(err) {
                post.save(function(err) {
                    res.redirect('back');
                })
            })
        })
    })
};