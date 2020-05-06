import * as React from 'react';
import { Dropdown, DropdownButton, ButtonGroup } from 'react-bootstrap';
import { capitalizeFirstChar } from '../../../utils/converter';
import { PartType } from '../../../models/business/Part';
import DropdownItem from 'react-bootstrap/DropdownItem';

interface Props {
	type: PartType;
	onSelect: (value: PartType) => void;
}

const PartTypeDropdown: React.FC<Props> = (props: Props) => {
	return (
		<DropdownButton
			as={ButtonGroup}
			size={'sm'}
			variant={'outline-primary'}
			id={'part-type-selector'}
			onSelect={props.onSelect}
			title={props.type ? capitalizeFirstChar(props.type) : 'Choose a type'}
		> {
			Object.entries(PartType).map(([key, value]) => (
				<Dropdown.Item key={key} eventKey={value}>
					{capitalizeFirstChar(value)}
				</Dropdown.Item>
			))
		} </DropdownButton>
	);
}

export default PartTypeDropdown;