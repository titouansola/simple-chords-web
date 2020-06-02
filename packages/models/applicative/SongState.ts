import { Song } from '../business';

export default interface SongState {
	total: number;
	page: number;
	pageAmount: number;
	fetch: boolean;
	filters: {
		title: string,
		author: string,
		instrument: string
	};
	list: Song[];
	current: Song;
}