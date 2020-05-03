import * as React from 'react';
import { getChordPosition, Chord, chordTostring } from '../../models/Chord';

interface ChordProps {
	chord: Chord,
	lineIndex: number
}

const ChordComponent: React.FunctionComponent<ChordProps> = (props: ChordProps) => {
	const style: React.CSSProperties = {
		position: 'absolute',
		left: getChordPosition(props.chord),
		top: `${props.lineIndex * 50}px`
	};
	return <div style={style}>{chordTostring(props.chord)}</div>
};

export default ChordComponent;