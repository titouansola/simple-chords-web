import * as React from 'react';
import { Card, Col, Button, Row, Collapse } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import Part from '../../../models/business/Part';
import { useAppState } from '../../../store';
import Line from '../../../models/business/Line';
import LineCreator from './LineCreator';
import PartToolbar from './PartToolbar';
import ActionTypes from '../../../models/enum/ActionTypes';
import { MAX_LINES_PER_PART } from '../../../constants';
import { capitalizeFirstChar } from '../../../utils/converter';

interface Props {
	content: Part;
	order: number
}

const PartContentCreator: React.FC<Props> = (props: Props) => {
	const [_, dispatch] = useAppState();
	const [open, setOpen] = React.useState(true);
	
	const isFull = props.content.lines.length >= MAX_LINES_PER_PART;

	const addLine = () => {
		const newLine: Line = {
			chords: [],
			text: ''
		};
		dispatch({
			type: ActionTypes.ADD_PART_LINE,
			payload: { partIndex: props.order, line: newLine }
		})
	};

	return <Card>
		<Card.Body>
			<Row><Col>
				<Row><Col>
					<Card.Title className={'mb-0'}>
						<FontAwesomeIcon icon={open ? faChevronDown : faChevronUp} onClick={() => setOpen(!open)}/>
						&nbsp;
						{props.order + 1}.
						&nbsp;
						{props.content.type ? capitalizeFirstChar(props.content.type) : 'Part'}
					</Card.Title>
					
				</Col></Row>
				<Collapse in={open}>
					<Row className={'pt-4'}><Col>
						<Row><Col>
							<PartToolbar {...props} />
						</Col></Row>
						<Row><Col> {
							props.content.lines.map((line: Line, order) => (
								<Row key={`line-${order}-part-${props.order}`} className={'mt-2 mb-2'}>
									<LineCreator
										partIndex={props.order}
										content={line}
										order={order}
									/>
								</Row>
							))
						} </Col></Row>
						<Row className={'mt-4'}><Col>
							<Button onClick={addLine} disabled={isFull} block>
								{isFull ? 'Full' : 'Add line'} ({props.content.lines.length} / {MAX_LINES_PER_PART})
							</Button>
						</Col></Row>
					</Col></Row>
				</Collapse>
			</Col></Row>
		</Card.Body>
	</Card>
};

export default PartContentCreator;