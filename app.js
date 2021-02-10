const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");



const app = express();

//using bosy-parser to get html input values
//this is a neccessory code

app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res){


 //getting html file

 res.sendFile(__dirname + "/index.html");

  // fatching weather status using https module
  //we can multiple res.write() but res.send only for single time

    // })
  // })
})



app.post("/", function(req, res){


  //getting HTMl input value using
  //making the url shorter

  const query = req.body.cityName;
  const apiKey = "bf8c1cbfa49fc98528acfd9b313614d5";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"";



  https.get(url, function(response){

    //getting statusCode of htts
    // console.log(response.statusCode);
    //let's get the JSON data and parse it into javaScript object

    response.on("data", function(data){
      // console.log(data);
      //on method returns the data in hexadecimal form
      //we need to parse it to get the actual JSON or javaScript formate of it.


    const weatherData = JSON.parse(data);

      // console.log(weatherData);
      // JSON.stringify(weatherData);


      //getting specific info from this return javaScript objects like temprature etc.

      const temp = weatherData.main.temp;

      //getting description

      const desc = weatherData.weather[0].description

      // because weather obeject has an array with only one element inside it.
      // console.log("description about the weather: " + desc);


      //rendering api data to the browser

      //using res.write() we are semding description, temprature, weather image

      //lets get the weather image url and icon through api

      const icon = weatherData.weather[0].icon

      const url = "http://openweathermap.org/img/wn/" +icon+"@2x.png";
      //
      res.write("<p>The Weather description: " + desc+ "</p>");
      res.write("<h1> The Temprature in "+query+" is: " +temp+ " degree celcius </h1>");
      res.write("<img src="+url+">");
      res.send()

    })
});
});


app.listen(3000, function(){
  console.log("yes the server has created on the port no. 3000");
});
