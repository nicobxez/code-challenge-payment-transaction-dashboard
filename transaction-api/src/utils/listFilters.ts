import { SORT_ORDER } from '../constants/sort';

export function filterBySearch<T extends Record<string, any>>(
	data: T[],
	search?: string
): T[] {
	if (!search) return data;

	return data.filter((t) =>
		Object.values(t).some((val) => String(val).toLowerCase().includes(search))
	);
}

export function filterByDateRange<T extends { date?: string | null }>(
	data: T[],
	fromDate?: string,
	toDate?: string
): T[] {
	if (!fromDate && !toDate) return data;

	const from = fromDate ? new Date(fromDate) : undefined;
	const to = toDate ? new Date(toDate) : undefined;

	return data.filter((t) => {
		if (t.date === null || t.date === undefined) return false;

		const txDate = new Date(String(t.date));

		if (isNaN(txDate.getTime())) return false;
		if (from && txDate < from) return false;
		if (to && txDate > to) return false;

		return true;
	});
}

export function sortData<T>(
	data: T[],
	sortBy?: string,
	order: SORT_ORDER = SORT_ORDER.ASC
): T[] {
	if (!sortBy) return data;
	return [...data].sort((a, b) => {
		const aVal = a[sortBy as keyof T];
		const bVal = b[sortBy as keyof T];

		const aIsNullOrZero = aVal === null || aVal === undefined || aVal === 0;
		const bIsNullOrZero = bVal === null || bVal === undefined || bVal === 0;

		if (aIsNullOrZero) return order === SORT_ORDER.ASC ? -1 : 1;
		if (bIsNullOrZero) return order === SORT_ORDER.ASC ? 1 : -1;
		if (aVal < bVal) return order === SORT_ORDER.ASC ? -1 : 1;
		if (aVal > bVal) return order === SORT_ORDER.ASC ? 1 : -1;

		return 0;
	});
}

export function paginate<T>(
	data: T[],
	page: number = 1,
	limit: number = 10
): T[] {
	const start = (page - 1) * limit;
	const end = start + limit;
	return data.slice(start, end);
}
