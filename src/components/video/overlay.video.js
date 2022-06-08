import React, { Fragment } from 'react';

const Overlay = ({ video }) => {
	let caption = `${video.caption}`;
	let fontColor = video.captionFontColor;
	let fontSize = video.captionFontSize;
	let perlineWords = caption.split(' ').length / 3;
	caption = caption.split(' ');
	let caption1, caption2, caption3;

	if (caption.length <= 3) {
		caption1 = caption.slice(0, 1) ? caption.slice(0, 1) : '';
		caption2 = caption.slice(1, 2) ? caption.slice(1, 2) : '';
		caption3 = caption.slice(2, 3) ? caption.slice(2, 3) : '';
	} else {
		caption1 = caption.slice(0, perlineWords).join(' ');
		caption2 = caption.slice(perlineWords, 2 * perlineWords).join(' ');
		caption3 = caption.slice(2 * perlineWords, caption.length).join(' ');
	}

	caption = [caption1, caption2, caption3];
	return (
		<Fragment>
			{caption.map((cap, index) => (
				<p
					key={index}
					className='p-0 m-auto text-center'
					style={{
						width: '240px',
						fontSize: `${fontSize}px`,
						color: `${fontColor}`
					}}>
					{' '}
					{cap}
				</p>
			))}
		</Fragment>
	);
};

export default Overlay;
