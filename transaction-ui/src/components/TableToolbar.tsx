import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faArrowUpAZ,
	faArrowDownZA,
	faChevronDown as faSelectChevron,
	faRotateLeft,
} from '@fortawesome/free-solid-svg-icons';
import {
	TABLE_ORDER,
	TRANSACTION_TABLE_COLUMN_KEYS,
	TRANSACTION_TABLE_COLUMNS,
} from '../constants/tableColumns';

interface TableToolbarProps {
	search: string;
	onSearchChange?: React.Dispatch<React.SetStateAction<string>>;
	column: string;
	onColumnChange?: React.Dispatch<
		React.SetStateAction<TRANSACTION_TABLE_COLUMN_KEYS>
	>;
	order?: TABLE_ORDER;
	onOrderChange?: React.Dispatch<React.SetStateAction<TABLE_ORDER>>;
	dateRange: { from: string; to: string };
	onDateRangeChange?: React.Dispatch<
		React.SetStateAction<{ from: string; to: string }>
	>;
}

const TableToolbar = ({
	search,
	onSearchChange,
	column,
	onColumnChange,
	order = TABLE_ORDER.ASC,
	onOrderChange,
	dateRange,
	onDateRangeChange,
}: TableToolbarProps) => {
	const hasFilters =
		(search && search.trim() !== '') ||
		(dateRange?.from && dateRange.from !== '') ||
		(dateRange?.to && dateRange.to !== '') ||
		column !== TRANSACTION_TABLE_COLUMN_KEYS.ID ||
		order !== TABLE_ORDER.ASC;

	const handleResetFilters = () => {
		onSearchChange?.('');
		onColumnChange?.(TRANSACTION_TABLE_COLUMN_KEYS.ID);
		onOrderChange?.(TABLE_ORDER.ASC);
		onDateRangeChange?.({ from: '', to: '' });
	};

	return (
		<div
			className="w-full bg-blue-50 rounded-3xl shadow flex items-center justify-between px-2 py-2
			sm:flex-row flex-col gap-2 max-w-full transition-all duration-300 mb-4"
			style={{
				boxShadow: '0 2px 8px 0 rgba(31, 38, 135, 0.10)',
				backdropFilter: 'blur(6px)',
				border: '1.5px solid #2563eb22',
			}}
		>
			{/* Search input */}
			<input
				type="text"
				placeholder="Search..."
				value={search}
				onChange={(e) => onSearchChange?.(e.target.value)}
				className="flex-1 border-none bg-white/90 rounded-full px-3 py-1 text-sm shadow focus:ring-2 focus:ring-blue-200 focus:outline-none transition h-8 min-w-0 w-full sm:w-auto"
			/>

			{/* Date range filter */}
			<div className="flex gap-2 w-full sm:w-auto">
				<input
					type="date"
					value={dateRange?.from || ''}
					onChange={(e) =>
						onDateRangeChange?.((prev) => ({ ...prev, from: e.target.value }))
					}
					className="border-none bg-white/90 rounded-full px-3 py-1 text-sm shadow focus:ring-2 focus:ring-blue-200 focus:outline-none transition h-8 w-full sm:w-auto"
					placeholder="From"
				/>

				<span className="text-gray-400 flex items-center">-</span>

				<input
					type="date"
					value={dateRange?.to || ''}
					onChange={(e) =>
						onDateRangeChange?.((prev) => ({ ...prev, to: e.target.value }))
					}
					className="border-none bg-white/90 rounded-full px-3 py-1 text-sm shadow focus:ring-2 focus:ring-blue-200 focus:outline-none transition h-8 w-full sm:w-auto"
					placeholder="To"
				/>
			</div>

			{/* Column and Order selection */}
			<div className="flex items-center gap-1 w-full sm:w-auto">
				<div className="relative flex-1 w-full sm:w-auto">
					<select
						value={column}
						onChange={(e) =>
							onColumnChange?.(e.target.value as TRANSACTION_TABLE_COLUMN_KEYS)
						}
						className="appearance-none border-none bg-white/90 rounded-full px-3 py-1 text-sm shadow focus:ring-2 focus:ring-blue-200 focus:outline-none transition h-8 pr-8 w-full sm:w-auto"
					>
						{TRANSACTION_TABLE_COLUMNS.map((col) => (
							<option key={col.value} value={col.value as string}>
								{col.label}
							</option>
						))}
					</select>

					<span className="pointer-events-none absolute right-2 top-[44%] transform -translate-y-1/2 text-blue-400">
						<FontAwesomeIcon icon={faSelectChevron} className="text-xs" />
					</span>
				</div>

				<button
					type="button"
					onClick={() =>
						onOrderChange?.(
							order === TABLE_ORDER.ASC ? TABLE_ORDER.DESC : TABLE_ORDER.ASC
						)
					}
					className="p-1 rounded-full bg-blue-600 hover:bg-blue-800 transition text-white shadow h-8 w-8 flex items-center justify-center"
					title={`Sort ${
						order === TABLE_ORDER.ASC ? 'descending' : 'ascending'
					}`}
				>
					<FontAwesomeIcon
						icon={order === TABLE_ORDER.ASC ? faArrowUpAZ : faArrowDownZA}
						className="text-base"
					/>
				</button>

				{hasFilters && (
					<button
						type="button"
						onClick={handleResetFilters}
						className="ml-2 p-1 rounded-full bg-red-600 hover:bg-red-800 transition text-white shadow h-8 w-8 flex items-center justify-center"
						title="Reset filters"
					>
						<FontAwesomeIcon icon={faRotateLeft} className="text-lg" />
					</button>
				)}
			</div>
		</div>
	);
};

export default TableToolbar;
