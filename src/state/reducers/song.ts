import { Action } from '../';
import SongState from '../types/song';
import ActionTypes from '../actionTypes';
import Song from '../../models/Song';

const initialState: SongState = {
	current: null
}

export default (state = initialState, action: Action): SongState => {
	switch (action.type) {
		case ActionTypes.FETCH_SONG:
			return {
				...state,
				current: action.payload as Song
			};

		default:
			return state;
	}
}