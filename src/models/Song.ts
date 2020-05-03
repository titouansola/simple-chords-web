import Part from "./Part";

export default interface Song {
	title: string,
	author: string,
	capodastrePosition: number,
	tuning: string,
	instrument: string,
	parts: Array<Part>
}