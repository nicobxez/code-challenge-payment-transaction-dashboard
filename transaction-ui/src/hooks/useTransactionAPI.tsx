import { useCallback, useEffect, useState } from 'react';
import { TABLE_ORDER, TABLE_PAGE_LIMITS } from '../constants/tableColumns';
import { TransactionProps } from '../types/transactions.type';

interface UseTransactionAPIProps {
	getList: boolean;
	page?: number;
	limit?: number;
	search?: string;
	sortBy?: string;
	order?: TABLE_ORDER;
	onError?: (error: string) => void;
	dateRange?: {
		from?: string;
		to?: string;
	};
}

const useTransactionAPI = ({
	getList,
	page = 1,
	limit = TABLE_PAGE_LIMITS[0],
	search = '',
	sortBy = '',
	order = TABLE_ORDER.ASC,
	onError,
	dateRange,
}: UseTransactionAPIProps) => {
	const API_URL = process.env.API_URL || 'http://localhost:3001';

	const [transactionList, setTransactionList] = useState<TransactionProps>({
		data: [],
		page: 1,
		limit: TABLE_PAGE_LIMITS[0],
		total: 0,
		totalAmount: 0,
	});

	const getTransaction = useCallback(() => {
		const params = new URLSearchParams({
			page: page.toString(),
			limit: limit.toString(),
		});
		if (search) params.append('search', search);
		if (sortBy) params.append('sortBy', sortBy);
		if (order) params.append('order', order);
		if (dateRange?.from) params.append('fromDate', dateRange.from);
		if (dateRange?.to) params.append('toDate', dateRange.to);

		fetch(`${API_URL}/transactions?${params.toString()}`)
			.then((response) => {
				if (!response.ok) throw new Error('API request failed');
				return response.json();
			})
			.then((data) => {
				setTransactionList(data);
				if (onError) onError('');
			})
			.catch((error) => {
				console.error('Error fetching transaction:', error);
				if (onError) onError('Error fetching transactions. Please try again.');
			});
	}, [API_URL, page, limit, search, sortBy, order, dateRange, onError]);

	useEffect(() => {
		if (getList) {
			getTransaction();
		}
	}, [getList, getTransaction, page, limit, search, sortBy, order]);

	return {
		transactionList,
	};
};

export default useTransactionAPI;
