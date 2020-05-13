import { Action, ActionType, Song, SongState } from '@scw/models';

const initialState: SongState = {
	list: [],
	current: null
}

export default (state = initialState, action: Action): SongState => {
	switch (action.type) {
		case ActionType.FETCH_ALL_SONGS:
			return {
				...state,
				list: action.payload as Song[]
			}

		case ActionType.FETCH_SONG:
			return {
				...state,
				current: action.payload as Song
			};

		default:
			return state;
	}
}