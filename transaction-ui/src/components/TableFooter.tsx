import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown as faSelectChevron } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { TABLE_PAGE_LIMITS } from '../constants/tableColumns';

interface TableFooterProps {
	page: number;
	limit: number;
	total: number;
	onPageChange?: React.Dispatch<React.SetStateAction<number>>;
	onLimitChange?: React.Dispatch<React.SetStateAction<number>>;
}

const TableFooter = ({
	page,
	limit,
	total,
	onPageChange,
	onLimitChange,
}: TableFooterProps) => {
	const totalPages = Math.ceil(total / limit) ?? 0;

	return (
		<div className="flex flex-col sm:flex-row justify-between items-center px-4 py-2 bg-white border-t border-gray-200 rounded-b-lg gap-2">
			<div className="flex items-center gap-2">
				<span className="text-sm text-gray-700">Rows per page:</span>

				<div className="relative">
					<select
						value={limit}
						onChange={(e) => onLimitChange?.(parseInt(e.target.value, 10))}
						className="appearance-none border-none bg-blue-50 rounded-full px-3 py-1 text-sm shadow focus:ring-2 focus:ring-blue-200 focus:outline-none transition pr-8"
					>
						{TABLE_PAGE_LIMITS.map((value) => (
							<option key={value} value={value}>
								{value}
							</option>
						))}
					</select>

					<span className="pointer-events-none absolute right-2 top-[44%] transform -translate-y-1/2 text-blue-400">
						<FontAwesomeIcon icon={faSelectChevron} className="text-xs" />
					</span>
				</div>
			</div>

			<div className="flex items-center gap-2">
				<button
					className="px-3 py-1 rounded bg-blue-50 text-blue-700 disabled:opacity-50"
					onClick={() => onPageChange?.((prev) => (prev > 1 ? prev - 1 : 1))}
					disabled={page <= 1}
				>
					Prev
				</button>

				<span className="text-sm text-gray-700">
					{totalPages > 1 ? `Page ${page} of ${totalPages}` : `Page ${page}`}
				</span>

				<button
					className="px-3 py-1 rounded bg-blue-50 text-blue-700 disabled:opacity-50"
					onClick={() => onPageChange?.((prev) => prev + 1)}
					disabled={page >= totalPages}
				>
					Next
				</button>
			</div>
		</div>
	);
};

export default TableFooter;
