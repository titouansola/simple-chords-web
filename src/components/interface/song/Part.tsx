import * as React from 'react';
import Part from '../../../models/business/Part';
import ChordComponent from '../atoms/Chord';

interface PartProps {
	content: Part;
}

const PartComponent: React.FunctionComponent<PartProps> = (props: PartProps) => {
	
	return <div style={{position: "relative"}}>
		<pre className={'text-block'}>
			{props.content.lines.map(({ text }) => text).join('\n')}
		</pre>
		{props.content.lines.map(({ chords }) => chords).map((chordLines, index) => {
			return chordLines.map((chord, key) => <ChordComponent key={key} chord={chord} lineIndex={index}/>)
		})}
	</div>
};

export default PartComponent;