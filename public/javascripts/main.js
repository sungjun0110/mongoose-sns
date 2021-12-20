// click event listener for close buttons
$('.close-btn').on('click', function() {
    $(this).parent().css('display', 'none');
})

// click event listener for pins
$('.pin').on('click', function() {
    const photoId = $(this).children()[0].value;
    const pinId = $(this).children()[1].value;
    $.ajax({
        url: `/pins/${photoId}/${pinId}`
    })
    .done(function(data) {
        $('.close-btn').attr('action', `/pins/${photoId}/${pinId}?_method=DELETE`);
        $('.posts > h3').text(data[0].title);
        $('.posts > p').text(data[0].content);
        $('.posts').css('display', 'block');
    })
});

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