import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import { useState, Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Spinner from '../spinner';
import axios from 'axios';
import { baseUrl } from '../../api';

function OverlayModal(props) {
	const [reqProcessing, setReqProcessing] = useState(null);
	const [textCaption, setTextCaption] = useState(null);
	const [fontSize, setFontSize] = useState(20);
	const [color, setColor] = useState('#000000');
	const video = useSelector(state => state.singleVideo);
	const history = useHistory();

	useEffect(() => {
		const { caption, captionFontColor, captionFontSize } = video;
		setTextCaption(caption);
		setFontSize(captionFontSize);
		setColor(captionFontColor);
	}, [video]);

	const editCaption = async () => {
		setReqProcessing(true);
		await axios.post(`${baseUrl}/video_converted/view_video/${video.id}`, {
			caption: {
				text: textCaption,
				color,
				size: fontSize
			},
			fw: true
		});
		setReqProcessing(false);
		history.replace('/');
	};

	return (
		<Modal
			{...props}
			size='lg'
			aria-labelledby='contained-modal-title-vcenter'
			centered>
			<Modal.Header closeButton>
				<Modal.Title id='contained-modal-title-vcenter'>
					Video Overlays
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<br />
				<br />
				<Row>
					<Col md={{ span: 8, offset: 2 }}>
						<Form>
							<Form.Group className='mb-3'>
								<Form.Label>Caption</Form.Label>
								<Form.Control
									value={textCaption}
									type='text'
									onChange={e => setTextCaption(e.target.value)}
								/>
								<Form.Text className='text-danger' id='captionId'></Form.Text>
							</Form.Group>
						</Form>
					</Col>
				</Row>
				<Row>
					<Col md={{ span: 2, offset: 4 }}>
						<Form>
							<Form.Group className='mb-3'>
								<Form.Label>Font Size</Form.Label>
								<Form.Control
									type='number'
									defaultValue='20'
									min='0'
									max='99'
									value={fontSize}
									onChange={e => setFontSize(e.target.value)}
								/>
								<Form.Text
									className='text-danger text-small'
									id='fontSizeId'></Form.Text>
							</Form.Group>
						</Form>
					</Col>
					<Col md={{ span: 2, offset: 1 }}>
						<Form>
							<Form.Group className='mb-3'>
								<Form.Label htmlFor='exampleColorInput'>
									Choose Color
								</Form.Label>
								<Form.Control
									value={color}
									type='color'
									id='exampleColorInput'
									defaultValue='#000000'
									title='Choose your color'
									className='mt-2 w-50 rounded-circle'
									onChange={e => {
										setColor(e.target.value);
									}}
								/>
							</Form.Group>
						</Form>
					</Col>
				</Row>
			</Modal.Body>
			<Modal.Footer>
				<Fragment>
					{!reqProcessing && (
						<Fragment>
							{' '}
							<Button onClick={props.onHide} className='btn btn-light'>
								Close
							</Button>
							<Button
								onClick={editCaption}
								disabled={!(textCaption && fontSize)}>
								Save
							</Button>
						</Fragment>
					)}
					{reqProcessing && <Spinner />}
				</Fragment>
			</Modal.Footer>
		</Modal>
	);
}
export default OverlayModal;
