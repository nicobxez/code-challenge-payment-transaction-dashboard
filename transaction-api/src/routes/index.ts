import { Application } from 'express';
import * as initController from '../controllers/initController';
import * as transactionController from '../controllers/transactionController';

export function setRoutes(app: Application) {
	// Server route
	app.get('/', initController.getHello);

	// Transaction routes
	app.get('/transactions', transactionController.getTransactionList);
}
