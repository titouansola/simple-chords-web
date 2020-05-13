import { ActionType } from '../enum';

export default interface Action {
	type: ActionType;
	payload?: any;
}
