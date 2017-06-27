//test linking the js source 
alert('yo!'); 

//INIT EVENT HANDLER SANDBOX

 $("#add-end-location").on("click", function(event) { 
        //prevent the default action of the element from happening
            event.preventDefault();
       
        //inside the form input, use jq to grab the location input without spaces  
        var currentLocation = $("#end-location-input").val().trim(); 

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