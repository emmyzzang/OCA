// Initialize Google Maps API and displaying to the page
function initMap() {
    var autocomplete = new google.maps.places.Autocomplete(
        (document.getElementById('address-input')), { types: ['geocode'] });

    var defaultPosition = new google.maps.LatLng(38.883340, -77.117982);

    var map = new google.maps.Map(document.getElementById("map-section"), {
        center: defaultPosition,
        zoom: 7,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        panControl: false,
        streetViewControl: false,
        mapTypeControl: false,
    });


    // Setting up our firebase configuration
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyB9nsZljpiCtBWyKOKUbW3uHC4G-jvwnBY",
        authDomain: "oca-db-deb77.firebaseapp.com",
        databaseURL: "https://oca-db-deb77.firebaseio.com",
        projectId: "oca-db-deb77",
        storageBucket: "gs://oca-db-deb77.appspot.com",
        messagingSenderId: "386358233518"
    };

    firebase.initializeApp(config);

    var database = firebase.database();

    //USER QUERY EXISTING DB DATA

    // Event listener for button for user to query existing bathroom db 
    // for bathroom location that the user is trying to find 

    $("#add-location").click(function(event) {
        event.preventDefault();

        // Grab the user input and store into declarative variable
        var newLocation = $("#location-input").val().trim();

        newObject = {
            location: newLocation
        };

        database.ref().push(newObject);
        alert("WOOO!");
    });


    //USER ADDING NEW DATA TO DB VIA ADD CHILD

    // // Create a root reference in a declarative variable 
    var storageRef = firebase.storage().ref();

    // // Create a reference to 'TEST.jpg'
    var testRef = storageRef.child('/Users/emmyemme/Desktop/TEST.png');

    // // Create a reference to 'images/TEST.jpg'
    var testImagesRef = storageRef.child('images/TEST_TWO.jpg');

    // While the file names are the same, the references point to different files
    testRef.name === testImagesRef.name // true
    testRef.fullPath === testImagesRef.fullPath // false


    $("#submit-bathroom").on("click", function(event) {
        event.preventDefault();

        // Setting the variables to correspond to the input fields
        var name = $("#name-input").val().trim();
        var review = $("#review-input").val().trim();
        var address = $("#address-input").val().trim();
        var image = $("#image-input").val().trim();

        // ** IMAGE UPLOAD STUFF ** //
        var metadata = {
            contentType: 'image',
            customMetadata: {
                'uploadedBy': 'Mr. Biggz',
                'title': 'Biggie Sundae',
                'caption': 'A Biggz Caption!!!'
            },
        };





        // //Image Storage Section Begins
        var blob = new Blob([image], { type: "image/jpeg" });

        var imageName = image.replace('C:\\fakepath\\', '');

        // var uploadTask = firebase.storage().ref()
        //     .child(imageName)
        //     .put(blob, metadata);

        // // Observe state change events such as progress, pause, and resume
        // uploadTask.on('state_changed', function(snapshot) {


        //     },

        //     // Handle unsuccessful uploads   
        //     function(error) {

        //     },

        //     function() {
        //         console.log("SUCCESS!!!!!!");

        //     });
        // // Image Storage Section Ends





        // Setting the object to store our information
        var newPost = {
            name: name,
            address: address,
            review: review,
            image: image,
        };

        // Pushing our input values to the newPost object for each submission
        database.ref().push(newPost);

        // Adding each submission to our database
        database.ref().on("child_added", function(snapshot) {
            name: snapshot.val().name;
            address: snapshot.val().address;
            review: snapshot.val().review;
            image: snapshot.val().image;
        });

        // Geocoder will convert the address string to lattitude & longitude
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

                    map.setCenter(defaultPosition)
                    map.setZoom(7);

                    marker = new google.maps.Marker({
                        position: coordinates,
                        map: map,
                        icon: icon
                    });

                    var contentString = '<img src="#" height="400px">' + '<br>' + '<br>' + 'NAME: ' + '<br>' + newPost.name.toUpperCase() + '<br>' + '<br>' + 'ADDRESS: ' + '<br>' + newPost.address.toUpperCase() + '<br>' + '<br>' + '<strong>REVIEW:</strong> ' + '<br>' + newPost.review.toUpperCase();

                    // Display the modal when the marker is clicked
                    marker.addListener('click', function() {
                        $('#myModal').modal('show');
                        $('#marker-info').html(contentString)
                        $('location-header').html(newPost.address.toUpperCase())
                        // infowindow.setContent()
                        // infowindow.open(map, this);
                    });
                }
            });
    });
};


//Clear the input forms upon submission
$("#review-input").val("");
$("#name-input").val("");
$("#address-input").val("");
$("#image-input").val("");
$("#location-input").val("");


function addMarkers() {

    // Pull markers from the database and add them to our map

};

addMarkers();
