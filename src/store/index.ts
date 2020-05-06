import { createContext, useContext } from 'react';
import State from '../models/applicative/State';
import { Action } from '../models/applicative/Action';

export const AppContext = createContext<[State, React.Dispatch<Action>]>([null, null]);

export function useAppState() {
	return useContext(AppContext);
}