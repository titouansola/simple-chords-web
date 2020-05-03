import { createContext, useContext } from 'react';
import reducers from './reducers';
import State from './types';

export interface Action {
	type: string,
	payload?: any
}

export const appStateReducer = (state: State, action: Action): State => {
	console.log(`Action: ${action.type}, payload:`, action.payload || 'None');
	console.log('prev state:', state);
	
	const newState: State = Object.entries(reducers).reduce(
		(computing, [name, reducer]) => ({
			...computing,
			[name]: reducer(state[name], action)
		}),
		state);
	
	console.log('next state:', newState);
	
	return newState;
}

export const AppContext = createContext<[State, React.Dispatch<Action>]>([new State(), null]);

export function useAppState() {
	return useContext(AppContext);
}