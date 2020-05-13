import { createContext, useContext } from 'react';
import { State, Action } from '@scw/models';

export const AppContext = createContext<[State, React.Dispatch<Action>]>([null, null]);

export function useAppState() {
	return useContext(AppContext);
}