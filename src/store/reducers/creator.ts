import { Action } from '../../models/applicative/Action';
import lo from 'lodash';
import ActionTypes from '../../models/enum/ActionTypes';
import CreatorState from '../../models/applicative/CreatorState';

const initialState: CreatorState = {
	current: {
		author: '',
		title: '',
		instrument: '',
		tuning: '',
		capodastrePosition: 0,
		parts: []
	}
};

export default (state = initialState, action: Action) => {
	const current = lo.cloneDeep(state.current);

	switch (action.type) {
		// SONG INFO ACTIONS
		case ActionTypes.UPDATE_SONG_INFO:
			return {
				...state,
				current: Object.assign(current, action.payload)
			};

		// PART ACTIONS
		case ActionTypes.ADD_SONG_PART:
			current.parts.push(action.payload);
			return { ...state, current };

		case ActionTypes.DEL_SONG_PART:
			current.parts.splice(action.payload.partIndex, 1);
			return { ...state, current };

		case ActionTypes.DUPLICATE_SONG_PART:
			current.parts.splice(action.payload.partIndex, 0,
				lo.cloneDeep(current.parts[action.payload.partIndex]));
			return { ...state, current };

		case ActionTypes.ORDER_SONG_PART:
			const index = action.payload.partIndex;
			const neighborIndex = index + action.payload.direction;
			// 2. replace selected by neighbor
			current.parts.splice(index, 1, 
				// 1. replace neighbor by selected
				...current.parts.splice(neighborIndex, 1, current.parts[index])
			);
			return { ...state, current };

		case ActionTypes.UPDATE_PART_TYPE:
			current
				.parts[action.payload.partIndex]
				.type = action.payload.type;
			return { ...state, current };


		// LINE ACTIONS
		case ActionTypes.ADD_PART_LINE:
			current
				.parts[action.payload.partIndex]
				.lines
				.push(action.payload.line);
			return { ...state, current };

		case ActionTypes.DEL_PART_LINE:
			current
				.parts[action.payload.partIndex]
				.lines
				.splice(action.payload.lineIndex, 1);
				return { ...state, current };

		case ActionTypes.UPDATE_TEXT_LINE:
			current
				.parts[action.payload.partIndex]
				.lines[action.payload.lineIndex]
				.text = action.payload.text;
			return { ...state, current };
		
		// CHORD ACTIONS
		case ActionTypes.ADD_CHORD:
			current
				.parts[action.payload.partIndex]
				.lines[action.payload.lineIndex]
				.chords.push(action.payload.chord);
			return { ...state, current };

		case ActionTypes.DEL_CHORD:
			current
				.parts[action.payload.partIndex]
				.lines[action.payload.lineIndex]
				.chords.splice(action.payload.chordIndex, 1);
			return { ...state, current };

		case ActionTypes.UPDATE_CHORD:
			current
				.parts[action.payload.partIndex]
				.lines[action.payload.lineIndex]
				.chords.splice(action.payload.chordIndex, 1, action.payload.chord);
			return { ...state, current };

		default:
			return state;
	}
}