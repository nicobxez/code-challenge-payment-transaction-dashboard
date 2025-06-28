import './App.css';

import { useEffect, useState } from 'react';
import Header from './components/Header';
import Table from './components/Table';
import TableToolbar from './components/TableToolbar';
import useTransactionAPI from './hooks/useTransactionAPI';
import {
	TABLE_ORDER,
	TABLE_PAGE_LIMITS,
	TRANSACTION_TABLE_COLUMN_KEYS,
} from './constants/tableColumns';
import Notification from './components/Notification';
import SummarySection from './components/SummarySection';

function App() {
	const [page, setPage] = useState<number>(1);
	const [limit, setLimit] = useState<number>(TABLE_PAGE_LIMITS[0]);
	const [search, setSearch] = useState<string>('');
	const [column, setColumn] = useState<TRANSACTION_TABLE_COLUMN_KEYS>(
		TRANSACTION_TABLE_COLUMN_KEYS.ID
	);
	const [order, setOrder] = useState<TABLE_ORDER>(TABLE_ORDER.ASC);
	const [dateRange, setDateRange] = useState<{
		from: string;
		to: string;
	}>({ from: '', to: '' });
	const [error, setError] = useState<string>('');

	const { transactionList } = useTransactionAPI({
		getList: true,
		page,
		limit,
		search,
		sortBy: column,
		order,
		dateRange,
		onError: setError,
	});

	useEffect(() => {
		// Reset page to 1 when the other parameters change
		setPage(1);
	}, [limit, search, column, order, dateRange]);

	return (
		<div className="App mx-auto">
			<Header />

			<Notification message={error} type="error" onClose={() => setError('')} />

			<div className="max-w-[1280px] w-full mx-auto mt-8 px-2">
				<SummarySection
					total={transactionList?.total}
					totalAmount={transactionList?.totalAmount}
				/>

				<TableToolbar
					search={search}
					onSearchChange={setSearch}
					column={column}
					onColumnChange={setColumn}
					order={order}
					onOrderChange={setOrder}
					dateRange={dateRange}
					onDateRangeChange={setDateRange}
				/>

				<Table
					data={transactionList?.data || []}
					pagination={{
						page,
						limit: transactionList?.limit,
						total: transactionList?.total,
					}}
					onPageChange={setPage}
					onLimitChange={setLimit}
					search={search}
				/>
			</div>
		</div>
	);
}

export default App;
