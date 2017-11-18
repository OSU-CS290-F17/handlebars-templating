var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');

var peopleData = require('./peopleData');
var app = express();

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// console.log("==peopleData:", peopleData);

var availablePeople = [
  'luke',
  'beyonce',
  'einstein',
  'ta-nehisi',
  'marie'
]

app.get('/people', function (req, res) {
  res.status(200).sendFile(path.join(__dirname, 'public', 'people.html'));
});

app.get('/people/:personId', function(req, res, next) {
  var personId = req.params.personId;
  if (availablePeople.indexOf(personId) !== -1) {
    var person = peopleData[personId];
    res.status(200).render('personPage', person);
  }
  else {
    next();
  }
});

app.use(express.static('public'));

app.use('*', function (req, res) {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

app.listen(8000, function () {
  console.log("== Server listening on port 8000");
});
