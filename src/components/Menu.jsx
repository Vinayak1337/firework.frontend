import PropTypes from 'prop-types';
import { useState } from 'react';

const Menu = ({
	menu,
	ulClassName = '',
	liClassName = '',
	handleMouseEnter = () => null,
	handleMouseLeave = () => null,
	render = ''
}) => {
	const [toRender, setToRender] = useState(false);

	const turnOnRneder = () => {
		setToRender(true);
		handleMouseEnter();
	};

	const turnOffRneder = () => {
		setToRender(false);
		handleMouseLeave();
	};

	return (
		<ul className={ulClassName}>
			{menu.map((v, i) => (
				<li
					onMouseEnter={turnOnRneder}
					onMouseLeave={turnOffRneder}
					className={liClassName}
					key={`${ulClassName}_${liClassName}_${i}`}>
					{v}
					{toRender && render}
				</li>
			))}
		</ul>
	);
};

Menu.prototype = {
	menu: PropTypes.arrayOf(PropTypes.string).isRequired,
	ulClassName: PropTypes.string,
	liClassName: PropTypes.string,
	handleMouseEnter: PropTypes.func,
	handleMouseLeave: PropTypes.func,
	render: PropTypes.element
};

export default Menu;
