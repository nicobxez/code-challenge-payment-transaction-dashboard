interface NotificationProps {
	message: string;
	type?: 'error' | 'success';
	onClose: () => void;
}

const Notification = ({
	message,
	type = 'error',
	onClose,
}: NotificationProps) => {
	if (!message) return null;

	const bgColor =
		type === 'error' ? 'bg-red-600 text-white' : 'bg-green-600 text-white';

	return (
		<div
			className={`fixed top-4 right-4 z-50 px-4 py-3 rounded shadow-lg flex items-center gap-2 ${bgColor}`}
			role="alert"
		>
			<span className="flex-1">{message}</span>

			<button
				onClick={onClose}
				className="ml-2 text-white font-bold focus:outline-none"
				aria-label="Close"
			>
				&times;
			</button>
		</div>
	);
};

export default Notification;
