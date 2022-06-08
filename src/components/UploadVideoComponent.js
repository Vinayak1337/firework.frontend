import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Spinner from './spinner';
import { baseUrl } from '../api';
const UploadVideo = ({ setFormSubmit }) => {
	const history = useHistory();
	const [videoName, setVedioName] = useState(null);
	const [videoFile, setVedioFile] = useState(null);
	const [spinner, setSpinner] = useState(null);
	const [caption, setCaption] = useState({
		text: '',
		color: '#000000',
		size: 18
	});

	const fileHandler = file => {
		setVedioFile(file);
		document.getElementById('fileSpan').innerHTML = '';
	};

	const formSubmitHandler = async e => {
		e.preventDefault();
		setSpinner(true);
		console.log('Api Calling');
		let formData = new FormData();
		formData.append('video', videoFile);
		formData.append('name', videoName);
		formData.append('caption', caption);

		const response = await axios({
			url: `${baseUrl}/video_converted/upload_video`,
			data: formData,
			method: 'POST',
			headers: {
				'Content-Type': 'multipart/form-data',
				'Access-Control-Allow-Origin': '*'
			}
		});

		if (response.data === 'Please Upload 6-60 sec videos...') {
			document.getElementById('fileSpan').innerHTML =
				'Please Upload 6-60 sec video...';
			setVedioFile(null);
			setSpinner(false);
		} else if (response.status === 200) {
			console.log(`Its working`);
			setFormSubmit(true);
			setSpinner(false);
			history.replace('/');
		}
	};
	return (
		<Container>
			<Card
				className='m-auto'
				style={{ maxWidth: '45rem', display: 'fixed', top: '100px' }}>
				<Card.Body>
					<Form>
						<Row>
							<Col md={4}>
								<div className='text-center border rounded'>
									<i
										className='fa fa-upload fa-3x text-primary m-2'
										aria-hidden='true'></i>
									<h4>upload Here</h4>
									<label htmlFor='uploadVideo'>
										<div className='btn btn-secondary'>Choose Video</div>
									</label>
									<input
										type='file'
										className='form-control'
										id='uploadVideo'
										name='video'
										onChange={e => fileHandler(e.target.files[0])}
										accept='video/*'
										hidden
									/>

									<p
										className='text-danger text-center text-sm'
										id='fileSpan'></p>
									<hr />
									<div className='small text-start ms-3'>
										<span>Upload Guidlines</span>
										<ul className='ps-3'>
											<li>Video length: 06-60sec</li>
											<li>MP4 format supported</li>
											<li>Video ratio 9:16</li>
										</ul>
									</div>
								</div>
							</Col>
							<Col md={8}>
								<div className=''>
									<h4>Video Details</h4>
									<hr />
									<Form.Group className='mb-3 mt-4' controlId='formBasicEmail'>
										<Form.Label>
											Video Name <span className='text-danger'>*</span>
										</Form.Label>
										<Form.Control
											type='text'
											onChange={e => setVedioName(e.target.value)}
										/>
									</Form.Group>
									<Form.Group className='mb-3 mt-4' controlId='formBasicEmail'>
										<Form.Label>
											Caption <span className='text-danger'>*</span>
										</Form.Label>
										<Form.Control
											type='text'
											value={caption.text}
											style={{
												fontSize: `${caption.size}px`,
												color: caption.color
											}}
											onChange={e =>
												setCaption(prevCaption => ({
													...prevCaption,
													text: e.target.value
												}))
											}
										/>
									</Form.Group>
									<Form.Group className='mb-3 mt-4' controlId='formBasicEmail'>
										<Form.Label>
											Color <span className='text-danger'>*</span>
										</Form.Label>
										<Form.Control
											type='color'
											onChange={e =>
												setCaption(prevCaption => ({
													...prevCaption,
													color: e.target.value
												}))
											}
										/>
									</Form.Group>
									<Form.Group className='mb-3 mt-4' controlId='formBasicEmail'>
										<Form.Label>
											Size <span className='text-danger'>*</span>
										</Form.Label>
										<Form.Control
											type='text'
											value={caption.size}
											onChange={e =>
												setCaption(prevCaption => ({
													...prevCaption,
													size: e.target.value
												}))
											}
										/>
									</Form.Group>
									<div className='text-end'>
										<Button
											variant='primary'
											disabled={
												videoName &&
												videoFile &&
												caption.text &&
												caption.size
													? false
													: true
											}
											onClick={e => formSubmitHandler(e)}>
											Upload
										</Button>
									</div>
									{spinner && <Spinner value={'Uploadding...'} />}
								</div>
							</Col>
						</Row>
					</Form>
				</Card.Body>
			</Card>
		</Container>
	);
};

export default React.memo(UploadVideo);
