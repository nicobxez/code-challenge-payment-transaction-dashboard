import { Request, Response, NextFunction } from 'express';
import { transactions } from '../mocks/transactionList';

export function getTransactionList(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		let result = [...transactions];

		// Search
		const search = req.query.search
			? String(req.query.search).toLowerCase()
			: undefined;

		if (search) {
			result = result.filter((t) =>
				Object.values(t).some((val) =>
					String(val).toLowerCase().includes(search)
				)
			);
		}

		// Date range filter
		const fromDate = req.query.fromDate
			? new Date(String(req.query.fromDate))
			: undefined;
		const toDate = req.query.toDate
			? new Date(String(req.query.toDate))
			: undefined;

		if (fromDate || toDate) {
			result = result.filter((t) => {
				if (t.date === null || t.date === undefined) return false;

				const txDate = new Date(String(t.date));

				if (isNaN(txDate.getTime())) return false;
				if (fromDate && txDate < fromDate) return false;
				if (toDate && txDate > toDate) return false;

				return true;
			});
		}

		// Sort
		const sortBy = req.query.sortBy ? String(req.query.sortBy) : undefined;
		const order = req.query.order === 'desc' ? 'desc' : 'asc';

		if (sortBy) {
			result.sort((a, b) => {
				const aVal = a[sortBy as keyof typeof a];
				const bVal = b[sortBy as keyof typeof b];

				const aIsNullOrZero = aVal === null || aVal === undefined || aVal === 0;
				const bIsNullOrZero = bVal === null || bVal === undefined || bVal === 0;

				if (aIsNullOrZero) return order === 'asc' ? -1 : 1;
				if (bIsNullOrZero) return order === 'asc' ? 1 : -1;
				if (aVal < bVal) return order === 'asc' ? -1 : 1;
				if (aVal > bVal) return order === 'asc' ? 1 : -1;

				return 0;
			});
		}

		// Pagination
		const page = req.query.page ? parseInt(String(req.query.page)) : 1;
		const limit = req.query.limit ? parseInt(String(req.query.limit)) : 10;
		const start = (page - 1) * limit;
		const end = start + limit;
		const paginated = result.slice(start, end);

		// Calculate total amount
		const totalAmount = result.reduce(
			(sum, t) => sum + (typeof t.amount === 'number' ? t.amount : 0),
			0
		);

		res.json({
			page,
			limit,
			total: result.length,
			totalAmount,
			data: paginated,
		});
	} catch (error) {
		next(error);
	}
}
