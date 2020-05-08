import * as React from 'react';
import { useAppState } from '../../../store';
import { Form, Col, InputGroup, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCopy, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import Line from '../../../models/business/Line';
import ActionTypes from '../../../models/enum/ActionTypes';
import ChordLineCreator from './ChordLineCreator';

interface LineCreatorProps {
	content: Line,
	partIndex: number,
	order: number
}

const LineCreator: React.FC<LineCreatorProps> = (props: LineCreatorProps) => {
	const [{ creator }, dispatch] = useAppState();
	const isFirst = props.order === 0;
	const isLast = props.order + 1 >= creator.current.parts[props.partIndex].lines.length;

	const changeTextLine = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch({
			type: ActionTypes.UPDATE_TEXT_LINE,
			payload: {
				partIndex: props.partIndex,
				lineIndex: props.order,
				text: e.target.value
			}
		});
	};

	const duplicateLine = () => {
		dispatch({
			type: ActionTypes.DUPLICATE_PART_LINE,
			payload: {
				partIndex: props.partIndex,
				lineIndex: props.order
			}
		});
	};

	const deleteLine = () => {
		dispatch({
			type: ActionTypes.DEL_PART_LINE,
			payload: { 
				partIndex: props.partIndex,
				lineIndex: props.order
			}
		});
	};

	const moveLine = (direction: number) => () => {
		dispatch({
			type: ActionTypes.ORDER_PART_LINE,
			payload: {
				partIndex: props.partIndex,
				lineIndex: props.order,
				direction
			}
		});
	};

	return <Col>
		<ChordLineCreator
			text={props.content.text}
			chords={props.content.chords}
			partIndex={props.partIndex}
			lineIndex={props.order}
		/>

		<InputGroup>
			<Form.Control type="text" value={props.content.text} onChange={changeTextLine} />
			<InputGroup.Append>
				<Button variant={'outline-dark'} onClick={moveLine(-1)} disabled={isFirst}>
					<FontAwesomeIcon icon={faChevronUp} />
				</Button>
				<Button variant={'outline-dark'} onClick={moveLine(1)} disabled={isLast}>
					<FontAwesomeIcon icon={faChevronDown} />
				</Button>
				<Button variant={'outline-info'} onClick={duplicateLine}>
					<FontAwesomeIcon icon={faCopy} />
				</Button>
				<Button variant={'outline-danger'} onClick={deleteLine}>
					<FontAwesomeIcon icon={faTimes} />
				</Button>
			</InputGroup.Append>
		</InputGroup>
	</Col>
}

export default LineCreator;