import * as React from 'react';
import { useAppState } from '../../../store';
import { Form, Col, InputGroup, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Line from '../../../models/business/Line';
import ActionTypes from '../../../models/enum/ActionTypes';
import ChordLineCreator from './ChordLineCreator';

interface LineCreatorProps {
	content: Line,
	partIndex: number,
	order: number
}

const LineCreator: React.FC<LineCreatorProps> = (props: LineCreatorProps) => {
	const [_, dispatch] = useAppState();

	const changeTextLine = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch({
			type: ActionTypes.UPDATE_TEXT_LINE,
			payload: {
				partIndex: props.partIndex,
				lineIndex: props.order,
				text: e.target.value
			}
		})
	}

	const deleteLine = () => {
		dispatch({
			type: ActionTypes.DEL_PART_LINE,
			payload: { 
				partIndex: props.partIndex,
				lineIndex: props.order
			}
		})
	}

	return <Col>
		<ChordLineCreator text={props.content.text} chords={props.content.chords} partIndex={props.partIndex} lineIndex={props.order} />

		<InputGroup>
			<Form.Control type="text" value={props.content.text} onChange={changeTextLine} />
			<InputGroup.Append>
				<Button variant={'danger'} onClick={deleteLine}>
					<FontAwesomeIcon icon={faTimes} />
				</Button>
			</InputGroup.Append>
		</InputGroup>
	</Col>
}

export default LineCreator;