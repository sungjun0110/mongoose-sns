const photoDiv = document.getElementById('photo-div');
const position = photoDiv.getBoundingClientRect();
const coords = document.getElementById('coords-input');
const photo = document.getElementById('large-photo');
const newPostForm = document.getElementById('new-post');

const pins = document.getElementsByClassName('pin');
const posts = document.getElementsByClassName('posts');

for (let i = 0; i < pins.length; i++) {
    pins[i].addEventListener('click', function() {
        posts[i].style.display = 'block';
    });
}

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