import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { TransactionsQueryProps } from './types/transactions-query-props';
import { transactions } from '../mocks/transactions';

describe('TransactionsController', () => {
	let controller: TransactionsController;
	let service: TransactionsService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [TransactionsController],
			providers: [TransactionsService],
		}).compile();

		controller = module.get<TransactionsController>(TransactionsController);
		service = module.get<TransactionsService>(TransactionsService);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	it('should return paginated transactions', () => {
		const query: TransactionsQueryProps = {};
		const result = controller.getTransactions(query);

		expect(result.data.length).toBeLessThanOrEqual(10);
		expect(result.total).toBe(transactions.length);
		expect(result.page).toBe(1);
		expect(result.limit).toBe(10);
	});

	it('should filter by search', () => {
		const query: TransactionsQueryProps = { search: transactions[0].uuid };
		const result = controller.getTransactions(query);

		expect(result.data.length).toBeGreaterThan(0);
		expect(result.data[0]).toMatchObject(transactions[0]);
	});

	it('should filter by date range', () => {
		const tx = transactions.find((t) => typeof t.date === 'string');
		if (!tx) return;

		const query: TransactionsQueryProps = {
			fromDate: tx.date,
			toDate: tx.date,
		};

		const result = controller.getTransactions(query);

		expect(result.data.length).toBeGreaterThan(0);
		expect(result.data[0].date).toBe(tx.date);
	});

	it('should sort by amount desc', () => {
		const query: TransactionsQueryProps = { sortBy: 'amount', order: 'desc' };
		const result = controller.getTransactions(query);
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
		const result = controller.getTransactions(query);

		expect(result.page).toBe(2);
		expect(result.limit).toBe(5);
		expect(result.data.length).toBeLessThanOrEqual(5);
	});
});
