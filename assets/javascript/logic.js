// Initialize Google Maps API and displaying to the page
function initMap() {
    var autocomplete = new google.maps.places.Autocomplete(
        (document.getElementById('address-input')), { types: ['geocode'] });
    var autocompleteTop = new google.maps.places.Autocomplete(
        (document.getElementById('location-input')), { types: ['geocode'] });

    var defaultPosition = new google.maps.LatLng(38.883340, -77.117982);

    var map = new google.maps.Map(document.getElementById("map-section"), {
        center: defaultPosition,
        zoom: 7,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        panControl: false,
        streetViewControl: false,
        mapTypeControl: false,
    });

    // Set up firebase configuration
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyDuxG2pJypuXV0shA-4H91vskgRNS-FY1k",
        authDomain: "oca-prod.firebaseapp.com",
        databaseURL: "https://oca-prod.firebaseio.com",
        projectId: "oca-prod",
        storageBucket: "oca-prod.appspot.com",
        messagingSenderId: "70721241482"
    };
    firebase.initializeApp(config);

    var database = firebase.database();


    //**USER QUERY EXISTING DB DATA**//

    // Event listener for button for user to query existing bathroom database 
    // for bathroom location that the user is trying to find 
    $("#add-location").click(function(event) {
        event.preventDefault();

        // Grab the user input and store into declarative variable
        var newLocation = $("#location-input").val().trim();

        newObject = {
            location: newLocation
        };
        // Query db with event handler and pass a snapshot event thru fcn 
        // .val() grabs the childSnapshot behind it and passes it thru the fcn forEach 
        var leadsRef = database.ref('myData');
        leadsRef.on('value', function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var childData = childSnapshot.val();
                if (newLocation == childData.address || newLocation == childData.name) {
                    //Update map function to update map! 
                    updateMap(childData);
                } 

                // else {
                //     function error() {
                //         $('#error-message').html('Entry not found!')
                //     }
                //     error();
                //     $('#error-message').fadeOut(4000);
                //     $("#location-input").val("");

                // }
            });
        });

        database.ref().push(newObject);
    });


    //**USER SUBMIT DATA TO DATABASE**// 
    $("#submit-bathroom").on("click", function(event) {
        event.preventDefault();

        // Set the variables to correspond to the input fields
        var name = $("#name-input").val().trim();
        var review = $("#review-input").val().trim();
        var address = $("#address-input").val().trim();
        // Image input needs to be grabbed from a collection of files  
        var fileCollection = $("#image-input");
        // The option to select an entire file collection if we really wanted to
        var file = fileCollection[0].files[0];
        // Need to declare what object the child is comprised of, and store in declarative var 
        var fileName = file.name;
        // Define the upload task to ref the path of the file in db
        var uploadTask = firebase
            .storage()
            .ref()
            .child(fileName)
            .put(file);

        // Observe state change events such as progress, pause, and resume
        uploadTask.on('state_changed', function(snapshot) {

            },

            // Handle unsuccessful uploads   
            function(error) {
                console.log('failed to upload image. sadface!');
            },

            // Successful uploads
            function() {
                console.log("SUCCESS!! UPLOAD COMPLETE!!");

                // Create the imageURL and prepare to insert it as a JSON object property 
                var imageURL = uploadTask.snapshot.downloadURL;

                // Declare the object to store our information
                //This is staging the post as a JSON object to be pushed to db
                var newPost = {
                    name: name,
                    address: address,
                    review: review,
                    imageURL: imageURL,
                };

                // Push our input values to the newPost object for each submission
                database.ref().child('myData').push(newPost);

                // Add each submission to our database
                // .val() grabs the snapshot of each form element and updates it 
                database.ref().on("child_added", function(snapshot) {
                    name: snapshot.val().name;
                    address: snapshot.val().address;
                    review: snapshot.val().review;
                    imageURL: snapshot.val().imageURL;
                });

                updateMap(newPost);

                // Clear the input forms upon submission
                $("#review-input").val("");
                $("#name-input").val("");
                $("#address-input").val("");
                $("#image-input").val("");

            });
    });


    function updateMap(newPost) {
        // Geocoder will convert the address string to latitude & longitude
        $("#location-input").val("");
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({
                address: newPost.address,
                region: 'no'
            },

            // This adds a pin to the map
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

                    // Include the imageURL in the content
                    var contentString = '<img src=' + newPost.imageURL + ' height="500px">' + '<br>' + '<br>' + 'NAME: ' + '<br>' + newPost.name.toUpperCase() + '<br>' + '<br>' + 'ADDRESS: ' + '<br>' + newPost.address.toUpperCase() + '<br>' + '<br>' + '<strong>REVIEW:</strong> ' + '<br>' + newPost.review.toUpperCase();

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
    };
};
