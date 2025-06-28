// Middleware to handle errors globally
import { Request, Response, NextFunction } from 'express';

export default function errorHandler(
	err: unknown,
	req: Request,
	res: Response,
	next: NextFunction
) {
	console.error(err);
	res.status(500).json({
		error: 'Internal Server Error',
		message: 'Something went wrong while processing your request.',
	});
}
