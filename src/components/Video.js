import { Card } from 'react-bootstrap';
import { useState } from 'react';
import OverlayModal from './modals/Overlay.video';
import { useSelector } from 'react-redux';
import { baseUrl } from '../api/index';
import { useHistory } from 'react-router-dom';
import Overlay from './video/overlay.video';
import classes from '../Assets/css/video.module.css';
import axios from 'axios';

const Video = () => {
	const history = useHistory();
	const [modalShow, setModalShow] = useState(false);
	const video = useSelector(state => state.singleVideo);

	const fullScreen = () => {
		document.getElementById('singleVideo').webkitEnterFullScreen();
	};

	const deleteVideo = async id => {
		await axios({
			url: `${baseUrl}/video_converted/delete_video/${id}`,
			method: 'DELETE',
			headers: {
				'Access-Control-Allow-Origin': '*'
			}
		});

		history.replace('/');
	};

	return (
		<Card style={{ maxWidth: '700px' }} className='mt-5 m-auto border-0'>
			<div className='d-inline-flex'>
				<div
					className='d-flex border'
					style={{
						overflow: 'hidden',
						width: '258px',
						height: '480px',
						borderRadius: '15px',
						position: 'relative',
						zIndex: 1
					}}>
					<video
						controls
						width='270'
						height='480'
						autoPlay
						loop
						id='singleVideo'>
						<source src={video.url} type='video/mp4' />
						<source src={video.url} type='video/ogg' />
						Your browser does not support the video tag.
					</video>
				</div>
				<div className={classes.overlay}>
					<Overlay video={video} />
				</div>
				<div>
					<h1 className='ms-5 text-muted'>{video.name}</h1>
					<br />
					<button
						type='button'
						className='btn btn-secondary ms-5'
						onClick={fullScreen}>
						View
					</button>
					<br />
					<br />
					<button
						type='button'
						className='btn btn-dark ms-5'
						onClick={() => setModalShow(true)}>
						Edit Overlay
					</button>
				</div>
				<OverlayModal show={modalShow} onHide={() => setModalShow(false)} />
			</div>
			<br />
			<br />
			<button
				type='button'
				className='btn btn-danger btn-block'
				onClick={deleteVideo.bind(null, video._id)}>
				Delete Video
			</button>
		</Card>
	);
};
export default Video;
