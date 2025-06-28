import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyCheckDollar } from '@fortawesome/free-solid-svg-icons';

const Header = () => (
	<header className="w-full bg-blue-700 py-3 flex items-center">
		<FontAwesomeIcon
			icon={faMoneyCheckDollar}
			className="text-white text-xl ml-6"
		/>
	</header>
);

export default Header;
