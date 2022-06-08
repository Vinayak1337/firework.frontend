import axios from 'axios';
import { Card, Dropdown } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { baseUrl } from '../api';
import { singleVideoAction } from '../store/single.redux';
const RenderVideoCard = ({ video }) => {
	const dispatch = useDispatch();
	const history = useHistory();

	const imageOpen = (
		id,
		imageUrl,
		movieName,
		caption,
		captionFontSize,
		captionFontColor
	) => {
		dispatch(
			singleVideoAction.setSingleVideo({
				id,
				name: movieName,
				url: imageUrl,
				caption,
				captionFontSize,
				captionFontColor
			})
		);
		history.replace('/singleVideo');
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

	return (
		<Card style={{ maxWidth: '20rem' }} className='border-0'>
			<div
				className='d-flex'
				key={video._id}
				style={{ overflow: 'hidden', borderRadius: '15px', cursor: 'pointer' }}
				onClick={() =>
					imageOpen(
						video._id,
						video.videoUrl,
						video.name,
						video.caption.text,
						video.caption.size,
						video.caption.color
					)
				}>
				{video.thumbnail ? (
					<Card.Img
						variant='top'
						width='100%'
						src={video.thumbnail}
						alt='Video Thumbnail'
						className='m-auto'
					/>
				) : (
					<video
						variant='top'
						width='100%'
						alt='Video Thumbnail'
						className='m-auto'
						src={video.videoUrl}
					/>
				)}
			</div>
			<Card.Body>
				<Card.Title className='d-flex justify-content-between align-items-center'>
					<h4 className='m-0'>{video.name}</h4>
					<Dropdown>
						<Dropdown.Toggle bsPrefix='noicon' variant='light text-black'>
							<i className='fa fa-ellipsis-v' aria-hidden='true' />
						</Dropdown.Toggle>

						<Dropdown.Menu>
							<Dropdown.Item href={video.videoUrl} download>
								Download
							</Dropdown.Item>
							<Dropdown.Item onClick={deleteVideo.bind(null, video._id)}>
								Delete
							</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</Card.Title>
			</Card.Body>
		</Card>
	);
};

export default RenderVideoCard;
