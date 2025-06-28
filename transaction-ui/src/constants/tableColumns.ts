import { TransactionColumnsProps } from '../types/transactions.type';

export enum TRANSACTION_TABLE_COLUMN_KEYS {
	ID = 'id',
	DATE = 'date',
	DESCRIPTION = 'description',
	AMOUNT = 'amount',
	CURRENCY = 'currency',
}

export const TRANSACTION_TABLE_COLUMNS: Array<TransactionColumnsProps> = [
	{ value: TRANSACTION_TABLE_COLUMN_KEYS.ID, label: 'ID' },
	{ value: TRANSACTION_TABLE_COLUMN_KEYS.DATE, label: 'Date' },
	{ value: TRANSACTION_TABLE_COLUMN_KEYS.DESCRIPTION, label: 'Description' },
	{ value: TRANSACTION_TABLE_COLUMN_KEYS.AMOUNT, label: 'Amount' },
	{ value: TRANSACTION_TABLE_COLUMN_KEYS.CURRENCY, label: 'Currency' },
];

export enum TABLE_ORDER {
	ASC = 'asc',
	DESC = 'desc',
}

export const TABLE_CELL_FALLBACK = '-';

export const TABLE_PAGE_LIMITS = [10, 25, 50, 100];
