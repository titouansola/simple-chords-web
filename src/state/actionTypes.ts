export interface Action {
	type: ActionTypes,
	payload?: any
}

enum ActionTypes {
	FETCH_SONG = 'FETCH SONG',
}

export default ActionTypes;