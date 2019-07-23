require('dotenv').config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "dev") {
    app.use(express.static("client/build"));
}



// Connect to the Mongo DB - locally only
// mongoose.connect("mongodb://localhost/currentEvents", { useNewUrlParser: true });

// connect to Mongo DB on heroku
// const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
// mongoose.connect(MONGODB_URI);


const mongoose = require("mongoose");
const mongoURL = process.env.PROD_MONGODB || "mongodb://localhost/googlebooks"
mongoose.connect(mongoURL, {useNewUrlParser: true})
    .then(() => {
        console.log("🗄 ==> Successfully connected to mongoDB.");
    })
    .catch((err) => {
        console.log(`Error connecting to mongoDB: ${err}`);
    });

require("./routes/apiRoutes")(app);

app.listen(PORT, () => {
    console.log(`🌎 ==> API server now on port ${PORT}!`);
});