const Photo = require('../models/photo');

module.exports = {
    index,
    new: newPhoto,
    create,
    show
}

function index(req, res) {
    Photo.find({}, function(err, photos) {
        console.log(photos);
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
    const photo = new Photo(req.body);
    photo.save(function(err) {
        if (err) return res.redirect('/photos/new');
        res.redirect('/photos/new');
    })
}

function show(req, res) {
    Photo.findById(req.params.id, function(err, photo) {
        res.render(`photos/show`, {
            title: Photo,
            photo
        })
    })
}