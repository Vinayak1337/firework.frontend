import axios from 'axios';
import qs from 'qs';
import { useEffect } from 'react';
// const callApiFile = async (url, data, method = "GET") => {
//   try {
//     const response = await axios({
//       url,
//       data:(data),
//       method,
//       headers: {
//         "Content-Type": "multipart/form-data",
//         "Access-Control-Allow-Origin":"*",
//       },
//     });
//     return response.data;
//   } catch (err) {
//     console.log(err);
//     return err;
//   }
// };
const callApi = async (url, data = null, method = 'GET') => {
	try {
		const response = await axios({
			url,
			data: qs.stringify(data),
			method,
			headers: {
				'Access-Control-Allow-Origin': '*'
			}
		});
		return response.data;
	} catch (err) {
		console.log(err);
		return err;
	}
};

export const baseUrl = 'https://firework-backend.onrender.com';

const Api = {
	sendYouTubeUrl: data => callApi(`${baseUrl}/youtube/post`, data, 'POST'),
	addOverlay: data => callApi(`${baseUrl}/layout/add`, data, 'POST'),
	deleteVideo: url => callApi(`${baseUrl}/delete/video`, url, 'POST')
};

// export const baseUrl = 'http://localhost:5000';

export const useLogger = (...values) => {
	useEffect(() => {
		console.log(...values);
	}, [values]);
};

export default Api;
