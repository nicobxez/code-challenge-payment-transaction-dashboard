const transactions = require('../mocks/transactionList');

const getTransactionList = (req, res, next) => {
	try {
		let result = [...transactions];

		// Search
		const search = req.query.search?.toLowerCase();
		if (search) {
			result = result.filter((t) =>
				Object.values(t).some((val) =>
					String(val).toLowerCase().includes(search)
				)
			);
		}

		// Date range filter
		const fromDate = req.query.fromDate ? new Date(req.query.fromDate) : null;
		const toDate = req.query.toDate ? new Date(req.query.toDate) : null;
		if (fromDate || toDate) {
			result = result.filter((t) => {
				const txDate = new Date(t.date);
				if (fromDate && txDate < fromDate) return false;
				if (toDate && txDate > toDate) return false;
				return true;
			});
		}

		// Sort
		const sortBy = req.query.sortBy;
		const order = req.query.order === 'desc' ? 'desc' : 'asc';
		if (sortBy) {
			result.sort((a, b) => {
				const aVal = a[sortBy];
				const bVal = b[sortBy];

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
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 10;
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
};

module.exports = {
	getTransactionList,
};
