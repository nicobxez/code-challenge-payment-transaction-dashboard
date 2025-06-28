function setRoutes(app) {
	// Server route
	const initController = require('../controllers/initController');
	app.get('/', initController.getHello);

	// Transaction routes
	const transactions = require('../controllers/transactionController');
	app.get('/transactions', transactions.getTransactionList);
}

module.exports = setRoutes;
