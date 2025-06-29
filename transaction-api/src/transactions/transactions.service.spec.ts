import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsService } from './transactions.service';
import { transactions } from '../mocks/transactions';
import { SORT_ORDER } from '../constants/sort';
import { TransactionsQueryProps } from './types/transactions-query-props';

describe('TransactionsService', () => {
	let service: TransactionsService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [TransactionsService],
		}).compile();

		service = module.get<TransactionsService>(TransactionsService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('should return paginated transactions', () => {
		const query: TransactionsQueryProps = {};
		const result = service.getTransactions(query);

		expect(result.data.length).toBeLessThanOrEqual(10);
		expect(result.total).toBe(transactions.length);
		expect(result.page).toBe(1);
		expect(result.limit).toBe(10);
	});

	it('should filter by search', () => {
		const query: TransactionsQueryProps = { search: transactions[0].uuid };
		const result = service.getTransactions(query);

		expect(result.data.length).toBeGreaterThan(0);
		expect(result.data[0]).toMatchObject(transactions[0]);
	});

	it('should filter by date range', () => {
		const tx = transactions.find((t) => t.date);
		if (!tx) return;

		const query: TransactionsQueryProps = {
			fromDate: tx.date ?? undefined,
			toDate: tx.date ?? undefined,
		};

		const result = service.getTransactions(query);
		expect(result.data.length).toBeGreaterThan(0);
		expect(result.data[0].date).toBe(tx.date);
	});

	it('should sort by amount desc', () => {
		const query: TransactionsQueryProps = {
			sortBy: 'amount',
			order: SORT_ORDER.DESC,
		};

		const result = service.getTransactions(query);
		const data = result.data.filter((t) => typeof t.amount === 'number');

		if (data.length > 1) {
			for (let i = 1; i < data.length; i++) {
				expect(data[i - 1].amount as number).toBeGreaterThanOrEqual(
					data[i].amount as number
				);
			}
		}
	});

	it('should paginate results', () => {
		const query: TransactionsQueryProps = { page: 2, limit: 5 };
		const result = service.getTransactions(query);

		expect(result.page).toBe(2);
		expect(result.limit).toBe(5);
		expect(result.data.length).toBeLessThanOrEqual(5);
	});
});
