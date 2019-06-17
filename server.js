const express = require('express');
const bodyParser = require('body-parser');
const request = require("request");
const firebase =  require("firebase");

const app = express();

//use routes folder
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true})); // was false

const db = firebase.initializeApp({

  });

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");  //for the cors
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
      );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, PUT, DELETE, OPTIONS"
      );
    next();
  }); // midleware
  
const _GETNEWS_URL = 'https://newsapi.org/v2/top-headlines';
const _GETWEATHER_URL = 'http://api.openweathermap.org/data/2.5/w';
const _GETALLWEATHER_URL = 'http://api.openweathermap.org/data/2.5/';
const _GETSCORES_URL = 'https://cors-anywhere.herokuapp.com/http://livescore-api.com/api-client/';

app.get("/api/getNews",  (req, res) => {
    request(_GETNEWS_URL, (error, response, body) => {
        if (error) {
            console.log(error);
        } else {
          res.send(JSON.parse(body)); //Raw Image
          // res.send(body); //Raw Image
        }
    });
  });
  
app.get("/api/getWeather",  (req, res) => {
    request(_GETWEATHER_URL, (error, response, body) => {
        if (error) {
            console.log(error);
        } else {
            res.send(JSON.parse(body)); //Raw Image
            // res.send(body); //Raw Image
        }
    });
});

app.get("/api/getAllWeather",  (req, res) => {
    request(_GETALLWEATHER_URL, (error, response, body) => {
        if (error) {
            console.log(error);
        } else {
            res.send(JSON.parse(body)); //Raw Image
            // res.send(body); //Raw Image
        }
    });
});


// app.get("/api/getScores",  (req, res) => {
//         res.header("Access-Control-Allow-Headers", "x-requested-with, x-requested-by");

//     request(_GETSCORES_URL, (error, response, body) => {
//         if (error) {
//             console.log(error);
//         } else {
//             res.send(JSON.parse(body)); //Raw Image
//             // res.send(body); //Raw Image
//         }
//     });
// });

app.post("/api/addEmail",  (req, res) => {
    firebase.database().ref('emails/').push().set(req.body.email);
});

app.get("/api/getEmails",  (req, res) => {
    firebase.database().ref('emails/').once('value', (snapshot) => {
        let emails = snapshot.val();
        res.send(emails);
      })
});

app.listen(port, () => console.log('server started on port ' + port));

module.exports = app;
