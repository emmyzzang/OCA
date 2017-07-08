# OCA
Application using G Maps API among other data 

Live Demo: https://masteremmy.github.io/OCA/

If submitting a location with the add this bathroom function on the second form, you must fill out all of the fields. We were trying to do this with having the 'required' property in our inputs, but because we are using event.prevent to prevent the page from refreshing on form submit, this doesnt work.

Try using the search box to search for terms like 'chris', 'vinny', 'jay', 'new york', 'dc', 'philadelphia', 'cincinnati', 'walmart' and 'house'. Because we're using firebase there aren't a ton of locations in the databas, only ones we input. Even searching for single letters such as 'c', should show the functionality and how it will pull up every entry in the database that contains a 'c', or whatever letter you choose, in the address or name field.