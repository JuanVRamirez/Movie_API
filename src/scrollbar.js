$(document).ready(function () {
    var isDragging = false;
    var startPosition = 0;
    var startScrollLeft = 0;

    $('.card').on('mousedown', function (e) {
        isDragging = true;
        startPosition = e.clientX;
        startScrollLeft = $('.popular_movies__cards').scrollLeft();
        return false;
    });

    $(document).on('mouseup', function () {
        isDragging = false;
    });

    $(document).on('mousemove', function (e) {
        if (!isDragging) return;
        var currentPosition = e.clientX;
        var distance = startPosition - currentPosition;
        $('.popular_movies__cards').scrollLeft(startScrollLeft + distance);
    });
});