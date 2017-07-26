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
  var schema = {
    'todo': {
      notEmpty: true,
      isLength: {
        options: [{max : 100}],
        errorMessage: 'too much stuff to do'
      },
      errorMessage: 'not enough stuff to do'
    },
  };
  req.assert(schema);
  req.getValidationResult().then(function(results){
    if (results.isEmpty()){
      stuffToDo.push(req.body);
      res.render('todo', {todo:stuffToDo});
    } else {
      res.render('todo', {errors: results.array()});
    }
  });
});


app.listen(3000, function(){
  console.log('server started');
});
