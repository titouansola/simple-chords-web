import * as React from 'react';
import Song from '../../models/Song';
import BlockComponent from '../interface/Block';
import { useKeyboardShortcut } from 'crooks';

interface SongProps {
	song: Song;
}

// https://keycode.info/
const SPACEBAR_CODE = 32;

const SongProvider: React.FC<SongProps> = (props: SongProps) => {
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
		<BlockComponent block={song.parts[step]}/>
		<button onClick={prevStep}>Previous</button>
		<button onClick={nextStep}>Next</button>
	</React.Fragment>
}

export default SongProvider;