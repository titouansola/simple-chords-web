export enum Fondamental {
	A = 'A',
	B = 'B',
	C = 'C',
	D = 'D',
	E = 'E',
	F = 'F',
	G = 'G',
	A_SHARP = 'A#',
	C_SHARP = 'C#',
	D_SHARP = 'D#',
	F_SHARP = 'F#',
	G_SHARP = 'G#',
	A_FLAT = 'Ab',
	B_FLAT = 'Bb',
	D_FLAT = 'Db',
	E_FLAT = 'Eb',
	G_FLAT = 'Gb',
};

export enum Quality {
	SEVENTH = '7',
	MAJOR_SEVENTH = 'M7',
	DIMINISHED = '°',
	SUSPENDED_FOUR = 'sus4',
	SUSPENDED_SECOND = 'sus2',
	ELEVENTH = '11',
	THIRTEENTH = '13'
	// ...
};

export interface Chord {
	position: number;
	fondamental: Fondamental,
	minor: boolean,
	qualities: Quality
}

export function chordTostring(chord: Chord) {
	const minorAnnotation = chord.minor ? 'm' : ''
	return `${chord.fondamental}${minorAnnotation}${chord.qualities}`;
}

export function getChordPosition(chord: Chord) {
	return chord.position + 'px';
}