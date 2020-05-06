import SongState from '../../models/applicative/SongState';
import ActionTypes from '../../models/enum/ActionTypes';
import Song from '../../models/business/Song';
import { Action } from '../../models/applicative/Action';

const initialState: SongState = {
	list: [],
	current: null
}

export default (state = initialState, action: Action): SongState => {
	switch (action.type) {
		case ActionTypes.FETCH_ALL_SONGS:
			return {
				...state,
				list: action.payload as Song[]
			}

		case ActionTypes.FETCH_SONG:
			return {
				...state,
				current: action.payload as Song
			};

		default:
			return state;
	}
}