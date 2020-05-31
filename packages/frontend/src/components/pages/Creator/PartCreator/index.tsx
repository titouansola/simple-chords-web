import * as React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useAppState } from '@scw/store';
import { Part, ActionType } from '@scw/models';

import PartLayout from './PartLayout';

const PartCreator: React.FC<any> = () => {
	const [{ creator }, dispatch] = useAppState();

	const addPart = () => {
		const newPart: Part = {
			type: null,
			lines: [],
		};
		dispatch({ type: ActionType.ADD_SONG_PART, payload: newPart });
	};

	return <React.Fragment>
		<Row><Col>
			{
				creator.current.parts.map((part: Part, index: number) => (
					<Row key={`part-${index}`} className={'mt-2 mb-2'}><Col>
						<PartLayout content={part} order={index} />
					</Col></Row>
				))
			}
		</Col></Row>
		<Row>
			<Col>
				<Button variant={'secondary'} onClick={addPart} block>
					<FontAwesomeIcon icon={faPlus} />&nbsp;
					Add part
				</Button>
			</Col>
		</Row>
	</React.Fragment>
}

export default PartCreator;