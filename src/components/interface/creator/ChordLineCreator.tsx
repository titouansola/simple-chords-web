import * as React from 'react';
import { Overlay, Popover, InputGroup, DropdownButton, FormControl, ToggleButton, ToggleButtonGroup, Button } from 'react-bootstrap';
import { OverlayInjectedProps } from 'react-bootstrap/Overlay';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { Chord, Fondamental } from '../../../models/business/Chord';
import { StyleSheet, css } from 'aphrodite';
import ChordToolProvider from './ChordToolProvider';
import DropdownItem from 'react-bootstrap/DropdownItem';
import { useAppState } from '../../../store';
import ActionTypes from '../../../models/enum/ActionTypes';

interface Props {
	text: string;
	chords: Array<Chord>;
	partIndex: number;
	lineIndex: number;
}

const OVERLAY_WIDTH = 350;
const TEXT_MARGIN = 50;

const computeOverlayY = (target: HTMLDivElement) => {
	const targetY = target.getBoundingClientRect().y;
	return document.body.scrollHeight - document.body.scrollTop - targetY + 8; // 8 = height of bottom arrow
}

const ChordLineCreator: React.FC<Props> = (props: Props) => {
	const initialChord: Chord = {
		fondamental: null,
		minor: false,
		position: 0,
		qualities: ''
	};

	const target = React.useRef(null);
	const [_, dispatch] = useAppState();
	const [showOv, setshowOv] = React.useState(false);
	const [overlayX, setOverlayX] = React.useState(0);
	const  [chord, setChord] = React.useState(initialChord);
	const overlayY = target.current ? computeOverlayY(target.current) : 0;

	const showOverlay = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		const parentX = (target.current as HTMLDivElement).getBoundingClientRect().x;
		setChord({ ...chord, position: parseInt((e.clientX - parentX).toFixed(0)) });
		setOverlayX(e.clientX - OVERLAY_WIDTH / 2);
		setshowOv(true);
	};

	const hideOverlay = () => {
		setshowOv(false);
		setChord(initialChord);
		setOverlayX(0);
	}

	const setFondamental = (fondamental: Fondamental) => {
		setChord({ ...chord, fondamental });
	};

	const toggleMinor = ([value]) => {
		setChord({ ...chord, minor: !!value });
	};

	const setQualities = (e: React.ChangeEvent<any>) => {
		setChord({ ...chord, qualities: e.target.value });
	}

	const isChordComplete = () => {
		return chord.fondamental;
	}

	const createChord = () => {
		dispatch({
			type: ActionTypes.ADD_CHORD,
			payload: { partIndex: props.partIndex, lineIndex: props.lineIndex, chord }
		});
		hideOverlay();
	}

	return <React.Fragment>
		<div className={css(styles.container)}>
			{/* CLICKABLE BACKGROUND CONTROLLING OVERLAY */}
			<div className={css(styles.clickableBg)} ref={target} onClick={showOverlay}>
				{props.text}
			</div>
			{
				props.chords.map((chord: Chord, order) => (
					<ChordToolProvider
						key={order}
						chord={chord}
						partIndex={props.partIndex}
						lineIndex={props.lineIndex}
						order={order}
					/>))
			}
		</div>
		<Overlay
			target={target.current}
			show={showOv}
			rootClose={true}
			transition={false}
			onHide={hideOverlay}
		>
			{
				(props: OverlayInjectedProps) => (
					<Popover
						{...props}
						id={'chorld-line-ov'}
						style={{
							...props.style,
							maxWidth: OVERLAY_WIDTH,
							padding: 5,
							transform: `translate(${overlayX}px, -${overlayY}px)`
						}}
					>
						<InputGroup size={'sm'}>
							<DropdownButton
								as={InputGroup.Prepend}
								variant={'outline-primary'}
								title={chord.fondamental || 'Root note'}
								onSelect={setFondamental}
								id={'root-note-dropdown'}
								drop={'up'}
							> {
								Object.values(Fondamental).map((value) => (
									<DropdownItem key={value} eventKey={value}>{value}</DropdownItem>
								))
							} </DropdownButton>
							<ToggleButtonGroup onChange={toggleMinor} as={InputGroup.Prepend} type={'checkbox'} toggle>
								<ToggleButton variant={'outline-primary'} value={'minor'}>
									Minor
								</ToggleButton>
							</ToggleButtonGroup>
							<FormControl value={chord.qualities} onChange={setQualities} />
							<InputGroup.Append>
								<Button variant={'success'} onClick={createChord} disabled={!isChordComplete()}>
									<FontAwesomeIcon icon={faCheck} />
								</Button>
							</InputGroup.Append>
						</InputGroup>		
					</Popover>
				)
			}
		</Overlay>
	</React.Fragment>
};

const styles = StyleSheet.create({
	container: {
		position: 'relative',
		margin: '10px 0',
		height: 26,
		border: '1px solid black',
		overflowX: 'auto'
	},
	clickableBg: {
		position: 'absolute',
		color: '#ccc',
		paddingLeft: TEXT_MARGIN,
		top: 0,
		right: 0,
		bottom: 0,
		left: 0
	}
});

export default ChordLineCreator;