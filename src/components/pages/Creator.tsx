import * as React from 'react';
import MainInfo from '../interface/creator/MainInfo';
import PartCreator from '../containers/PartCreator';

import { Form, Row, Col, Button } from 'react-bootstrap';
import { useAppState } from '../../store';
import { publishSong } from '../../services/song';
import ActionTypes from '../../models/enum/ActionTypes';

const Creator: React.FC<any> = () => {
	const [{ creator }, dispatch] = useAppState();

	const submit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		publishSong(creator.current);
	}

	React.useEffect(() => {
		return () => dispatch({ type: ActionTypes.CREATOR_FLUSH });
	}, [dispatch]);

	return <React.Fragment>
		<h1>Song Creator</h1>
		<p>
			Publish songs from your favorite artists with the Song Creator!
		</p>

		<Form onSubmit={submit}>
			<Row>
				<Col>
					<h2>Song main information</h2>
					<MainInfo />
				</Col>
			</Row>
			<Row className={'mt-5'}>
				<Col>
					<h2>Song parts</h2>
					<PartCreator />
				</Col>
			</Row>
			<Row className={'mt-5'}>
				<Col>
					<Button variant={'success'} type={'submit'} block>
						Submit
					</Button>
				</Col>
			</Row>
		</Form>
	</React.Fragment>
}

export default Creator;