import {
	Container,
	Row,
	Col,
	Dropdown,
	Modal,
	Button,
	Form
} from 'react-bootstrap';
import { Fragment, useState, useEffect, useCallback } from 'react';
import api, { baseUrl } from '../api/index';
import Spinner from './spinner';
import axios from 'axios';
import RenderVideoCard from './RenderedVideo';

function matchYoutubeUrl(url) {
	var p =
		/^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
	if (url.match(p)) return url.match(p)[1];
	return false;
}

function MyVerticallyCenteredModal(props) {
	const [state, setState] = useState({
		agreedYtTerms: false,
		url: null,
		caption: null,
		loading: null
	});

	const { agreedYtTerms, url, caption, loading } = state;

	const changeState = newState =>
		setState(prevState => ({ ...prevState, ...newState }));

	const urlHandler = url => {
		const valid = matchYoutubeUrl(url);
		if (!valid) {
			changeState({ url: null });
			document.getElementById('urlId').innerHTML =
				'Please Enter a Valid YouTube video Url.';
			return;
		}
		changeState({ url });
		document.getElementById('urlId').innerHTML = '';
	};

	const captionHandler = caption => {
		if (caption.length === 0) {
			changeState({ caption: null });
			document.getElementById('captionId').innerHTML =
				'Please Enter a Valid Caption.';
		} else {
			changeState({ caption });
			document.getElementById('captionId').innerHTML = '';
		}
	};

	const sendUrlHandler = async () => {
		changeState({ loading: true });
		await api.sendYouTubeUrl({ url, caption });
		changeState({ loading: null });
		props.onHide();
		window.location.reload();
	};

	return (
		<Modal
			{...props}
			size='lg'
			aria-labelledby='contained-modal-title-vcenter'
			centered>
			<Modal.Header closeButton>
				<Modal.Title id='contained-modal-title-vcenter'>
					YouTube™️ importer
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<br />
				<p className='small'>
					Copy and paste a web link to your desired YouTube video to add it to
					your Channel. If your YouTube video is long-form we will condense it
					into a short Web Story on the next page.
				</p>
				<br />
				<Row>
					<Col md={8}>
						<Form>
							<Form.Group className='mb-3'>
								<Form.Label>Caption</Form.Label>
								<Form.Control
									type='text'
									onChange={e => captionHandler(e.target.value)}
								/>
								<Form.Text className='text-danger' id='captionId' />
							</Form.Group>
						</Form>
					</Col>
				</Row>
				<Row>
					<Col md={8}>
						<Form>
							<Form.Group className='mb-3'>
								<Form.Label>Link to your YouTube video</Form.Label>
								<Form.Control
									type='url'
									placeholder='https://www.youtube.com/watch?v=TYMsAYAx5Z0'
									onChange={e => urlHandler(e.target.value)}
								/>

								<Form.Text className='text-danger' id='urlId' />
							</Form.Group>
						</Form>
					</Col>
				</Row>

				<br />
				<Row>
					<Col md={7} className='d-flex'>
						<Form.Check
							aria-label='option 1'
							onClick={() => changeState({ agreedYtTerms: !agreedYtTerms })}
						/>
						<p className='small'>
							By checking this box, you agree to our Terms and Policies and own
							the rights to this YouTube video.
						</p>
					</Col>
				</Row>
				<br />
			</Modal.Body>
			<Modal.Footer>
				{!loading && (
					<Fragment>
						{' '}
						<button
							type='button'
							onClick={props.onHide}
							className='btn btn-light'>
							Close
						</button>
						<Button
							onClick={sendUrlHandler}
							disabled={agreedYtTerms && url && caption ? false : true}>
							Submit
						</Button>
					</Fragment>
				)}
				{loading && <Spinner />}
			</Modal.Footer>
		</Modal>
	);
}

const AllVideos = ({ formSubmit }) => {
	const [state, setState] = useState({
		showModal: false,
		videos: [],
		loading: true
	});

	const { showModal, videos, loading } = state;

	const changeState = newState =>
		setState(prevState => ({ ...prevState, ...newState }));

	const getVideos = useCallback(async () => {
		changeState({ loading: true });
		const response = await axios({
			url: `${baseUrl}/video_converted/view_videos`,
			method: 'GET',
			headers: {
				'Access-Control-Allow-Origin': '*'
			}
		});
		if (response.status === 200)
			changeState({
				videos: response.data,
				loading: false
			});
	}, []);

	useEffect(() => {
		getVideos();
	}, [getVideos, formSubmit]);

	return (
		<Fragment>
			<Container className='my-5 m-auto' style={{ maxWidth: '37rem' }}>
				<div className='d-flex justify-content-between'>
					<h1>All Videos</h1>
					<Dropdown>
						<Dropdown.Toggle bsPrefix='noicon' variant='light text-black'>
							<i className='fa fa-ellipsis-v' aria-hidden='true' />
						</Dropdown.Toggle>

						<Dropdown.Menu>
							<Dropdown.Item href='#/action-2' className='small'>
								Upload Video
							</Dropdown.Item>
							<Dropdown.Item
								onClick={() => changeState({ showModal: true })}
								className='small'>
								Upload Video by You Tube
							</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
					<MyVerticallyCenteredModal
						show={showModal}
						onHide={() => changeState({ showModal: false })}
					/>
				</div>
				<hr />
				{!loading && (
					<Row sm={2} md={3}>
						{videos.map(video => {
							return (
								<Col className='p-2' key={video._id}>
									<RenderVideoCard video={video} />
								</Col>
							);
						})}
					</Row>
				)}
				{loading && <Spinner value={'Loadding...'} />}
			</Container>
		</Fragment>
	);
};

export default AllVideos;
