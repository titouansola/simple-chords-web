import axios from 'axios';
import qs from 'querystring';
import Song from '@scw/models/business/Song';

export function fetchAllSongs(query: {title?: string, author?: string, instrument?: string, page?: number}) {
	const cleanQuery = Object
		.entries(query || {})
		.reduce((q, [key, value]) => !!value ? Object.assign(q, { [key]: value }) : q, {});

	return axios.get(`${process.env.API_URL}/song/all?${qs.stringify(cleanQuery)}`)
		.then(response => response.data);
}

export function fetchSong(songId: number) {
	return axios.get(`${process.env.API_URL}/song/${songId}`)
		.then(response => response.data);
}

export function publishSong(song: Song) {
	return axios.post(`${process.env.API_URL}/song`, song);
}