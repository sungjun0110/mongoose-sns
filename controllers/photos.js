const Photo = require('../models/photo');

module.exports = {
    index,
    new: newPhoto,
    create
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
    res.render('photos/new');
}

function create(req, res) {

}