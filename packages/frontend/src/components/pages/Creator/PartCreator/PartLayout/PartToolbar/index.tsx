import * as React from 'react';
import { ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCopy } from '@fortawesome/free-solid-svg-icons';
import { useAppState } from '@scw/store';
import { Part, PartType, ActionType } from '@scw/models';
import PartTypeDropdown from './PartTypeDropdown';

interface Props {
	content: Part;
	order: number
}

const PartToolbar: React.FC<Props> = (props: Props) => {
	const [_, dispatch] = useAppState();

	const duplicatePart = () => {
		dispatch({
			type: ActionType.DUPLICATE_SONG_PART,
			payload: { partIndex: props.order }
		});
	};

	const deletePart = () => {
		dispatch({
			type: ActionType.DEL_SONG_PART,
			payload: { partIndex: props.order }
		})
	};

	const changePartType = (type: PartType) => {
		dispatch({
			type: ActionType.UPDATE_PART_TYPE,
			payload: {
				partIndex: props.order,
				type
			}
		});
	}

	return <ButtonToolbar>
		<ButtonGroup size={'sm'}>
			<PartTypeDropdown type={props.content.type} onSelect={changePartType}/>
			<Button variant={'info'} onClick={duplicatePart}>
				<FontAwesomeIcon icon={faCopy} />&nbsp;
				Duplicate
			</Button>
			<Button variant={'danger'} onClick={deletePart}>
				<FontAwesomeIcon icon={faTrash} />&nbsp;
				Delete
			</Button>
		</ButtonGroup>
	</ButtonToolbar>
};

export default PartToolbar;