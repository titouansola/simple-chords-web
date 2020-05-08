import * as React from 'react';
import { StyleSheet, css } from 'aphrodite';
import ChordComponent from '../atoms/Chord';	
import { Chord, chordTostring } from  '../../../models/business/Chord';
import Draggable, { DraggableData } from 'react-draggable';
import { useAppState } from '../../../store';
import ActionTypes from '../../../models/enum/ActionTypes';
import { CHORD_OFFSET } from '../../../constants';

interface Props {
	chord: Chord;
	partIndex: number;
	lineIndex:  number;
	order: number;
}

const ChordToolProvider: React.FC<Props> = (props: Props) => {
	const [_, dispatch] = useAppState();
	const [delta, setDelta] = React.useState(0);

	const onStart = (e: MouseEvent) => {
		if (e.shiftKey) {
			dispatch({
				type: ActionTypes.DUPLICATE_CHORD,
				payload: {
					partIndex: props.partIndex,
					lineIndex: props.lineIndex,
					chordIndex: props.order,
				}
			});
		}
	};

	const onDrag = (_, data: DraggableData) => {
		setDelta(delta + data.deltaX);
	};

	const onStop = () => {
		dispatch({
			type: ActionTypes.UPDATE_CHORD,
			payload: {
				partIndex: props.partIndex,
				lineIndex: props.lineIndex,
				chordIndex: props.order,
				chord: {
					...props.chord,
					position: props.chord.position + delta
				}
			}
		});
		setDelta(0);
	};

	const checkAltKeyAndDeleteChord = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		console.log(props.order, props.chord)
		if (event.altKey) {
			dispatch({
				type: ActionTypes.DEL_CHORD,
				payload: {
					partIndex: props.partIndex,
					lineIndex: props.lineIndex,
					chordIndex: props.order
				}
			});
		}
	};

	const position = {
		x: props.chord.position + CHORD_OFFSET,
		y: 0
	};

	return (
		<Draggable
			axis={'x'}
			bounds={'parent'}
			defaultPosition={position}
			position={position}
			onStart={onStart}
			onDrag={onDrag}
			onStop={onStop}
			handle={'.handle'}
		>
			<div onClick={checkAltKeyAndDeleteChord} className={'handle chord'} style={{ opacity: .8 }}>
				{chordTostring(props.chord)}
			</div>
		</Draggable>
	);
};

export default ChordToolProvider;