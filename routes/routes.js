// Packages
var axios = require("axios");
var cheerio = require("cheerio");

// ======================== ROUTES =========================//
var db = require("../models");
var app = require("express").Router();

app.get("/", function(req, res) {
  // Grab every document in the Articles collection
  db.Article.find({})
    .then(function(dbArticles) {
      // If we were able to successfully find Articles, send them back to the client
      res.render("index", { articles: dbArticles });
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// A GET route for scraping the Business Insider website and re-routes it back to the root/home page:
app.get("/scrape", function(req, res) {
  console.log("SCRAPING RESULTS: " + res);

  // Make a request via axios for NYT Arts board.
  axios.get("https://www.nytimes.com/section/arts").then(function(response) {
    // Then, load the response into cheerio and save it to a variable ('$' for a shorthand cheerio's selector):
    var $ = cheerio.load(response.data);
    var result = {};

    // Grab every 'a.title' within an article tag, and do the following:
    $("a.story-link").each(function(i, element) {
      // Save an empty result object
      // var result = {};

      // Add the text and href of every link, and save them as properties of the result object
      result.title = $(this)
        .children("div")
        .children("h2")
        .text();

      result.link = $(this).attr("href");

      result.summary = $(this)
        .children("div")
        .children("p.summary")
        .text();

      // console.log(result);

      // Create a new Article using the `result` object built from scraping
      db.Article.create(result)
        .then(function(dbArticle) {
          console.log("=========== ");
          // View the added result in the console
          console.log(dbArticle);
        })
        .catch(function(err) {
          // If an error occurred, log it
          console.log(err);
        });
    });

    // Redirects back to home (root) page after scraping is done:
    res.redirect("/");
    console.log(result);
  });
});

// Route for getting ALL Articles from the database
app.get("/articles", function(req, res) {
  // Grab every document in the Articles collection
  db.Article.find({})
    .then(function(dbArticles) {
      // If we were able to successfully find Articles, send them back to the client
      res.json(dbArticles);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// Route for getting an article by id# from the database
app.put("/articles/:id", function(req, res) {
  db.Article.update({ _id: req.params.id }, { saved: true }).then(function(
    results
  ) {
    res.send(results);
  });
});

// Route for grabbing SAVED articles:
/* If the 1st word of http packet is get, AND if the 2nd word is /saved,
 then the callback function (i.e. Defining the endpoint) */
app.get("/saved", function(req, res) {
  db.Article.find({ saved: true }).then(function(dbArticle) {
    res.render("articles", { articles: dbArticle });
  });
});

// Routes for clearing/deleting ALL scraped articles:
app.delete("/clearArticles", function(req, res) {
  console.log("CLEARING ROUTES -- '/clearArticles' route worked!");

  db.Article.deleteMany({},  (err, data) => {
    if (err) {
      console.log(err);
    }
    // Routes back to the root/home page after clearing articles:
    res.redirect("/");
  });

});

// Route for SAVING/UPDATING an Article's associated Notes
app.post("/articles/:id", function(req, res) {
  // console.log(req.body);
  // Create a new note and pass the req.body to the entry
  db.Note.create(req.body)
    .then(function(dbNote) {
      // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
      // { new: true } tells the query that we want it to return the updated Userer -- it returns the original by default
      // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
      console.log("dbNote inserted?...", dbNote);

      return db.Article.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { note: dbNote._id } }
        // { note: dbNote._id },
        // { new: true }
      );
    })
    .then(function(dbArticle) {
      // If we were able to successfully update an Article, send it back to the client
      // Render "index.handlebars" articles
      res.render("index", { articles: dbArticles });
    })
    .catch(function(err) {
      res.json(err);
  });
});

// Route for grabbing a specific Article by id, populate it with it's note
app.get("/articles/:id", function(req, res) {

  console.log( "id:"+req.params.id)
  // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
  db.Article.findOne({ _id: req.params.id })
    // ..and populate all of the notes associated with it
    .populate("note")
    .then(function(notesDetail) {

      console.log("notesDetail:"+notesDetail)
      // res.json(notesDetail)
      // If we were able to successfully find an Article with the given id, send it back to the client
     / res.json( notesDetail );
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// Routes for DELETING saved notes
app.delete("/deleteNotes", function(req, res) {

  // Remove every note from the notes collection
  db.Note.deleteMany({}, function(err, responseDB) {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      // responseDB = data (in Line 96 of app.js)
      console.log("responseDB: ", responseDB);
      res.send(responseDB);
    }
  });
});

module.exports = app;
