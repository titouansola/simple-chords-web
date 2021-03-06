import Part from './Part';

export default interface Song {
	id?: number;
	title: string;
	author: string;
	capodastrePosition: number;
	tuning: string;
	instrument: string;
	parts: Array<Part>
}