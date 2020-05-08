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
		case ActionTypes.CREATOR_FLUSH:
			return initialState;


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
			const { partIndex } = action.payload;
			const partNeighborIndex = partIndex + action.payload.direction;
			// 2. replace selected by neighbor
			current.parts.splice(partIndex, 1, 
				// 1. replace neighbor by selected
				...current.parts.splice(partNeighborIndex, 1, current.parts[partIndex])
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
				.lines.push(action.payload.line);
			return { ...state, current };

		case ActionTypes.DEL_PART_LINE:
			current
				.parts[action.payload.partIndex]
				.lines.splice(action.payload.lineIndex, 1);
				return { ...state, current };

		case ActionTypes.DUPLICATE_PART_LINE:
			const duplicatedLine = lo.cloneDeep(
				current.parts[action.payload.partIndex].lines[action.payload.lineIndex]
			);
			current
				.parts[action.payload.partIndex]
				.lines.splice(action.payload.partIndex, 0, duplicatedLine);
			return { ...state, current };

		case ActionTypes.ORDER_PART_LINE:
			const { lineIndex } = action.payload;
			const neighborIndex = lineIndex + action.payload.direction;
			const part = current.parts[action.payload.partIndex];
			part
			// 2. replace selected by neighbor
			.lines.splice(lineIndex, 1, 
				// 1. replace neighbor by selected
				...part.lines.splice(neighborIndex, 1,
					part.lines[lineIndex])
			);
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

		case ActionTypes.DUPLICATE_CHORD:
			const duplicatedChord = lo.cloneDeep(
				current.parts[action.payload.partIndex].lines[action.payload.lineIndex].chords[action.payload.chordIndex]
			);
			current
				.parts[action.payload.partIndex]
				.lines[action.payload.lineIndex]
				.chords.push(duplicatedChord);
			return { ...state, current };
		default:
			return state;
	}
}