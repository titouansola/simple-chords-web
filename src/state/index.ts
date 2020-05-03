import { createContext, useContext } from 'react';
import reducers from './reducers';
import State from './types';
import { Action } from './actionTypes';

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

export const AppContext = createContext<[State, React.Dispatch<Action>]>([null, null]);

export function useAppState() {
	return useContext(AppContext);
}