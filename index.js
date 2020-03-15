const path = require('path');
const bodyParser = require('body-parser');
const hbs = require('express-handlebars');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const express = require('express');

const app = express();

require('dotenv').config();

const routes = require('./routes/routes.js');

const NODE_ENV = process.env;
const IN_PROD = NODE_ENV === 'production';

mongoose.connect(process.env.DB_URL, {
	useNewUrlParser: true,
	useFindAndModify: false
});

app.use(session({
    store: new MongoStore({mongooseConnection: mongoose.connection}),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
		maxAge: 1000 * 60 * 60 * 2, // two hours
		sameSite: true,
 		secure: IN_PROD
    }
}));

app.engine('.hbs', hbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', '.hbs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(fileUpload({safeFileNames: true, preserveExtension: true}));
app.use(bodyParser.json());

app.use('/', routes);

app.use((req, res) => {
	res.status(404).render('404');
})

app.listen(process.env.PORT || 3000);