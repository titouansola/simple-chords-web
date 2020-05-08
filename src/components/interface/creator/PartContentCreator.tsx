import * as React from 'react';
import { Card, Col, Button, Row, Collapse, ButtonToolbar, ButtonGroup } from 'react-bootstrap';
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
	const [{ creator }, dispatch] = useAppState();
	const [open, setOpen] = React.useState(true);
	
	const isFirst = props.order === 0;
	const isLast = props.order + 1 >= creator.current.parts.length;
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

	const movePart = (direction: number) => () => {
		dispatch({
			type: ActionTypes.ORDER_SONG_PART,
			payload: {
				partIndex: props.order,
				direction
			}
		});
	};

	return <Card>
		<Card.Body>
			<Row><Col>
				<Row>
					<Col xs={6}>
						<Card.Title className={'mb-0'}>
							<FontAwesomeIcon icon={open ? faChevronDown : faChevronUp} onClick={() => setOpen(!open)}/>
							&nbsp;
							{props.order + 1}.
							&nbsp;
							{props.content.type ? capitalizeFirstChar(props.content.type) : 'Part'}
						</Card.Title>
					</Col>
					<Col xs={6} className={'d-flex justify-content-end'}>
						<ButtonGroup>
							<Button variant={'outline-dark'} disabled={isFirst} onClick={movePart(-1)}>
								<FontAwesomeIcon icon={faChevronUp} />
							</Button>
							<Button variant={'outline-dark'} disabled={isLast} onClick={movePart(1)}>
								<FontAwesomeIcon icon={faChevronDown} />
							</Button>
						</ButtonGroup>
					</Col>
				</Row>
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