$(document).ready(function() {

    // Load google map
    var map = new google.maps.Map(document.getElementById("map-section"), {
        center: new google.maps.LatLng(38.883340, -77.117982),
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        panControl: false,
        streetViewControl: false,
        mapTypeControl: false
    });


    $("#submit-bathroom").on("click", function(event) {
        // Prevent the default action of the element from happening
        event.preventDefault();

        // Inside the form input, use jq to grab the location input without spaces  
        var name = $("#name-input").val().trim();
        $("#name-input").val("");

        var review = $("#review-input").val().trim();
        $("#review-input").val("");

        var currentLocation = $("#current-location-input").val().trim();
        $("#current-location-input").val("");

        var image = $("#image-input").val().trim();
        $("#image-input").val("");

        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({
                address: currentLocation,
                region: 'no'
            },

            function(results, status) {
                var name = $("#name-input").val().trim();
                var review = $("#review-input").val().trim();
                var currentLocation = $("#current-location-input").val().trim();
                var image = $("#image-input").val().trim();

                if (status.toLowerCase() == 'ok') {
                    var coordinates = new google.maps.LatLng(
                        results[0]['geometry']['location'].lat(),
                        results[0]['geometry']['location'].lng()
                    );

                    map.setCenter(coordinates)
                    map.setZoom(13);

                    marker = new google.maps.Marker({
                        position: coordinates,
                        map: map,
                        // title: $('#current-location').val()
                    });
                }
            });
    });
});

// //the location from the text box has to be queued up in the array 
// var a = $("<button>"); 

//   //for the button stored in variable a, add a class of location 
//   a.addClass("location"); 

//   //for the button stored in variable a, add the data attribute 
//   a.attr("data-location", location); 

//   //for the button stored in variable a, write the text of the location 
//   a.text(location); 

//   //use jq to grab the buttons view div and add the button to it
//   //this is how we control the view, whether it is removed or added, etc.
//   $("#buttons-view").append(a);
