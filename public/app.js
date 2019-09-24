// Grab the articles as a JSON and display at http://localhost:3000/articles
$.getJSON("/articles", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
  }
});

// "SAVE ARTICLE" button: When clicked, grab the associated id with the article from the submit button.
$(document).on("click", "#save-article-btn", function() {
  var thisId = $(this).attr("data-id");

  // Run a POST request to
  $.ajax({
    method: "PUT",
    url: "/articles/" + thisId,
    data: { }
  }).then(function(data) {
      console.log(data);
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});


// "CLEAR ARTICLES" button: When clicked, delete all scraped articles.
$(document).on("click", "#clear", function(event) {
  event.preventDefault();
  // Run a DELETE request:
  $.ajax({
    method: "DELETE",
    url: "/clearArticles"   
  }).then(function(data) {
      console.log(data);
    });
    location.reload();
});

// "Add NOTES" button:
$(document).on("click", "#add-notes-btn", function() {
  $("#notesModal").modal("show");
});

// "SAVES NOTES" button: When clicked, grab user input and POST to MongoDB.
$(document).on("click", "#save-notes-btn", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");
  console.log("thisId: ", thisId);
  console.log("in main.handlebars this: ", this);
  
  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  }).then(function(data) {
      console.log("Data returned from AJAX: ", data);
       $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});