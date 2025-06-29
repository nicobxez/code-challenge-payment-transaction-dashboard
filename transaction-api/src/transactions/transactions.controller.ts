import { Controller, Get, Query } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SORT_ORDER } from '../constants/sort';
import { TransactionsQueryProps } from './types/transactions-query-props';

@ApiTags('Transactions')
@Controller('transactions')
export class TransactionsController {
	constructor(private readonly transactionsService: TransactionsService) {}

	@ApiOperation({
		summary: 'Get transactions',
		description:
			'Returns a paginated, filtered, and sorted list of transactions.',
	})
	@ApiQuery({
		name: 'search',
		required: false,
		description: 'Search string for filtering transactions',
	})
	@ApiQuery({
		name: 'fromDate',
		required: false,
		description: 'Start date for filtering (YYYY-MM-DD)',
	})
	@ApiQuery({
		name: 'toDate',
		required: false,
		description: 'End date for filtering (YYYY-MM-DD)',
	})
	@ApiQuery({
		name: 'sortBy',
		required: false,
		description: 'Field to sort by',
	})
	@ApiQuery({
		name: 'order',
		required: false,
		description: `Sort order (${SORT_ORDER.ASC} or ${SORT_ORDER.DESC})`,
	})
	@ApiQuery({
		name: 'page',
		required: false,
		description: 'Page number',
		type: Number,
	})
	@ApiQuery({
		name: 'limit',
		required: false,
		description: 'Items per page',
		type: Number,
	})
	@ApiResponse({ status: 200, description: 'List of transactions' })
	@Get()
	getTransactions(@Query() query: TransactionsQueryProps) {
		return this.transactionsService.getTransactions(query);
	}
}
