import Line from './Line';
import { PartType } from '../enum';

export default interface Part {
	type: PartType;
	lines: Array<Line>;
};