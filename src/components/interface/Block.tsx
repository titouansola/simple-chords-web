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
		{props.block.lines.map(({ chordLine }) => chordLine).map((chordLines, index) => {
			return chordLines.map(chord => <ChordComponent chord={chord} lineIndex={index}></ChordComponent>)
		})}
	</div>
};

export default BlockComponent;