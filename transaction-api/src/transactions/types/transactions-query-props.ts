export interface TransactionsQueryProps {
	search?: string;
	fromDate?: string;
	toDate?: string;
	sortBy?: string;
	order?: string;
	page?: string | number;
	limit?: string | number;
}
