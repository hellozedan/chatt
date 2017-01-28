/**
 * Created by Joe on 06/06/2015.
 */

var Utils = require('../utils/utils.js');
var User = require('../models/user.js');
var Category = require('../models/category.js');
var mongoose = require('mongoose');


var subSubjectController = function (SugSubject) {

		var post = function (req, res) {
			var newSugSubject = req.body;
			if (!newSugSubject._id) {
				var create_date = new Date();
				newSugSubject.create_date = create_date;
				var query = {};
				newSugSubject.user = req.authuser._id;
				var sugSubject = new SugSubject(newSugSubject);
				sugSubject.save(function (e) {
					if (e) {
						console.log('error: ' + e);
						res.status(500).send(err);
					} else {
						console.log('no error');
						res.status(201).send(newSugSubject);
					}
				});
			}
			else {
				var query = {_id: newSugSubject._id};
				SugSubject.update(query, {description: newSugSubject.description}, {}, callback);
				function callback(err, numAffected) {
					if (err) {
						console.log('error: ' + err);
						res.status(500).send(err);
					} else {
						console.log('no error');
						res.status(201).send(numAffected);
					}
					// numAffected is the number of updated documents
				}
			}

		};

		var put = function (req, res) {
			var newCategory = req.body;
			var category = new Category(newCategory);
			category.save(function (e) {
				if (e) {
					console.log('error: ' + e);
					res.status(500).send(err);
				} else {
					console.log('no error');
					res.status(201).send(category);
				}
			});
		};
		var changeStatus = function (req, res) {
			var query = {_id: req.body._id};
			Subject.find(query)
				.exec(
					function (err, subjects) {
						if (err) {
							console.log(err);
							res.status(500).send(err);
						} else {
							if (subjects.length > 0) {
								subjects[0].status = req.body.status;
								subjects[0].save(function (e) {
									if (e) {
										console.log('error: ' + e);
										res.status(500).send(err);
									} else {
										console.log('no error');
										res.status(201).send(subjects[0]);
									}
								});
							}
						}
					});
		};

		var get = function (req, res) {

			var query = {};
			var now = new Date();
			var skip = 0;
			var limit = 20;
			now.setHours(now.getHours() - sugSubjectsDuration);
			query.create_date = {
				$gte: now
			}
			var userId = mongoose.Types.ObjectId(req.authuser._id);


			if (req.body && (req.body.status != undefined)) {
				query.status = req.body.status;
			}
			else
			{
				query.status = true;
			}
			var sugSubjectQuery = SugSubject.find(query);
			var sugSubjectQueryCount = SugSubject.count(query);
			if (req.body && req.query.skip && req.query.limit) {
				skip = Number(req.query.skip);
				limit = Number(req.query.limit);
			}
			sugSubjectQueryCount
				.exec(
					function (err, sugSubjectCount) {
						if (err) {
							console.log(err);
							res.status(500).send(err);
						} else {
							sugSubjectQuery.skip(skip).limit(limit)
								.sort({'create_date': -1})
								.exec(
									function (err, sugSubjects) {
										if (err) {
											console.log(err);
											res.status(500).send(err);
										} else {
											res.status(200).send({subjects: sugSubjects, count: sugSubjectCount});
										}
									});

						}
					});
		};

		var deleteFunction = function (req, res) {
			var query = {};
			if (req.query._id) {
				query._id = mongoose.Types.ObjectId(req.query._id);
				Subject.remove(query, function (err, data) {
					if (err) {
						res.status(500).send(err);
					} else {
						res.status(204).send("Removed");
					}
				});
			}
			else {
				res.status(500).send("not found");

			}


		};

		return {
			post: post,
			get: get,
			delete: deleteFunction,
			put: put,
			changeStatus: changeStatus
		};

	}
	;

module.exports = subSubjectController;