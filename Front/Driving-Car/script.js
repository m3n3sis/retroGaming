$(document).ready(function() {

    // variables

    $surface = $('.surface');
    $car = $('car');
    $img = $('.car img');
    let flag = true;


    // déplacement
    $(document).on('keypress', function(e) {
            if (e.which == 13) {
                $($surface).toggleClass('moveRight');
                $($car).toggleClass('suspension');

            }
        })
        // lumières
    $(document).on('keypress', function(e) {
        if (e.which == 119) {
            if (flag) {
                flag = false;
                $img.attr('src', cars[0]);
            } else {
                flag = true;
                $img.attr('src', cars[1]);

            }

        }
    })

});