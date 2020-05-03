import axios from 'axios';

export function fetchSong(songId: number) {
	return axios.get(`${process.env.API_URL}/song/${songId}`)
		.then(response => response.data);
}