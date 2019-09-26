// Grab the articles as a JSON and display at http://localhost:3000/articles
$.getJSON("/articles", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    $("#articles").append(
      "<p data-id='" +
        data[i]._id +
        "'>" +
        data[i].title +
        "<br />" +
        data[i].link +
        "</p>"
    );
  }
});

// "SAVE ARTICLE" button: When clicked, grab the associated id with the article from the submit button.
$(document).on("click", "#save-article-btn", function() {
  var thisId = $(this).attr("data-id");

  // Run a POST request to
  $.ajax({
    method: "PUT",
    url: "/articles/" + thisId,
    data: {}
  }).then(function(data) {
    console.log(data);
  });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});

// Refresh function
function refresh() {
  // alert("Saved!")
  $.getJSON("/articles/" + $("#add-notes-btn").attr("data-id"), function(
    notesDetail
  ) {
    console.log(notesDetail.note);
    $("#noteOutput").empty();
    for (var i = 0; i < notesDetail.note.length; i++)
      $("#noteOutput").append(notesDetail.note[i].body + "<br>");
    $("#notesModal").modal("show");
  });
}

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

// "DELETE ARTICLE" button: When clicked, it deletes specified article from Saved Article page.
$(document).on("click", "#delete-article-btn", function() {
  var thisId = $(this).attr("data-id");

  // Run a POST request to
  $.ajax({
    method: "DELETE",
    url: "/deleteArticle/" + thisId,
    data: {}
  }).then(function(data) {
    console.log(data);
  });
});

// "ADD NOTES" button:
$(document).on("click", "#add-notes-btn", function() {
  refresh();
});

// "SAVES NOTES" button: When clicked, grab user input and POST to MongoDB.
$(document).on("click", "#save-notes-btn", function(event) {
  event.preventDefault();
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  console.log("thisId: ", thisId);
  console.log("noteTextInput:", $("#noteTextInput").val());

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      articleID: thisId,
      // Value taken from notes written in the <textarea>
      body: $("#noteTextInput").val()
    }
  }).then(function(data) {
    /* Promise object returned by ajax has a method called, 'then',
      whose function signature's input is an anonymous function with a JSON object.*/
    refresh();
  });

  // Also, remove the values entered in the input and textarea for note entry
  $("#noteTextInput").val("");
});

// "DELETE NOTES" button:
$(document).on("click", "#delete-notes-btn", function(event) {
  event.preventDefault();

  // Run a DELETE all notes request
  $.ajax({
    method: "DELETE",
    url: "/deleteNotes"
  }).then(function(data) {
    console.log(data);
  });
  refresh();
});
