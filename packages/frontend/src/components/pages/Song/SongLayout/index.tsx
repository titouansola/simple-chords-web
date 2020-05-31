import * as React from 'react';
import { Row, Col, ButtonGroup, Button } from 'react-bootstrap';
import { useKeyboardShortcut } from 'crooks';
import { Song } from '@scw/models';
import PartLayout from './PartLayout';

interface SongProps {
	song: Song;
}

// https://keycode.info/
const SPACEBAR_CODE = 32;

const SongLayout: React.FC<SongProps> = (props: SongProps) => {
	const { song } = props;
	const [step, setStep] = React.useState(0);

	const prevStep = () => setStep(Math.max(step - 1, 0));
	const nextStep = () => setStep(Math.min(step + 1, song.parts.length - 1));

	useKeyboardShortcut({
		keyCode: SPACEBAR_CODE,
		action: nextStep,
		disabled: false
	});

	return <React.Fragment>
		<Row>
			<Col>
				<h1>{song.title}</h1>
				<h6>{song.author}</h6>
				<p>
					{song.instrument} - {song.tuning} - Capo: {song.capodastrePosition}
				</p>
			</Col>
		</Row>
		<Row className={'mb-3'}>
			<Col className={'justify-content-between'}>
				<ButtonGroup>
					<Button variant={'primary'} onClick={() => setStep(0)}>Back to beginning</Button>
					<Button variant={'outline-primary'} onClick={prevStep}>Previous</Button>
					<Button variant={'outline-primary'} onClick={nextStep}>Next</Button>
				</ButtonGroup>
			</Col>
		</Row>
		<Row>
			<Col>
				<PartLayout content={song.parts[step]}/>
			</Col>
		</Row>
	</React.Fragment>
}

export default SongLayout;