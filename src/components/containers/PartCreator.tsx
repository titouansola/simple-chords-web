import * as React from 'react';
import { useAppState } from '../../store';
import { Row, Col, Button } from 'react-bootstrap';
import Part from '../../models/business/Part';
import ActionTypes from '../../models/enum/ActionTypes';
import PartContentCreator from '../interface/creator/PartContentCreator';

const PartCreator: React.FC<any> = () => {
	const [{ creator }, dispatch] = useAppState();

	const addPart = () => {
		const newPart: Part = {
			type: null,
			lines: [],
		};
		dispatch({ type: ActionTypes.ADD_SONG_PART, payload: newPart });
	};

	return <React.Fragment>
		<Row><Col>
			{
				creator.current.parts.map((part: Part, index: number) => (
					<Row key={`part-${index}`} className={'mt-2 mb-2'}><Col>
						<PartContentCreator content={part} order={index} />
					</Col></Row>
				))
			}
		</Col></Row>
		<Row>
			<Col>
				<Button onClick={addPart}>Add part</Button>
			</Col>
		</Row>
	</React.Fragment>
}

export default PartCreator;