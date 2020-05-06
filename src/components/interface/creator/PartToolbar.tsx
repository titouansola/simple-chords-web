import * as React from 'react';
import { ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';
import PartTypeDropdown from '../atoms/PartTypeDropdown';
import { useAppState } from '../../../store';
import ActionTypes from '../../../models/enum/ActionTypes';
import Part, { PartType } from '../../../models/business/Part';

interface Props {
	content: Part;
	order: number
}

const PartToolbar: React.FC<Props> = (props: Props) => {
	const [_, dispatch] = useAppState();

	const duplicatePart = () => {
		dispatch({
			type: ActionTypes.DUPLICATE_SONG_PART,
			payload: { partIndex: props.order }
		});
	};

	const deletePart = () => {
		dispatch({
			type: ActionTypes.DEL_SONG_PART,
			payload: { partIndex: props.order }
		})
	};

	const changePartType = (type: PartType) => {
		dispatch({
			type: ActionTypes.UPDATE_PART_TYPE,
			payload: {
				partIndex: props.order,
				type
			}
		});
	}

	return <ButtonToolbar>
		<ButtonGroup size={'sm'}>
			<PartTypeDropdown type={props.content.type} onSelect={changePartType}/>
			<Button variant={'outline-info'} onClick={duplicatePart}>Duplicate</Button>
			<Button variant={'outline-danger'} onClick={deletePart}>Delete</Button>
		</ButtonGroup>
	</ButtonToolbar>
};

export default PartToolbar;