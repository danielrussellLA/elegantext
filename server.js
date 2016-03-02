var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());

app.get('/', function(req, res){
  res.render('index');
});

app.listen(8000);
console.log('listening on 8000')
