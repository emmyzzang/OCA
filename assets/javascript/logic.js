

//INIT EVENT HANDLER SANDBOX
      function initMap() {
      var mapProp = {
      center: new google.maps.LatLng(38.883340, -77.117982),
      zoom: 15,
      };
      var map = new google.maps.Map(document.getElementById("map-section"),mapProp);
}

      
 $("#submit-bathroom").on("click", function(event) { 
        //prevent the default action of the element from happening
            event.preventDefault();
       
        //inside the form input, use jq to grab the location input without spaces  
        var name = $("#name-input").val().trim();
        var review= $("#review-input").val().trim();
        var currentLocation = $("#current-location-input").val().trim(); 
        var image = $("#image-input").val().trim();



        // Clear the input form
        $("#name-input").val("");
        $("#review-input").val("");
        $("#current-location-input").val("");
        $("#image-input").val("");

        //the location from the text box has to be queued up in the array 
        var a = $("<button>"); 

          //for the button stored in variable a, add a class of location 
          a.addClass("location"); 

          //for the button stored in variable a, add the data attribute 
          a.attr("data-location", location); 

          //for the button stored in variable a, write the text of the location 
          a.text(location); 

          //use jq to grab the buttons view div and add the button to it
          //this is how we control the view, whether it is removed or added, etc.
          $("#buttons-view").append(a); 

    }); 