export type TransactionColumnsProps = {
	value: string;
	label: string;
};

export type TransactionDataProps = {
	id: number;
	date: string;
	description: string;
	amount: number;
	currency: string;
};

export type TransactionProps = {
	data: Array<TransactionDataProps>;
	page: number;
	limit: number;
	total: number;
	totalAmount: number;
};
