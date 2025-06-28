import TableFooter from './TableFooter';
import {
	TABLE_CELL_FALLBACK,
	TRANSACTION_TABLE_COLUMNS,
} from '../constants/tableColumns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faMagnifyingGlass,
	faDatabase,
} from '@fortawesome/free-solid-svg-icons';
import {
	TransactionColumnsProps,
	TransactionDataProps,
} from '../types/transactions.type';
import React from 'react';

const formatCellValue = (
	col: TransactionColumnsProps,
	tx: TransactionDataProps
) => {
	if (!tx) return TABLE_CELL_FALLBACK;

	const colValue = (col.value ?? '') as keyof TransactionDataProps;

	if (colValue === 'date') {
		if (!tx.date) return TABLE_CELL_FALLBACK;
		const d = new Date(tx.date);
		const yyyy = d.getUTCFullYear();
		const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
		const dd = String(d.getUTCDate()).padStart(2, '0');
		return `${mm}/${dd}/${yyyy}`;
	}

	if (colValue === 'amount') {
		return typeof tx.amount === 'number'
			? new Intl.NumberFormat('en-US', {
					style: 'currency',
					currency: tx.currency ?? 'USD',
			  }).format(tx.amount)
			: TABLE_CELL_FALLBACK;
	}

	return tx[colValue] !== '' &&
		tx[colValue] !== null &&
		tx[colValue] !== undefined
		? tx[colValue]
		: TABLE_CELL_FALLBACK;
};

interface TableProps {
	data?: Array<TransactionDataProps>;
	pagination?: {
		page: number;
		limit: number;
		total: number;
	};
	onPageChange?: React.Dispatch<React.SetStateAction<number>>;
	onLimitChange?: React.Dispatch<React.SetStateAction<number>>;
	search?: string;
}

const Table = ({
	data,
	pagination,
	onPageChange,
	onLimitChange,
	search,
}: TableProps) => {
	const isEmpty = !data || data.length === 0;

	return (
		<div
			className="overflow-x-auto w-full rounded-lg shadow-lg bg-white"
			style={{
				border: '1.5px solid #2563eb22',
			}}
		>
			<table className="min-w-full bg-white rounded-lg">
				<thead>
					<tr>
						{TRANSACTION_TABLE_COLUMNS.map((col) => (
							<th
								key={col.value}
								className="px-4 py-3 text-left text-xs font-semibold text-blue-700 uppercase bg-blue-50"
							>
								{col.label}
							</th>
						))}
					</tr>
				</thead>

				<tbody>
					{isEmpty ? (
						<tr>
							<td colSpan={TRANSACTION_TABLE_COLUMNS.length}>
								<div className="flex flex-col items-center justify-center py-12 text-blue-400">
									{search ? (
										<>
											<FontAwesomeIcon icon={faMagnifyingGlass} size="3x" />
											<div className="mt-2 text-base text-blue-500 font-medium">
												No results found
											</div>
										</>
									) : (
										<>
											<FontAwesomeIcon icon={faDatabase} size="3x" />
											<div className="mt-2 text-base text-blue-500 font-medium">
												No data available
											</div>
										</>
									)}
								</div>
							</td>
						</tr>
					) : (
						data?.map((tx, idx) => {
							const isLast = idx === data?.length - 1;
							const tdClass =
								'px-4 py-3 text-sm text-left ' +
								(isLast ? '' : 'border-b border-gray-200 ');

							return (
								<tr
									key={tx?.id}
									className={
										idx % 2 === 0
											? 'bg-white hover:bg-blue-50 transition'
											: 'bg-blue-50 hover:bg-blue-100 transition'
									}
								>
									{TRANSACTION_TABLE_COLUMNS.map((col) => (
										<td
											key={col.value}
											className={
												tdClass +
												(col.value === 'description'
													? 'text-gray-900'
													: 'text-gray-700')
											}
										>
											{formatCellValue(col, tx)}
										</td>
									))}
								</tr>
							);
						})
					)}
				</tbody>
			</table>

			{pagination && (
				<TableFooter
					page={pagination?.page}
					limit={pagination?.limit}
					total={pagination?.total}
					onPageChange={onPageChange}
					onLimitChange={onLimitChange}
				/>
			)}
		</div>
	);
};

export default Table;
