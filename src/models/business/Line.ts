import { Chord } from "./Chord";

export default interface Line {
	text: string;
	chords: Array<Chord>;
}