# Scraping-News
Web app featuring latest news scraped from NYT Arts webpage using npm Cheerio package and Mongoose.

## App Overview
This full-stack web application allows users to scrape the latest headlines, article URL links and their summary from New York Times' Arts section webpage. The user can then select and save articles into a database to re-visit and/or add notes and comments on each saved article. Notes can be updated and saved, or deleted as needed. The app also allows users to clear all scraped articles and start the list over.

## How App is Organized
The application follows a MVC design structure, and its UI is broken up into components.  The component state is managed to respond to the user events appropriately.


## Live App
[Scraping News | NYT Arts Edition](https://mari0203.github.io/Scraping-News/)

## Running the App Locally for Development Purpose

   * Make sure that you have [Node.js](https://nodejs.org/en/), [npm](https://www.npmjs.com/get-npm), and [MongoDB](https://www.mongodb.com/download-center) installed.
   * Install all npm dependencies by running `npm install` in the project directory.
   * Make connection to MongoDB.
   * To start the app, type `npm start` in the terminal window and open your browser to `localhost:3000'


## App Fuctionality

1. User can click on `SCRAPE` button to get the latest news articles from NYT Arts section and display each article with below information:
    * Article headline
    * Short summary of the article
    * URL link to view the original article
    
2. User can bookmark article(s) by clicking on `SAVE ARTICLE`.  These articles are added to a "Saved Article" page which you can navigate to via the nav bar. `Delete Article` button will allow the user to remove the article from the "Saved Article" list.

3. From the "Saved Article" page, the user can click on `Add Notes` to add a new note or review saved notes.

4. User can erase all scraped results with `CLEAR ALL ARTICLES` button.

## Technology Used

   * HTML, CSS, Bootstrap
   * JavaScript, jQuery, AJAX, JSON
   * Node.js, Handlebars.js, Express.js
   * MongoDB, Mongoose
   * npm cheerio
   * Heroku

---

By Mari &copy; 2019
with :v:  &  :green_heart: