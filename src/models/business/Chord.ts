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

export interface Chord {
	position: number;
	fondamental: Fondamental;
	minor: boolean;
	qualities: string;
}

export function chordTostring(chord: Chord) {
	const minorAnnotation = chord.minor ? 'm' : ''
	return `${chord.fondamental}${minorAnnotation}${chord.qualities || ''}`;
}

export function getChordPosition(chord: Chord) {
	return chord.position + 'px';
}