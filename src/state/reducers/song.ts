import { Action } from '../';
import SongState from '../types/song';

export default (state: SongState, action: Action): SongState => {
	switch (action.type) {
		default:
			return state;
	}
}