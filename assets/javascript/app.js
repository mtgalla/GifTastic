//Array of topics
var topics = ["Pearl Jam","Def Leppard","Rolling Stones","Beastie Boys","Run-DMC"];

//function to get giphy API data, store it, then add attributes with data to html
function displayTopicInfo() {
      $("#gifs-appear-here").empty();
    var topic = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      topic + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
        for (let i = 0; i < response.data.length; i++){
        console.log("Rating: " + response.data[i].rating);
        console.log(response.data[i].images.downsized_large.url);
        console.log(response.data.length);
          var gifDiv = $("<div id='gifMove'>");
          var ratings = response.data[i].rating;
          var p = $("<p id='rating-text'>").text("Rating: " + ratings);
          var image = $("<img>").attr("src", response.data[i].images.fixed_height_still.url);
          image.attr("data-still", response.data[i].images.fixed_height_still.url);
          image.attr("data-animate", response.data[i].images.fixed_height.url);
          image.attr("data-state", "still");
          image.addClass("gif-click");
          gifDiv.prepend(p);
          gifDiv.prepend(image);
          $("#gifs-appear-here").prepend(gifDiv);

        }

      // on click if gifs are still then animate or if gifs are animated then make them still
        $(".gif-click").on("click", function() {
      console.log(true);
     var state = $(this).attr("data-state");
     if (state === "still"){
         console.log(true);
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
        }
        else{

        if (state === "animate"){
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-animate", "still");
        }
      }
 });
      });
 };


    //Function for displaying buttons
    function renderButtons() {

$("#buttons").empty();
// Loops through the array of topics
for (var i = 0; i < topics.length; i++) {

// Creates buttons for each topic in the array
var a = $("<button class='btn btn-secondary'>");
// Adds a class of topic to our button
a.addClass("topic");
// Added a data-attribute
a.attr("data-name", topics[i]);
// Provided the initial button text
a.text(topics[i]);
// Added the button to the buttons div
$("#buttons").append(a);
}
}

//on click to add band from user input and display as button with band name on DOM
$("#add-band").on("click", function(event){
event.preventDefault();
var bandInput = $("#band-input").val().trim();
console.log(bandInput);

topics.push(bandInput);
console.log(topics);
renderButtons();


})


$(document).on("click", ".topic", displayTopicInfo);
 // Calling renderButtons which handles the processing of our topic array
 renderButtons();
