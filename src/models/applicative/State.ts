import SongState from './SongState';
import CreatorState from './CreatorState';

export default interface State {
	song: SongState;
	creator: CreatorState;
}