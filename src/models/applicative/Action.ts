import { ActionTypes } from '../enum/ActionTypes';
export interface Action {
	type: ActionTypes;
	payload?: any;
}
