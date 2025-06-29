import { Injectable } from '@nestjs/common';
import { transactions } from '../mocks/transactions';
import { SORT_ORDER } from '../constants/sort';
import { TransactionsQueryProps } from './types/transactions-query-props';
import {
	filterByDateRange,
	filterBySearch,
	paginate,
	sortData,
} from '../utils/listFilters';

@Injectable()
export class TransactionsService {
	getTransactions(query: TransactionsQueryProps) {
		let result = [...transactions];

		// Search
		const search = query.search
			? String(query.search).toLowerCase()
			: undefined;
		result = filterBySearch(result, search);

		// Date range filter
		result = filterByDateRange(result, query.fromDate, query.toDate);

		// Sort
		const sortBy = query.sortBy ? String(query.sortBy) : undefined;
		const order =
			query.order === SORT_ORDER.DESC ? SORT_ORDER.DESC : SORT_ORDER.ASC;
		result = sortData(result, sortBy, order);

		// Pagination
		const page = query.page ? parseInt(String(query.page)) : 1;
		const limit = query.limit ? parseInt(String(query.limit)) : 10;
		const paginated = paginate(result, page, limit);

		// Calculate total amount
		const totalAmount = result.reduce(
			(sum, t) => sum + (typeof t.amount === 'number' ? t.amount : 0),
			0
		);

		return {
			page,
			limit,
			total: result.length,
			totalAmount,
			data: paginated,
		};
	}
}
