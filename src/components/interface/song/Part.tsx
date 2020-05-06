import * as React from 'react';
import Part from '../../../models/business/Part';
import ChordComponent from '../atoms/Chord';
import { StyleSheet, css } from 'aphrodite';
import Line from '../../../models/business/Line';

interface PartProps {
	content: Part;
}

const PartComponent: React.FunctionComponent<PartProps> = (props: PartProps) => {
	
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

export default PartComponent;