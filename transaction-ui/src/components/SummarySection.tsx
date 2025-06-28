interface SummarySectionProps {
	total?: number;
	totalAmount?: number | string;
}

const SummarySection = ({ total, totalAmount }: SummarySectionProps) => (
	<div className="mb-4 flex flex-col sm:flex-row gap-2 sm:gap-6 items-start sm:items-center">
		<div className="text-sm text-gray-700">
			<strong>Total transactions:</strong> {total ?? 0}
		</div>

		<div className="text-sm text-gray-700">
			<strong>Total amount:</strong>{' '}
			{typeof totalAmount === 'number'
				? new Intl.NumberFormat('en-US', {
						style: 'currency',
						currency: 'USD',
				  }).format(totalAmount)
				: '-'}
		</div>
	</div>
);

export default SummarySection;
