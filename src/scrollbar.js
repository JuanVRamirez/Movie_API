$(document).ready(function () {
    var isDragging = false;
    var startPosition = 0;
    var startScrollLeft = 0;

    $('#popular_movies__cards').on('mousedown', function (e) {
        isDragging = true;
        startPosition = e.clientX;
        startScrollLeft = $('#popular_movies__cards').scrollLeft();
        return false;
    });

    $(document).on('mouseup', function () {
        isDragging = false;
    });

    $(document).on('mousemove', function (e) {
        if (!isDragging) return;
        var currentPosition = e.clientX;
        var distance = startPosition - currentPosition;
        $('#popular_movies__cards').scrollLeft(startScrollLeft + distance);
    });
});
$(document).ready(function () {
    var isDragging = false;
    var startPosition = 0;
    var startScrollLeft = 0;

    $('#popular_series__cards').on('mousedown', function (e) {
        isDragging = true;
        startPosition = e.clientX;
        startScrollLeft = $('#popular_series__cards').scrollLeft();
        return false;
    });

    $(document).on('mouseup', function () {
        isDragging = false;
    });

    $(document).on('mousemove', function (e) {
        if (!isDragging) return;
        var currentPosition = e.clientX;
        var distance = startPosition - currentPosition;
        $('#popular_series__cards').scrollLeft(startScrollLeft + distance);
    });
});

$(document).ready(function () {
    var isDragging = false;
    var startPosition = 0;
    var startScrollLeft = 0;

    $('#movie_genres__cards').on('mousedown', function (e) {
        isDragging = true;
        startPosition = e.clientX;
        startScrollLeft = $('#movie_genres__cards').scrollLeft();
        return false;
    });

    $(document).on('mouseup', function () {
        isDragging = false;
    });

    $(document).on('mousemove', function (e) {
        if (!isDragging) return;
        var currentPosition = e.clientX;
        var distance = startPosition - currentPosition;
        $('#movie_genres__cards').scrollLeft(startScrollLeft + distance);
    });
});