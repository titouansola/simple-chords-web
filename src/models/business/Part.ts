import Line from './Line';

export enum PartType {
	CHORUS = 'chorus',
	VERSE = 'verse',
	BRIDGE = 'bridge'
};

export default interface Part {
	type: PartType;
	lines: Array<Line>;
};