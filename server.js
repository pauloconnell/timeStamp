// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});
app.get("/api/", function (req, res){
  
  res.json({timestamp: "this will show timestamp", unix:+new Date("jan 31 2015")});
});

app.get("/api/timestamp/", function (req, res){
  res.json({unix: +new Date(), utc: new Date()});
});
//endpoint for this exercise***
app.get("/api/timestamp/:data", function (req, res){
 
  var result={ unix: null, utc: null};
    var date;
  var data=req.params.data;
  
   console.log(data+"loaded");
  //if(req.params){
  //  if(req.params.date_string)
  //  res.send(JSON.stringify(req.params.data));
  //} else {
  //           res.json({date: new Date()});
//}
//});// try below code to see if it works:
// Test dateParameter
  if (!isNaN(data)) {  // IF THE 'STRING CONTAINS ONLY NUMBERS'
    data=+data;  // CONVERTS TO NUMBER
    console.log(typeof data);
    try{
      date=new Date(data);
      result.unix = date;  // returns date
      result.utc= +date;     //COVERT TO MILISECONDS //.getUTCString()
      res.json(result);
    }catch(err){
      console.log(err.message);
    }
  }
  
  
  if (typeof data == 'string') {
    console.log(typeof data+"is a string");
    // Test for empty string - if so set new date
    if (data === '') {
      date = new Date();    

    // Test for a time value = the + converts date string to # of milliseconds since unix epoch 1970
    } else if (+data == data) {
      date = new Date(data);

    // Otherwise treat as parseable string
    } else {
       try{
        date = new Date(data);
        result.unix=date;
        result.utc=+date;
       }
      catch(err) {
        console.log(err.message);
      }
    }
    
    res.json(result);
  }

    // Deal with getting a valid Date, any other result
    // returns the error condition
  return JSON.stringify(result);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});