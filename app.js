const express = require("express");
const app = express();

const https = require("https");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
var query = req.body.cityName;
var apiKey = "cd4151fbdaccc92976d91337a173b3f6";
var unit = "metric";
var url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

https.get(url, function(response){
  console.log(response.statusCode); // status code 200 - means all is ok

  response.on("data", function(data){
    var weatherData = JSON.parse(data); //taking out the actual data from the API response
    var temp = weatherData.main.temp; //parsing out particulat data parts - e.g. temperature, weather description
    var weatherDescription = weatherData.weather[0].description;
    var icon = weatherData.weather[0].icon;
    var imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
    res.write("<h1>The temperature in " + query + " is " + temp + " degrees Celcius.</h1>"); // can use 'write' method multiple times
    res.write("<p>The weather is currently " + weatherDescription + "</p>");
    res.write("<img src =" + imageUrl + ">"); // using a changable icon URL as am image
    res.send(); // send method can be used once only
  });
});
});



app.listen(process.env.PORT || 3000, function() {
  console.log("This server is running on port 3000!")
});
