import * as React from 'react';
import { Form, Col, InputGroup, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCopy, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useAppState } from '@scw/store';
import { Line, ActionType } from '@scw/models';
import ChordsCreator from './ChordsCreator';

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
			type: ActionType.UPDATE_TEXT_LINE,
			payload: {
				partIndex: props.partIndex,
				lineIndex: props.order,
				text: e.target.value
			}
		});
	};

	const duplicateLine = () => {
		dispatch({
			type: ActionType.DUPLICATE_PART_LINE,
			payload: {
				partIndex: props.partIndex,
				lineIndex: props.order
			}
		});
	};

	const deleteLine = () => {
		dispatch({
			type: ActionType.DEL_PART_LINE,
			payload: { 
				partIndex: props.partIndex,
				lineIndex: props.order
			}
		});
	};

	const moveLine = (direction: number) => () => {
		dispatch({
			type: ActionType.ORDER_PART_LINE,
			payload: {
				partIndex: props.partIndex,
				lineIndex: props.order,
				direction
			}
		});
	};

	return <Col>
		<ChordsCreator
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