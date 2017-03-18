var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var cookieParser =  require("cookie-parser");
var session = require("express-session");
var port = 3000;
var app = express();

// app.set('trust proxy', 1);
//allow the use of sessions
app.use(session({ secret: 'app', cookie: { maxAge: 6*1000*1000*1000*1000*1000*1000 }}));
app.use(cookieParser());

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(process.cwd() + "/public"));

app.use(bodyParser.urlencoded({ extended: false }));

// Override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({
	defaultLayout: "main",
	helpers: {
		ifNotEqual: function(a, b, opts) {
			if(a !== b)
				return opts.fn(this);
			else
				return opts.inverse(this);
		}
	}
}));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
var applicationController = require("./controllers/applicationController.js");
var usersController = require("./controllers/usersController.js");
var readersController = require("./controllers/readersController.js");
var teachersController = require("./controllers/teachersController.js");

app.use("/", applicationController);
app.use("/users", usersController);
app.use("/readers", readersController);
app.use("/teachers", teachersController);

app.listen(port);