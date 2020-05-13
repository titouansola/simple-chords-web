import axios from 'axios';
import Song from '@scw/models/business/Song';

export function fetchAllSongs() {
	return axios.get(`${process.env.API_URL}/song/all`)
		.then(response => response.data);
}

export function fetchSong(songId: number) {
	return axios.get(`${process.env.API_URL}/song/${songId}`)
		.then(response => response.data);
}

export function publishSong(song: Song) {
	return axios.post(`${process.env.API_URL}/song`, song);
}