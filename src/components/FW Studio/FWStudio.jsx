import React, { useCallback, useEffect, useState } from 'react';
import { Container, Dropdown, ModalFooter, Row } from 'react-bootstrap';
import LoadingSpinner from '../spinner';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { singleVideoAction } from '../../store/single.redux';
import {
	UploadBox,
	UploadBoxContent,
	UploadBoxTitle,
	PrevPrjWrapper,
	PrevPrjImg,
	UploadShowPopup,
	ModalContainer,
	UploadedImageWrapper,
	ModalFtrWrapper,
	ModalFtrBtn
} from './FWStudio.styled';
import { baseUrl } from '../../api';

const FWStudio = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const [state, setState] = useState({
		showPopup: '',
		images: [],
		loading: false,
		rawImages: [],
		resImagesId: '',
		converting: false,
		isValid: true,
		videos: [],
		name: '',
		caption: {
			text: null,
			color: '#000000',
			size: 18
		},
		loop: 2.5
	});

	const {
		showPopup,
		images,
		loading,
		rawImages,
		resImagesId,
		converting,
		videos,
		caption,
		name,
		isValid,
		loop
	} = state;

	useEffect(() => {
		changeState({ loop: images.length * 2.5 });
	}, [images.length]);

	const changeState = newState =>
		setState(prevState => ({ ...prevState, ...newState }));

	const togglePopup = value => changeState({ showPopup: value });

	const handleInputChange = event =>
		changeState({ rawImages: event.target.files });

	const uploadImages = useCallback(async () => {
		if (!rawImages.length) return;
		changeState({ loading: true });
		const formData = new FormData();

		for (const image of rawImages) formData.append('file', image);

		const res = await axios.post(`${baseUrl}/upload_img`, formData);

		if (res.status < 300)
			return changeState({
				resImagesId: res.data[0]._id,
				images: res.data[0].upload,
				loading: false
			});
		changeState({ loading: false });
	}, [rawImages]);

	useEffect(() => {
		if (name && caption.text && caption.size) changeState({ isValid: true });
		else changeState({ isValid: false });
	}, [caption.size, caption.text, name]);

	useEffect(() => {
		uploadImages();
	}, [uploadImages]);

	const getImages = async id => {
		const res = await axios.get(`${baseUrl}/view_image/${id}`);

		console.log(res.data);
		if (res.status === 200)
			changeState({
				resImages: res.data.data,
				images: res.data.data.upload,
				loading: false
			});
	};

	const deleteImage = async index => {
		changeState({ loading: true });
		const res = await axios.get(
			`${baseUrl}/delete_img/${resImagesId}?index=${index}`
		);

		if (res.status === 200) getImages(resImagesId);
		else changeState({ loading: false });
	};

	const getVideos = useCallback(async () => {
		const res = await axios.get(`${baseUrl}/video_converted/view_videos`);

		if (res.status === 200)
			changeState({
				videos: res.data.filter(video => video.videoUrl && video.fw)
			});
	}, []);

	useEffect(() => {
		getVideos();
	}, [getVideos]);

	const convertVideo = async () => {
		changeState({ converting: true });

		console.log(loop);
		setTimeout(() => {
			history.replace('/');
			changeState({ converting: false });
		}, 180000);

		await axios.post(
			`${baseUrl}/video_converted/converstion`,
			{
				images: resImagesId,
				name,
				thumbnail: images[0],
				caption,
				loop,
				fw: true
			},
			{ timeout: 300000 }
		);

		history.replace('/');
		changeState({ converting: false });
	};

	const deleteVideo = async id => {
		await axios({
			url: `${baseUrl}/video_converted/delete_video/${id}`,
			method: 'DELETE',
			headers: {
				'Access-Control-Allow-Origin': '*'
			}
		});

		window.location.reload();
	};

	const imageOpen = (
		imageUrl,
		movieName,
		caption,
		captionFontSize,
		captionFontColor
	) => {
		dispatch(
			singleVideoAction.setSingleVideo({
				name: movieName,
				url: imageUrl,
				caption,
				captionFontSize,
				captionFontColor
			})
		);
		history.replace('/singleVideo');
	};

	return (
		<Container>
			<Row style={{ justifyContent: 'space-around' }}>
				<div className='col-md-3'>
					<UploadBoxTitle className='text-center'>
						Start from scratch
					</UploadBoxTitle>
					<UploadBox>
						<UploadBoxContent
							className='text-center'
							color={caption.color}
							size={caption.size}>
							<div className='video_name'>
								<p>Video Name</p>
								<input
									type='text'
									value={name}
									onChange={e => changeState({ name: e.target.value })}
								/>
							</div>
							<div className='info_box'>
								<div className='info'>
									<label htmlFor='name'>Caption</label>
									<textarea
										className='name'
										type='text'
										value={caption.text}
										onChange={e =>
											changeState({
												caption: { ...caption, text: e.target.value }
											})
										}
									/>
								</div>
								<div className='info'>
									<label htmlFor='name'>Color</label>
									<input
										type='color'
										value={caption.color}
										onChange={e =>
											changeState({
												caption: { ...caption, color: e.target.value }
											})
										}
									/>
								</div>
								<div className='info'>
									<label htmlFor='name'>Size</label>
									<input
										type='text'
										value={caption.size}
										onChange={e =>
											changeState({
												caption: { ...caption, size: e.target.value }
											})
										}
									/>
								</div>
							</div>
							<i className='fa fa-picture-o fa-3x m-2' aria-hidden />
							<h5>Upload here</h5>
							<label htmlFor='uploadVideo'>
								<button
									className='fw-btn fw-btn-primary'
									onClick={togglePopup.bind(null, 'true')}
									disabled={!isValid}>
									<i className='fa fa-cloud-upload' aria-hidden />
									&nbsp; {images.length ? 'Change' : 'Choose'} File
								</button>
							</label>
							<input
								type='file'
								className='form-control'
								name='video'
								id='uploadVideo'
								accept='video/*'
								hidden
							/>
						</UploadBoxContent>
					</UploadBox>
				</div>
				<UploadBoxTitle as={'div'} className='col-md-8'>
					<p>&nbsp;&nbsp;Previous Projects</p>
					<PrevPrjWrapper>
						{videos.map((video, i) => (
							<PrevPrjImg
								onClick={() =>
									imageOpen(
										video.videoUrl,
										video.name,
										video.caption.text,
										video.caption.size,
										video.caption.color
									)
								}>
								<div className='menu'>
									<Dropdown className='override-dropdown' size='small'>
										<Dropdown.Toggle bsPrefix='noicon override-btn'>
											<i class='fa fa-ellipsis-h' aria-hidden='true'></i>
										</Dropdown.Toggle>
										<Dropdown.Menu className='dropdown-menu'>
											<Dropdown.Item
												className='small'
												onClick={deleteVideo.bind(null, video._id)}>
												Delete
											</Dropdown.Item>
										</Dropdown.Menu>
									</Dropdown>
								</div>
								<img src={video.thumbnail} alt='' />
							</PrevPrjImg>
						))}
					</PrevPrjWrapper>
				</UploadBoxTitle>
				<UploadShowPopup show={showPopup}></UploadShowPopup>
				<ModalContainer
					show={showPopup}
					role='dialog'
					aria-modal
					tabIndex='-1'
					aria-labelledby='upload-modal'>
					<div className='modal-dialog' show={showPopup}>
						<div className='modal-content'>
							<div className='modal-header'>
								<div className='title'>Add Images</div>
								<button
									className='close-btn'
									type='button'
									onClick={togglePopup.bind(null, '')}>
									<span aria-hidden>X</span>
									<span className='sr'>Close</span>
								</button>
							</div>
							<div className='modal-body'>
								<Row>
									{loading && <LoadingSpinner />}
									<div className='modal-wrapper'>
										<div className='upload-box'>
											<div>
												<i className='icon' aria-hidden></i>
												<h6>Upload Here</h6>
												<input
													className='upload-form'
													type='file'
													name='image'
													id='image'
													accept='image/*'
													multiple
													disabled={loading}
													onChange={handleInputChange}
												/>
											</div>
										</div>
										{images.map((url, i) => (
											<UploadedImageWrapper>
												<i
													className='fa fa-trash-o menu'
													aria-hidden='true'
													onClick={deleteImage.bind(null, i)}></i>
												<i aria-hidden='true'></i>
												<img
													alt=''
													key={`prevImg${i}`}
													src={url}
													className='mdl-ftr-prv-img'
												/>
											</UploadedImageWrapper>
										))}
									</div>
								</Row>
							</div>
							{images.length > 1 && (
								<ModalFooter>
									<ModalFtrWrapper />
									<ModalFtrBtn disabled={converting} onClick={convertVideo}>
										Create Video
									</ModalFtrBtn>
									{converting && (
										<>
											<p>Takes around 2-4 minutes to convert</p>
											<LoadingSpinner />
										</>
									)}
								</ModalFooter>
							)}
						</div>
					</div>
				</ModalContainer>
			</Row>
		</Container>
	);
};

export default FWStudio;
