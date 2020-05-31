import * as React from 'react';
import { Router } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { Form, Row, Col, Button, Spinner } from 'react-bootstrap';
import { useAppState } from '@scw/store';
import { publishSong } from '@scw/webservices';
import { ActionType } from '@scw/models';
import { notyf } from '@scw/utils';

import MainInfo from './MainInfo';
import PartCreator from './PartCreator';


const CreatorPage: React.FC<any> = () => {
	const [{ creator }, dispatch] = useAppState();
	const [loading, setLoading] = React.useState(false);

	const isFormValid = () => {
		const { current } = creator;
		return (
			Object.values(current).every((value) =>  {
			switch (typeof value) {
				case 'string':
					return value.length > 0;
				case 'number':
					return value >= 0;
				case 'object':
					return Array.isArray(value) && value.length > 0;
				default:
					return false;
			}
		})
		&& current.parts.every((part) => {
			return part.type !== null && part.lines.length > 0;
		})
		);
	};

	const submit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (isFormValid()) {
			setLoading(true);
			publishSong(creator.current)
				.then(() => {
					notyf.success('Song successfuly created!');
					Router.push('/');
				})
				.catch(() => {
					notyf.error('Error when submitting your work. Please try again!');
				})
				.finally(() => setLoading(false));
		} else {
			notyf.error('Required fields are missing!');
		}
	};

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
				<Col className={'d-flex justify-content-center'}>
					<Button variant={'primary'} type={'submit'} size={'lg'} disabled={loading}> {
						!loading
						? <span className={'font-weight-bold'}>
							<FontAwesomeIcon icon={faPaperPlane} />&nbsp;
							Publish
						</span>
						: <Spinner animation={'border'} />
					} </Button>
				</Col>
			</Row>
		</Form>
	</React.Fragment>
}

export default CreatorPage;