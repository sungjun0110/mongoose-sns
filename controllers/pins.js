const Photo = require('../models/photo');
const Post = require('../models/post')

module.exports = {
    create,
    index,
    delete: deletePin,
}

function create(req, res, next) {
    Photo.findById(req.params.photoId, function(err, photo) {
        const post = new Post(req.body);
        req.body.coords = req.body.coords.split('-');
        photo.pins.push(req.body);
        photo.save(function(err) {
            const group = photo.pins[photo.pins.length - 1];
            group.posts.push(post._id);
            photo.save(function(err) {
                post.save(function(err) {
                    res.redirect('back');
                })
            })
        })
    })
};

function index(req, res) {
    const photoId = req.params.photoId;
    const pinId = req.params.pinId;
    const postsArr = [];
    Photo.findById(photoId, function(err, photo) {
        photo.pins.forEach(pin => {
            if (pin._id.toString() === pinId) {
                pin.posts.forEach(post => {
                    Post.findById(post._id, function(err, post) {
                        postsArr.push(post);
                        res.send(postsArr);
                    });
                })
            }
        })
    })
}

function deletePin(req, res) {
    const photoId = req.params.photoId;
    const pinId = req.params.pinId;
    Photo.updateOne({_id: photoId}, {$pull: {'pins': {_id: pinId}}}, function(err, result) {
        if(err) res.redirect('back');
        console.log(result);
        res.redirect(`/photos/${photoId}`);
    })
}