

window.onload = function() {
	gifTastic.showButtons();

	$("#add-gif").on("click", function(event) {
		$("#displayButtons").empty();
        event.preventDefault();
        // This line grabs the input from the textbox
        var searchGif = $("#exampleInput").val().trim();
        // Adding movie from the textbox to our array
        gifTastic.listofItems.push(searchGif);
        // Calling renderButtons which handles the processing of our movie array
        gifTastic.showButtons();
      });

	$(document).on("click", ".picture", function(){
		var state = $(this).attr("data_state");
		console.log(state);

		if(state==="still") {
			$(this).attr("src", $(this).attr("data_animate"));
			$(this).attr("data_state", "animate");
		}

		else{
			$(this).attr("src", $(this).attr("data_still"));
			$(this).attr("data_state", "still");
		}
	})


	$(document).on("click", ".gifs", gifTastic.dispalyGifs);




    

};



var gifTastic = { listofItems: ["Dunkaroos", "The Macarena", "Beanie Baby", "Nintendo 64", "Fanny Pack", "Gel Pen", "Tamagotchi", "AOL", "Discman", "Lisa Frank", "Pokemon", "Goosebumps", "Home Alone", "Space Jam", "Jurassic Park",
"Forrest Gump", "Braveheart", "Mrs. Doubtfire", "Independence Day", "Furby", "Bop It", "pager", "super soaker", "Gameboy"],
currentImages: [],

 showButtons: function() {
	for(i=0; i<gifTastic.listofItems.length; i++) {
		 var a = $("<button>");
		 a.addClass("btn btn-outline-info gifs")
		 a.attr("data-name", gifTastic.listofItems[i]);
		  a.text(gifTastic.listofItems[i]);
		  $("#displayButtons").append(a);
	}
},

dispalyGifs: function() {
	$("#searchResults").empty();
	var searchTerm = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=26979b74bb474205bf5bd2951bf439a3&g=g&limit=5"
	$.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {

        	var gifResults = response.data;

        for(i =0; i<gifResults.length; i++) {

        	if(gifResults[i].rating!="r"&&gifResults[i].rating!="pg-13") {
        		var gifDiv = $("<div class = 'result'>");
        		var rating = gifResults[i].rating;
        		var p = $("<p>").text("Rating: " + rating);
        		var gifImage = $("<img>");
        		gifImage.addClass('picture');
        		gifImage.attr("src", gifResults[i].images.fixed_height_still.url);
        		gifImage.attr("data_state", "still");
        		gifImage.attr("data_still", gifResults[i].images.fixed_height_still.url);
        		gifImage.attr("data_animate", gifResults[i].images.fixed_height.url);
        		gifDiv.append(p);
        		gifDiv.append(gifImage);
        		$("#searchResults").append(gifDiv);

        	}

        
       
      }
});
}
};


