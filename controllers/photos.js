const Photo = require('../models/photo');
const Post = require('../models/post');

module.exports = {
    index,
    new: newPhoto,
    create,
    show,
    delete: deletePhoto,
}

function index(req, res) {
    Photo.find({}, function(err, photos) {
        res.render('photos/index', {
            title: 'All Photos',
            photos
        })
    })
}

function newPhoto(req, res) {
    res.render('photos/new', {
        title: "New Photo"
    });
}

function create(req, res) {
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
    const photo = new Photo(req.body);
    photo.save(function(err) {
        if (err) return res.redirect('/photos/new');
        res.redirect('/photos/new');
    })
}

function show(req, res) {
    Photo.findById(req.params.id).populate('posts').exec(function(err, photo) {
        res.render(`photos/show`, {
            title: 'Photo',
            photo
        });
    })
}

function deletePhoto(req, res) {
    console.log('WE ARE HERE');
    Photo.findByIdAndDelete(req.params.id, function(err, photo) {
        Post.deleteMany({_id: { $in: photo.posts }}, function(err, result) {
            res.redirect('/photos');
        })
    })
}