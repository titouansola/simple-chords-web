import * as React from 'react';
import { getChordPosition, Chord, chordTostring } from '../../../models/business/Chord';
import { StyleSheet, css } from 'aphrodite';

interface ChordProps {
	chord: Chord;
	lineIndex?: number;
}

const ChordComponent: React.FunctionComponent<ChordProps> = (props: ChordProps) => {
	const styles = StyleSheet.create({
		chord: {
			position: 'absolute',
			left: getChordPosition(props.chord),
			top: `${(props.lineIndex || 0) * 50}px`,
		}
	});
	return <div className={css(styles.chord) + ' chord'}>{chordTostring(props.chord)}</div>
};


export default ChordComponent;