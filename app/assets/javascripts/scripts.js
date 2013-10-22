

var pointer, template, $content_div, $step_input;
function populateCountries(all) {
    var step;
    if (all) {
        step = 'all'
    } else {
        step = parseInt($step_input.val());
    }
    // get step countries from database at pointer
    if (pointer < countries_count) {
        $.ajax({
            url: '/show',
            type: 'GET',
            dataType: 'json',
            data: {step: step, pointer: pointer},
        })
        .done(function(countries) {

            $.each(countries, function(i) {
                $content_div.append(template(countries[i]));
            });
            // console.log('pointer = ' + pointer);
        });
        pointer = pointer + step 
    }   
}

function handleScroll() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        populateCountries();
    }
}

$(function () {
    //where we'll be putting the countries
    $content_div = $('#content');

    $step_input = $('#step-input');

    // set step based on step val
    pointer = 0;

    template = Handlebars.compile($('#country-template').html());

    $(window).scroll(handleScroll);

    $('#populate-button').click(function() {
        populateCountries();
    });

    $('#reset-button').click(function() {
        $content_div.html('');
        pointer = 0;
        $(window).scroll(handleScroll);
    });

    $('#all-button').click(function() {
        $content_div.html('');
        $(window).off('scroll', handleScroll);
        populateCountries(true);
        pointer = 275;
    });

});