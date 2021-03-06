var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var exphbs = require('express-handlebars');

var startData = require("./startData.js");

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    partialsDir: __dirname + '/views/partials/',
}));
app.set('view engine', 'handlebars');
app.use('/public', express.static('public'));

/* Add whatever endpoints you need! Remember that your API endpoints must
 * have '/api' prepended to them. Please remember that you need at least 5
 * endpoints for the API, and 5 others.
 */
let data = startData.data;
let idCount = startData.data.length;

app.get('/', function(req, res) {
    res.render('home', {data: [...data]});
});

app.get('/submit', function(req, res) {
    res.render('submit', {});
});

app.get('/time', function(req, res) {
    let asc = req.query.sort !== "descending";

    res.render('filter', {
        data: [...data].sort(
            (a, b) => asc ? 
            new Date(b.submittedAt) - new Date(a.submittedAt) : 
            new Date(a.submittedAt) - new Date(b.submittedAt)
        ),
        title: asc ? "Newest to oldest" : "Oldest to newest",
        filter: "time",
        filterParams: {
            ascending: asc,
        }
    });
});

app.get('/density', function(req, res) {
    let asc = req.query.sort !== "descending";

    res.render('filter', {
        data: [...data].sort(
            (a, b) => asc ?        
            a.density - b.density :     
            b.density - a.density
        ),
        title: asc ? "Sparsest to densest" : "Densest to sparsest",
        filter: "density",
        filterParams: {
            ascending: asc,
        }
    });
});

app.get('/color/:color', function(req, res) {
    const colors = {
        "black": "0",
        "red": "1",
        "orange": "2",
        "yellow": "3",
        "green": "4",
        "blue": "5",
        "purple": "6",
    };

    res.render('filter', {
        data: data.filter(x => x.pixels.includes(colors[req.params.color])),
        title: req.params.color + " pictures",
        filter: "color",
        filterParams: { 
            selectedColor: req.params.color,
            colors: Object.keys(colors).filter(x => x !== req.params.color),
        },
    });
});

app.get("/authors", function(req, res) {
    let authors = data.reduce((acc, x) => acc.includes(x.author) ? acc : acc.concat(x.author), []);

    res.render("authors", {authors: authors});
});

app.get('/authors/:author', function(req, res) {    
    res.render('filter', {
        data: data.filter(x => x.author.toLowerCase() === req.params.author.toLowerCase()),
        title: "Pictures by " + req.params.author,
        filter: "author",
        filterParams: {},
    });
});

app.get('/random', function(req, res) {
    res.render('pic', data[Math.floor(Math.random() * data.length)]);
});

app.get("/id/:id", function(req, res) {
    let id = parseInt(req.params.id);

    if (id >= data.length) {
        res.status(404).render("404", {text: "This drawing doesn't exist."});
    }
    else {
        res.render("pic", data[id]);
    }
});

app.get("/api/all", function(req, res) {
    res.json(data);
});

app.post('/api/submit', function(req, res) {
    let newID = idCount++;

    data.push({
        ...req.body,
        density: 1 - (req.body.pixels.match(/9/g).length / 256),
        submittedAt: new Date(),
        id: newID,
    });

    res.json({id: newID});
});

app.get("/api/id/:id", function(req, res) {
    res.json(data[parseInt(req.params.id)]);
});

app.listen(process.env.PORT || 3000, function() {
    console.log('Listening on port 3000!');
});
