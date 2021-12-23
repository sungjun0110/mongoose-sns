// click event listener for close/delete buttons
$('.close-btn').on('click', function() {
    $(this).parent().css('display', 'none');
});
$('.delete-btn').on('click', function() {
    $(this).parent().css('display', 'none');
});
$('.edit-btn').on('click', function() {
    $('#edit-div').toggleClass('active');
})

// click event listener for pins
$('.pin').on('click', function() {
    const photoId = $(this).children()[0].value;
    const postId = $(this).children()[1].value;
    $.ajax({
        url: `/posts/${photoId}/${postId}`
    })
    .done(function(data) {
        $('.delete-btn').attr('action', `/posts/${photoId}/${postId}?_method=DELETE`);
        $('#edit-form').attr('action', `/photos/${photoId}/${postId}?_method=PUT`);
        $('.posts > h3').text(data.title);
        $('.posts > p').text(data.content);
        $('.posts').css('display', 'block');
    })
});

function pinOpacity(dim, loop) {
    for (let i = 0; i < loop; i++) {
        if (dim) {
            dim = !dim;
            setTimeout(() => {
                $('.pin').css('opacity', '0.2')
            }, 350 * i);
        } else {
            dim = !dim;
            setTimeout(() => {
                $('.pin').css('opacity', '1');
            }, 350 * i);
        }
    }
}

// photo div in show ejs
$('#large-photo').on('click', function(e) {
    const coord = getPosition(e);
    $('#coords-input').val(`${coord.x}-${coord.y}`);
    addPin(coord.x, coord.y);
    $('#new-post').css('display', 'block');
});

// creates a pin div
function addPin(x, y) { // color
    const pinDiv = document.createElement('div');
    pinDiv.setAttribute('class', 'pin');
    pinDiv.style.left = `${x}%`;
    pinDiv.style.top = `${y}%`;
    $('#photo-div').append(pinDiv);
}

// gets the position of where you click in x, y coordinate. 
function getPosition(e) {
    const photoDiv = $('#photo-div');
    const x = e.pageX;
    const y = e.pageY - 200;
    const photoW = photoDiv.innerWidth();
    const photoH = photoDiv.innerHeight();
    const xr = x/photoW * 100;
    const yr = y/photoH * 100;
    return {x: xr.toFixed(2), y: yr.toFixed(2)};
}