import * as React from 'react';
import { Form } from 'react-bootstrap';
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
		<Form.Group>
			<Form.Label>Song Title</Form.Label>
			<Form.Control type='text' name={'title'} onChange={onChange} value={creator.current.title}/>
		</Form.Group>

		<Form.Group>
			<Form.Label>Artist</Form.Label>
			<Form.Control type='text' name={'author'} onChange={onChange} value={creator.current.author}/>
		</Form.Group>

		<Form.Group>
			<Form.Label>Instrument</Form.Label>
			<Form.Control type='text' name={'instrument'} onChange={onChange} value={creator.current.instrument}/>
		</Form.Group>

		<Form.Group>
			<Form.Label>Capodastre</Form.Label>
			<Form.Control type='number' name={'capodastrePosition'} onChange={onChange} value={creator.current.capodastrePosition} min={0} max={24}/>
		</Form.Group>

		<Form.Group>
			<Form.Label>Tuning</Form.Label>
			<Form.Control type='text' name={'tuning'} onChange={onChange} value={creator.current.tuning}/>
		</Form.Group>
	</React.Fragment>
};

export default MainInfo;