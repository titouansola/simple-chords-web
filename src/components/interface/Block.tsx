import * as React from 'react';
import Part from '../../models/Part';
import ChordComponent from './Chord';

interface BlockProps {
	block: Part;
}

const BlockComponent: React.FunctionComponent<BlockProps> = (props: BlockProps) => {
	
	return <div style={{position: "relative"}}>
		<pre className={'text-block'}>
			{props.block.lines.map(({ text }) => text).join('\n')}
		</pre>
		{props.block.lines.map(({ chords }) => chords).map((chordLines, index) => {
			return chordLines.map((chord, key) => <ChordComponent key={key} chord={chord} lineIndex={index}/>)
		})}
	</div>
};

export default BlockComponent;