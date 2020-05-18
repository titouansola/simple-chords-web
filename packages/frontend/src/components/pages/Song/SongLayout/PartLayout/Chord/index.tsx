import * as React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Chord } from '@scw/models';
import { getChordPosition, chordTostring } from '@scw/utils';

interface ChordProps {
	chord: Chord;
	lineIndex?: number;
}

const ChordComponent: React.FunctionComponent<ChordProps> = (props: ChordProps) => {
	const styles = StyleSheet.create({
		chord: {
			position: 'absolute',
			left: getChordPosition(props.chord),
			padding: '0 3px',
			margin: 0
		}
	});
	return <pre className={css(styles.chord) + ' chord'}>{chordTostring(props.chord)}</pre>
};


export default ChordComponent;