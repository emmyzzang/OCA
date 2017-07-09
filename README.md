
# Application Description

//**Brief Summary**//
Restroom Locator Application utilizing the following technologies: 
Google Maps API
Google Places Geocoder
End User data 
HTML
CSS
Bootstrap
Javascript 
JQuery 
Google Firebase Databases & Storage  

Live Demo: https://masteremmy.github.io/OCA/

//**Purpose**//
This app aims to solve a problem many people face every day, or, during long distance travel -- the need to find a high quality restroom within a 1 mile radius, immediately. Although prior technologies have also utilized geospatial data to map places and information related to restrooms, the OCA app aims to have a greater focus on images and information related to the interior of the restooms, utilizing photos with a higher pixel density and larger display than the prior technology. This app is also user-friendly and social, in that it allows multiple users across the country to add photos and information at any time.  

# FUNCTIONALITY

//**User Query**//  
This app will utilize the Google Maps API as well as the Google Places Geocoder to allow users to map directions to their desired location, and along the route it will pull up clickable pins for points of interest. Once clicked, the pins will display a modal with the information on the points of interest. The modal will display images and detailed information regarding publicly accessible bathrooms along the route. 

//**User Write**//
If submitting a location with the "Add This Bathroom" function on the second form, you must fill out all of the fields. [[We were trying to do this with having the 'required' property in our inputs, but because we are using event.preventDefault() to prevent the page from refreshing on form submit, this does not work.]]


# CURRENT STATE OF THE TECHNOLOGY

Try using the search box to search for terms like 'chris', 'vinny', 'jay', 'new york', 'dc', 'philadelphia', 'cincinnati', 'walmart' and 'house'. Since we are using Firebase, there are currently only a few (approximately 12) points of interest added to the database -- only ones the end users (beta testers) input. However, even searching for single letters such as 'c', should show the functionality and how it will pull up every entry in the database that contains a 'c', or whatever letter you choose, in the address or name field. 

