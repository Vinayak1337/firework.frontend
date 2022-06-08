import { Link } from 'react-router-dom';

const Nav = () => {
	return (
		<div
			className='m-auto bg-light'
			style={{ maxWidth: '700px', height: '100px' }}>
			<div className='d-flex justify-content-around  h-100 align-items-center'>
				<Link to='/' className='text-decoration-none'>
					All Videos
				</Link>
				<Link to='/upload' className='text-decoration-none'>
					Upload Video
				</Link>
				<Link to='/fw-studio' className='text-decoration-none'>
					Images Upload
				</Link>
			</div>
		</div>
	);
};

export default Nav;
