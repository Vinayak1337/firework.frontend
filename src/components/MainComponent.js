import { Redirect, Route, Switch } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import AllVideosComponent from './AllVideosComponent';
import UploadVideoComponent from './UploadVideoComponent';

import Video from './Video';
import { useState } from 'react';

import Nav from './Nav';
import FWStudio from './FW Studio/FWStudio';

const Main = () => {
	const [formSubmit, setFormSubmit] = useState(false);
	return (
		<Router>
			<Nav />
			<Switch>
				<Route exact path='/upload'>
					<UploadVideoComponent setFormSubmit={setFormSubmit} />
				</Route>
				<Route exact path='/'>
					<AllVideosComponent formSubmit={formSubmit} />
				</Route>
				<Route exact path='/singleVideo'>
					<Video />
				</Route>
				<Route exact path='/fw-studio'>
					<FWStudio />
				</Route>
				<Route exact path='/'>
					<Redirect to='/' />
				</Route>
			</Switch>
		</Router>
	);
};

export default Main;
