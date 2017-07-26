const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

var app = express();

var stuffToDo = []

//configure mustache with express
app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

//Allows public folder to be served statically to browsers
app.use(express.static('public'));

//config body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//config Express Validator
app.use(expressValidator());

app.get('/', function(req, res){
  res.render('todo');
});

app.post('/', function(req, res){
  console.log(req.body);
  stuffToDo.push(req.body);
  console.log(stuffToDo);
  req.getValidationResult().then(function(results){
    res.render('todo', {todo: req.body});
  });

});


app.listen(3000, function(){
  console.log('server started');
});
