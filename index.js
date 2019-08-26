const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const express = require('express');

const app = express();

const routes = require('./routes/routes.js');

app.engine('.hbs', hbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', '.hbs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', routes);

app.listen(3000);