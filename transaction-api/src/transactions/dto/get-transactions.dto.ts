import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsDateString, IsString, IsNumber } from 'class-validator';

export class TransactionsDto {
	@ApiProperty({
		type: String,
		description:
			'Unique identifier for the transaction, represented as a UUID string.',
		example: 'b3e1c2a4-5d6f-4e7a-8b9c-1d2e3f4a5b6c',
	})
	@IsUUID(4, { message: 'Invalid UUID' })
	uuid!: string;

	@ApiProperty({
		type: String,
		description:
			'Date and time when the transaction occurred, in ISO 8601 format (UTC).',
		example: '2025-06-27T00:00:00.000Z',
	})
	@IsDateString({}, { message: 'Invalid date format' })
	date!: string;

	@ApiProperty({
		type: String,
		description:
			'Detailed description of the transaction, such as the merchant or purpose.',
		example: 'Supermarket purchase',
	})
	@IsString()
	description!: string;

	@ApiProperty({
		type: Number,
		description:
			'Total amount of money involved in the transaction, expressed as a decimal number.',
		example: 45.99,
	})
	@IsNumber()
	amount!: number;

	@ApiProperty({
		type: String,
		description:
			'Currency code for the transaction amount, following the ISO 4217 standard (e.g., USD, EUR).',
		example: 'USD',
	})
	@IsString()
	currency!: string;
}
