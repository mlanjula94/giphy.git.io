var topics = ["Friends", "How I Met Your Mother", "Walking Dead", "Game Of Thrones", "Arrow", "Flash"];


// Function for displaying TV Shows
function renderButtons() {
    //To prevent having buttons repeated
    $("#buttons-display").empty();

    // Looping through the array of movies
    for (var i = 0; i < topics.length; i++) {

        // Then dynamicaly generating buttons for each TV Show in the array.
        var show = $("<button>");
        // Adding a class
        show.addClass("show mr-3 mt-1");
        // Adding a data-attribute with a value of the topic at index i
        show.attr("show-name", topics[i]);
        // Providing the button's text with a svalue of the topic at index i
        show.text(topics[i]);
        // Adding the button to the HTML
        $("#buttons-display").append(show);
    }
}

$("#select-show").on("click", function (event) {
    //prevetns page reloading
    event.preventDefault();
    //this line grabs the text when the select-show buton is clicked
    var show = $("#input-show").val();
    //this line adds the show typed to the array
    topics.push(show);
    //calling renderButtons to display the array of topics with new values
    renderButtons();
});

function displayGiphy() {
    $('#giphy-display').empty();
    //grabbing the name of the show user clicked
    var show_clicked = $(this).attr("show-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        show_clicked + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        for (var i = 0; i < response.data.length; i++) {
            var giphyDiv = $("<div class='m-2 float-left'>");
            //grabbing results rating
            var rating = response.data[i].rating;
            //Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + rating);

            //Creating an image tag
            var image = $("<img class='gif'>");
            //Giving the image tag an src attribute of a proprty pulled off the
            image.attr("src", response.data[i].images.fixed_height_small_still.url);
            //data-state attribute is made to mane the gif play and pasue
            image.attr("data-state", "still");
            image.attr("data-animate", response.data[i].images.fixed_height_small.url);
            image.attr("data-still", response.data[i].images.fixed_height_small_still.url);

            giphyDiv.append(rating);
            giphyDiv.append("<br>");
            giphyDiv.append(image);

            $('#giphy-display').prepend(giphyDiv)
        }
    });

}

function animateGiphy() {
   
    //grabbing the state of the giphy
    var state = $(this).attr("data-state");

    if (state === "animate") {
        console.log("gif");
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    } else {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    }

}


$(document).on("click", ".show", displayGiphy);
$(document).on("click", ".gif", animateGiphy);

renderButtons();