import { ApiPropertyOptional } from '@nestjs/swagger';
import {
	IsOptional,
	IsString,
	IsNumber,
	IsIn,
	IsDateString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { SORT_ORDER } from '../../constants/sort';
import { TRANSACTION_SORT_FIELDS } from '../../constants/transactions';

export class TransactionsQueryProps {
	@ApiPropertyOptional({
		description:
			'Optional search term to filter transactions by any field. Allows searching across multiple transaction attributes, such as description, amount, or currency, for flexible querying.',
		type: String,
		example: 'Supermarket purchase',
	})
	@IsOptional()
	@IsString()
	search?: string;

	@ApiPropertyOptional({
		description:
			'Start date for filtering transactions, in ISO 8601 format (UTC). Only transactions on or after this date will be included.',
		type: String,
		format: 'date',
		example: '2025-06-01',
	})
	@IsOptional()
	@IsDateString()
	fromDate?: string;

	@ApiPropertyOptional({
		description:
			'End date for filtering transactions, in ISO 8601 format (UTC). Only transactions on or before this date will be included.',
		type: String,
		format: 'date',
		example: '2025-06-30',
	})
	@IsOptional()
	@IsDateString()
	toDate?: string;

	@ApiPropertyOptional({
		description:
			'Field by which to sort the results (e.g., date, amount, description, currency).',
		enum: Object.values(TRANSACTION_SORT_FIELDS),
		example: TRANSACTION_SORT_FIELDS.DATE,
	})
	@IsOptional()
	@IsIn(Object.values(TRANSACTION_SORT_FIELDS))
	sortBy?: string;

	@ApiPropertyOptional({
		description: `Sort order for the results: "${SORT_ORDER.ASC}" for ascending or "${SORT_ORDER.DESC}" for descending.`,
		enum: [SORT_ORDER.ASC, SORT_ORDER.DESC],
		example: SORT_ORDER.DESC,
	})
	@IsOptional()
	@IsIn([SORT_ORDER.ASC, SORT_ORDER.DESC])
	order?: string;

	@ApiPropertyOptional({
		description: 'Page number for paginated results (starts at 1).',
		type: Number,
		example: 1,
	})
	@IsOptional()
	@Type(() => Number)
	@IsNumber()
	page?: number;

	@ApiPropertyOptional({
		description: 'Number of items to return per page.',
		type: Number,
		example: 20,
	})
	@IsOptional()
	@Type(() => Number)
	@IsNumber()
	limit?: number;
}
