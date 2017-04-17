"use strict";

let express = require("express");
let app = express();

let bodyParser = require("body-parser");

app.set('port', (process.env.PORT || 9876));


app.use(express.static(__dirname));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

let suggestions = ["hej", "mamma", "korv"];

app.get("/", (req, res) => {
  res.sendFile("index.html");
})

app.get("/suggest_line", (req, res) => {
  res.sendFile(__dirname + "/suggest_line.html");
})

app.get("/draw_lines", (req, res) => {
  res.sendFile(__dirname + "/draw_lines.html");
})

app.post("/suggest", (req, res) => {
  suggestions.push(req.body.suggestion)
  console.log(suggestions)
})

app.get("/lines", (req, res) => {
  var obj = {};
  var ran = Math.floor(Math.random() * suggestions.length);
  obj.one = suggestions.splice(ran, 1);
  ran = Math.floor(Math.random() * suggestions.length);
  obj.two = suggestions.splice(ran, 1);
  ran = Math.floor(Math.random() * suggestions.length);
  obj.three = suggestions.splice(ran, 1); 
  res.send(obj);
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
