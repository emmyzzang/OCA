// Initilize Google Maps API and displaying to the page
function initMap() {
    var defaultPosition = new google.maps.LatLng(38.883340, -77.117982);
    var map = new google.maps.Map(document.getElementById("map-section"), {
        center: defaultPosition,
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        panControl: false,
        streetViewControl: false,
        mapTypeControl: false
    });


    // Event listener for our submit bathroom button
    $("#submit-bathroom").on("click", function(event) {


        // Prevent the default action of the element from happening
        event.preventDefault();


        // Setting the variables to correspond to the input fields
        var name = $("#name-input").val().trim();
        $("#name-input").val("");

        var review = $("#review-input").val().trim();
        $("#review-input").val("");

        var address = $("#address-input").val().trim();
        $("#address-input").val("");

        var image = $("#image-input").val().trim();
        $("#image-input").val("");


        // Setting up our firebase configuration
        var config = {
            apiKey: "AIzaSyAGDsGNskbjVbwEFV8Ww9nINcsKZ0YgfEY",
            authDomain: "ohhh-crapp.firebaseapp.com",
            databaseURL: "https://ohhh-crapp.firebaseio.com",
            projectId: "ohhh-crapp",
            storageBucket: "ohhh-crapp.appspot.com",
            messagingSenderId: "286848805874"
        };

        firebase.initializeApp(config);

        var database = firebase.database();


        // Setting the object to store our information
        var newPost = {
            name: name,
            address: address,
            review: review,
            image: image,
        };


        // Pushing our input values to a new object for each submission
        database.ref().push(newPost);

        database.ref().on("child_added", function(snapshot) {
            name: snapshot.val().name;
            address: snapshot.val().address;
            review: snapshot.val().review;
            image: snapshot.val().image
            // Write this information to the marker and/or page somewhere
        });


        // Setting up the geocoder so when we type in the physical address it will convert to lattitude and longitude coordinates for us
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({
                address: address,
                region: 'no'
            },

            function(results, status) {
                var name = $("#name-input").val().trim();
                var address = $("#address-input").val().trim();
                var review = $("#review-input").val().trim();
                var image = $("#image-input").val().trim();


                // Setting the icon variable to the image we'll use
                var icon = {
                    url: "assets/images/poop-emoji.png",
                    scaledSize: new google.maps.Size(30, 30),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(0, 0)
                };

                if (status.toLowerCase() == 'ok') {
                    var coordinates = new google.maps.LatLng(
                        results[0]['geometry']['location'].lat(),
                        results[0]['geometry']['location'].lng()
                    );

                    map.setCenter(coordinates)
                    map.setZoom(10);

                    marker = new google.maps.Marker({
                        position: coordinates,
                        map: map,
                        icon: icon
                    });


                    // Event listener for the click so we can open an information window
                    marker.addListener('click', function() {
                        infowindow.open(map, marker);

                    });


                    // Setting the variable that will store the content the user types in so we can store it in an information window, need to fix this
                    var contentString = 'Name: ' + 'name value' + '<br>' + 'Address: ' + 'address value' + '<br>' + '<br>' + 'image' + '<br>' + '<br>' + 'review value';


                    // Setting up the information window
                    var infowindow = new google.maps.InfoWindow({
                        content: contentString
                    });
                }
            });
    });
};
