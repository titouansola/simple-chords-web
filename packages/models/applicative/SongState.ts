import { Song } from '../business';

export default interface SongState {
	list: Song[];
	current: Song;
}