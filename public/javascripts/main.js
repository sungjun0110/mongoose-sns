const photoDiv = document.getElementById('photo-div');
const position = photoDiv.getBoundingClientRect();
const coords = document.getElementById('coords-input');
const photo = document.getElementById('large-photo');
const newPostForm = document.getElementById('new-post');

const pins = document.getElementsByClassName('pin');
const posts = document.getElementsByClassName('posts');

$('.pin').on('click', function() {
    const photoId = $(this).children()[0].value;
    const pinId = $(this).children()[1].value;
    console.log(`/pins/${photoId}/${pinId}`);
    $.ajax({
        url: `/pins/${photoId}/${pinId}`
    })
    .done(function(data) {
        console.log($('#posts > h3'));
        console.log(data);
        $('.posts > h3').text(data[0].title);
        $('.posts > p').text(data[0].content);
        $('.posts').css('display', 'block');
    })
});

photo.addEventListener('click', function(e) {
    const coord = getPosition(e);
    coords.value = coord.x + '-' + coord.y;
    addPin(coord.x, coord.y);
    newPostForm.style.display = 'block';
});

function addPin(x, y) { // color
    const pinDiv = document.createElement('div');
    pinDiv.setAttribute('class', 'pin');
    pinDiv.style.left = `${x}%`;
    pinDiv.style.top = `${y}%`;
    photoDiv.appendChild(pinDiv);
}

function getPosition(e) {
    const x = e.pageX - (window.innerWidth * 0.1);
    const y = e.pageY - 50;
    const photoW = photoDiv.clientWidth;
    const photoH = photoDiv.clientHeight;
    const xr = x/photoW * 100;
    const yr = y/photoH * 100;
    return {x: xr.toFixed(2), y: yr.toFixed(2)};
}