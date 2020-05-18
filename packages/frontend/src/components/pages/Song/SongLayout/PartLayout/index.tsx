import * as React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Part, Line } from '@scw/models';
import ChordComponent from './Chord';

interface PartProps {
	content: Part;
}

const PartLayout: React.FunctionComponent<PartProps> = (props: PartProps) => {
	
	return <div style={{position: "relative"}}>
		{
			props.content.lines.map((line: Line, lineKey) => (
				<React.Fragment key={lineKey}>
					<div className={css(styles.chordContainer)}>
						{line.chords.map((chord, key) => <ChordComponent key={key} chord={chord}/>)}
					</div>
					<pre className={css(styles.text)}>{line.text}</pre>
				</React.Fragment>
			))
		}
	</div>
};

const styles = StyleSheet.create({
	chordContainer: {
		position: 'relative',
		height: 21
	},
	text: {
		margin: '0 0 10px 0',
	}
});

export default PartLayout;