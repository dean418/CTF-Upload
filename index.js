const path = require('path');
const bodyParser = require('body-parser');
const hbs = require('express-handlebars');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const express = require('express');

const app = express();

const routes = require('./routes/routes.js');

const {
	PORT = 3000,
	NODE_ENV = 'development',
	SECRET,
	MONGO_PASS,
} = process.env;

const IN_PROD = NODE_ENV === 'production';

mongoose.connect(`mongodb+srv://Dean:${MONGO_PASS}@ctf-aeu8n.mongodb.net/ctf?retryWrites=true&w=majority`, {
	useNewUrlParser: true,
});

app.use(session({
    store: new MongoStore({
		url: `mongodb+srv://Dean:${MONGO_PASS}@ctf-aeu8n.mongodb.net/ctf?retryWrites=true&w=majority`,
    }),
    secret: SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
		maxAge: 1000 * 60 * 60 * 2, // two hours
		sameSite: true,
 		secure: IN_PROD
    }
}));

app.engine('.hbs', hbs({
	defaultLayout: 'layout',
	extname: '.hbs'
}));
app.set('view engine', '.hbs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());
app.use('/', routes);

app.listen(PORT);