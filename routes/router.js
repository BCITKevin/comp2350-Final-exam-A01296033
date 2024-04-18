const router = require('express').Router();
const database = include('databaseConnection');
const dbModel = include('databaseAccessLayer');
// const dbModel = include('staticData');

const express = require('express');
router.use(express.urlencoded({ extended: true }));

router.get('/', async (req, res) => {
	console.log("page hit");
	
	try {
		let total = 0;
		const result = await dbModel.getAllUsers();
		for (let i = 0; i < result.length; i++) {
			const num = Number(result[i].cost) * result[i].quantity
			
			total += num;
		}
		
		res.render('index', {allItems: result, total});

		//Output the results of the query to the Heroku Logs
		console.log('result: ', result);
	}
	catch (err) {
		res.render('error', {message: 'Error reading from MySQL'});
		console.log("Error reading from mysql");
	}
});

router.post('/addItem', async (req, res) => {
	console.log("form submit");
	console.log("req.body log: ", req.body);
	try {
	const success = await dbModel.addItem(req.body);
	if (success) {
	res.redirect("/");
	}
	else {
	res.render('error', {message: "Error writing to MySQL"});
	console.log("Error writing to MySQL");
	}
	}
	catch (err) {
	res.render('error', {message: "Error writing to MySQL"});
	console.log("Error writing to MySQL");
	console.log(err);
	}
	});

	router.get('/deleteUser', async (req, res) => {
		console.log("delete author");
		console.log(req.query);
		let userId = req.query.id;
		if (userId) {
		const success = await dbModel.deleteUser(userId);
		if (success) {
		res.redirect("/");
		}
		else {
		res.render('error', {message: 'Error writing to MySQL'});
		console.log("Error writing to mysql");
		console.log(err);
		}
		}
		});

		router.get('/showBooks', async(req, res) => {
			const authorId = req.query.id;
			if (authorId) {
				const authorName = await dbModel.get_user_by_userId(authorId);
				const success = await dbModel.showBooks(authorId);
				console.log('showBooks: ', success);
				res.render('showBooks', {allBooks: success, authorName, authorId: authorId});
			}
		})
		
		router.post('/addBook', async(req, res) => {
			try {
				const authorId = req.query;
				const success = await dbModel.addBook(req.body, authorId);
				if (success) {
					res.redirect(`/showBooks?id=${authorId.id}`)
				} else {
					res.render('error', {message: "Error writing to MySQL"});
					console.log("Error writing to MySQL");
					}
			} catch (err) {
				res.render('error', {message: "Error writing to MySQL"});
				console.log("Error writing to MySQL");
				console.log(err);
			}
		})

		router.get('/addQuantity', async(req, res) => {
			console.log(req.query)
			
			const result = await dbModel.addQuantity(req.query);

			if (result === true) {
				res.redirect("/");
			} else {
				res.render('error', {message: 'Error writing to MySQL'});
				console.log("Error writing to mysql");
				console.log(err);
			}
		})
		
		router.get('/downQuantity', async(req, res) => {
			console.log(req.query)
			
			const result = await dbModel.downQuantity(req.query);

			if (result === true) {
				res.redirect("/");
			} else {
				res.render('error', {message: 'Error writing to MySQL'});
				console.log("Error writing to mysql");
				console.log(err);
			}
		})

		router.get('/deleteItem', async(req, res) => {
			console.log("delete Book");
			console.log(req.query);
			const success = await dbModel.deleteItem(req.query);
			if (success === true) {
			res.redirect("/");
			}
			else {
			res.render('error', {message: 'Error writing to MySQL'});
			console.log("Error writing to mysql");
			console.log(err);
			}
		})

module.exports = router;
