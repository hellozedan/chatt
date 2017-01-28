/**
 * Created by Joe on 06/06/2015.
 */

var express = require('express');


var routes = function (SugSubject) {
	var sugSubjectRouter = express.Router();

	var sugSubjectController = require("../controllers/sugSubjectController")(SugSubject);

	sugSubjectRouter.route('/')
		.post(sugSubjectController.post)
		.get(sugSubjectController.get)
		.put(sugSubjectController.put)
		.delete(sugSubjectController.delete);


	return sugSubjectRouter;
};

module.exports = routes;
