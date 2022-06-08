import Menu from './menu';
const menu = [
	{ name: 'Home', items: [1, 2, 3, 4, 5] },
	{ name: 'Profile', items: [1, 2, 3, 4, 5] },
	{ name: 'settings', items: [1, 2, 3, 4, 5] }
];

const MenuTest = () => {
	const getSubMenus = () => {
		return <Menu />;
	};

	return <Menu menu={menu.map(({ name }) => name)} render={getSubMenus} />;
};

export default MenuTest;
