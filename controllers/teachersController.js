var bcrypt = require('bcryptjs');
var express = require('express');
var router  = express.Router();
var mysql = require('mysql');
var connection = require('../config/connection.js');
// var usersController = require('../controllers/usersController.js');
var session = require('express-session');



//this is the users_controller.js file
router.get('/', function(req,res) {

	console.log(req.session.user_id);
	connection.query("SELECT * FROM classes WHERE teacher_id = ?", [req.session.user_id], function (err, rows) {
		console.log(rows);
		req.session.class = [];
		for (i=0; i<rows.length; i++) {
        	req.session.class.push(rows[i].name);
		}

	    // getStuds(crntclass);
	    	res.render('teachers/teachers', req.session);

    });
});

router.post('/session', function(req, res) {
	res.send(req.session);
});

// function getStuds(crntclass) {
// 	connection.query("SELECT * FROM class_students WHERE class_id = ?", [crntclass], function(err, rows) {

// 	});
// };

module.exports = router;
