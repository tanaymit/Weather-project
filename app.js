const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require("https");

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function (req, res) {
    
    res.sendFile(__dirname + "/index.html");

 })

app.post("/", function (req, res) { 
    const city = req.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + ",IN&appid=c0b6e13c735a8d0401a7e304f506887f&units=metric#"; 
    https.get(url, function (response) { 
        console.log(response.statusCode);
   
        response.on ("data", function (data) { 
            const weatherData = JSON.parse(data);
   
            const temp = weatherData.main.temp;
            const weatherDesc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const url = "http://openweathermap.org/img/wn/" + icon +"@2x.png";
            res.write("<h1>The temperature in " + city + " is " + temp + " Degrees</h1>");
            res.write("<h3>It is <em>" + weatherDesc + "</em> out there!</h3>");
            res.write("<img src=" + url + ">");
   
            res.send();
         })
     });
 })




app.listen(3000, function () { 
    console.log("server is up on port 3000");
 })