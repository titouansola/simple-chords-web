import { Action, State } from '@scw/models';

import song from './song';
import creator from './creator';

const reducers = {
	song,
	creator
};

export const appStateReducer = (state: State, action: Action): State => {
	console.log(`Action: ${action.type}, payload:`, action.payload || 'None');
	const prevState = { ...(state || {} as State) };
	
	console.log('prev state:', prevState);
	
	const newState: State = Object.entries(reducers).reduce(
		(computing, [name, reducer]): State => {
			return Object.assign(
				computing,
				{ [name]: reducer(prevState[name], action) }
			);
		},
		{ ...prevState });
	
	console.log('next state:', newState);
	
	return newState;
}