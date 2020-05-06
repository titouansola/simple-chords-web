import Song from '../business/Song';

export default interface SongState {
	list: Song[];
	current: Song;
}