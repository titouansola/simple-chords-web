import * as React from 'react';
import Draggable, { DraggableData } from 'react-draggable';
import { StyleSheet, css } from 'aphrodite';
import { CHORD_OFFSET } from '@scw/constants';
import { useAppState } from '@scw/store';
import { Chord, ActionType } from '@scw/models';
import { chordTostring } from '@scw/utils';

interface Props {
	chord: Chord;
	partIndex: number;
	lineIndex:  number;
	order: number;
}

const DraggableChord: React.FC<Props> = (props: Props) => {
	const [_, dispatch] = useAppState();
	const [grabbing, setGrabbing] = React.useState(false);
	const [delta, setDelta] = React.useState(0);

	const onStart = (e: MouseEvent) => {
		setGrabbing(true);
		if (e.shiftKey) {
			dispatch({
				type: ActionType.DUPLICATE_CHORD,
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
		setGrabbing(false);
		dispatch({
			type: ActionType.UPDATE_CHORD,
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
		if (event.altKey) {
			dispatch({
				type: ActionType.DEL_CHORD,
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
			<div
				onClick={checkAltKeyAndDeleteChord}
				className={'handle chord ' + css(styles.lowOpacity, grabbing ? styles.dragging : styles.draggable)}
			>
				{chordTostring(props.chord)}
			</div>
		</Draggable>
	);
};

const styles = StyleSheet.create({
	lowOpacity: { opacity: .8 },
	draggable: { cursor: 'grab' },
	dragging: { cursor: 'grabbing' }
});

export default DraggableChord;