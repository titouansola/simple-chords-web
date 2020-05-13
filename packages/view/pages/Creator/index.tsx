import * as React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { useAppState } from '@scw/store';
import { publishSong } from '@scw/webservices';
import { ActionType } from '@scw/models';

import MainInfo from './MainInfo';
import PartCreator from './PartCreator';


const CreatorPage: React.FC<any> = () => {
	const [{ creator }, dispatch] = useAppState();

	const submit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		publishSong(creator.current);
	}

	React.useEffect(() => {
		return () => dispatch({ type: ActionType.CREATOR_FLUSH });
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

export default CreatorPage;