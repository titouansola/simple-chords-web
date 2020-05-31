import * as React from 'react';
import { Col, Row, Form } from 'react-bootstrap';
import { useAppState } from '@scw/store';
import { ActionType } from '@scw/models';

const MainInfo: React.FC<any> = () => {
	const [{ creator }, dispatch] = useAppState();

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		dispatch({
			type: ActionType.UPDATE_SONG_INFO,
			payload: { [name]: value }
		});
	};

	return <React.Fragment>
		<Row>
			<Col sm={6}>
				<Form.Group>
					<Form.Label>Song Title</Form.Label>
					<Form.Control type='text' name={'title'} onChange={onChange} placeholder={'Polly'} value={creator.current.title}/>
				</Form.Group>
			</Col>
			<Col sm={6}>
				<Form.Group>
					<Form.Label>Artist</Form.Label>
					<Form.Control type='text' name={'author'} onChange={onChange} placeholder={'Nirvana'} value={creator.current.author}/>
				</Form.Group>
			</Col>
		</Row>
		<Row>
			<Col sm={4}>
				<Form.Group>
					<Form.Label>Instrument</Form.Label>
					<Form.Control type='text' name={'instrument'} onChange={onChange} placeholder={'guitare'} value={creator.current.instrument}/>
				</Form.Group>
			</Col>
			<Col sm={4}>
				<Form.Group>
					<Form.Label>Capodastre</Form.Label>
					<Form.Control type='number' name={'capodastrePosition'} onChange={onChange} value={creator.current.capodastrePosition} min={0} max={24}/>
				</Form.Group>
			</Col>
			<Col sm={4}>
				<Form.Group>
					<Form.Label>Tuning</Form.Label>
					<Form.Control type='text' name={'tuning'} onChange={onChange} placeholder={'STD'} value={creator.current.tuning}/>
				</Form.Group>
			</Col>
		</Row>
	</React.Fragment>
};

export default MainInfo;