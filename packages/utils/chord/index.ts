import { Chord } from '@scw/models';

export function chordTostring(chord: Chord) {
	const minorAnnotation = chord.minor ? 'm' : ''
	return `${chord.fondamental}${minorAnnotation}${chord.qualities || ''}`;
}

export function getChordPosition(chord: Chord) {
	return chord.position + 'px';
}