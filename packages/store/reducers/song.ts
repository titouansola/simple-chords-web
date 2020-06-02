import { Action, ActionType, Song, SongState } from '@scw/models';

const initialState: SongState = {
	total: 0,
	page: 0,
	pageAmount: 0,
	fetch: true,
	filters: {
		title: '',
		author: '',
		instrument: ''
	},
	list: [],
	current: null
}

export default (state = initialState, action: Action): SongState => {
	switch (action.type) {
		case ActionType.FETCH_ALL_SONGS:
			return {
				...state,
				fetch: false,
				total: action.payload.total,
				pageAmount: action.payload.pageAmount,
				list: action.payload.songs as Song[]
			};

		case ActionType.FETCH_SONG:
			return {
				...state,
				current: action.payload as Song
			};

		case ActionType.TOGGLE_FETCHING:
			return {
				...state,
				fetch: !state.fetch
			};

		case ActionType.UPDATE_FILTER:
			return {
				...state,
				filters: {
					...state.filters,
					...action.payload
				}
			};

		case ActionType.CLEAR_FILTERS:
			return {
				...state,
				fetch: true,
				page: 0,
				filters: { ...initialState.filters }
			};

		case ActionType.CHANGE_PAGE:
			return {
				...state,
				fetch: true,
				page: action.payload	
			};

		default:
			return state;
	}
}