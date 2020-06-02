import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useAppState } from '@scw/store';
import { ActionType } from '@scw/models';
import { StyleSheet, css } from 'aphrodite';
import { Row, Col, Form, Button } from 'react-bootstrap';

const filters = [
	{
		title: 'Title',
		key: 'title',
	},
	{
		title: 'Artist',
		key: 'author',
	},
	{
		title: 'Instrument',
		key: 'instrument',
	}
];

const Filters: React.FC<any> = () => {
	const [{ song }, dispatch] = useAppState();

	const submitFilters = (event?: React.FormEvent<HTMLFormElement>) => {
		if (event) { event.preventDefault(); }
		dispatch({ type: ActionType.TOGGLE_FETCHING });
	};

	const updateFilterValue = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch({
			type: ActionType.UPDATE_FILTER,
			payload: { [e.target.name]: e.target.value }
		});
	};

	const clearFilters = () => {
		dispatch({ type: ActionType.CLEAR_FILTERS });
	};

	return <Form onSubmit={submitFilters} className={css(styles.container)}>
		<Col className={'pb-3'}>
			<Row>
				<Col xs={12}>
					<p className={css(styles.floatingRight)}>Total: { song.total }</p>
					<h4>Filters</h4>
				</Col>
				{ filters.map(filter => (
					<Col key={filter.key} xs={4}>
						<Form.Label>{ filter.title }</Form.Label>
						<Form.Control
							name={filter.key}
							value={song.filters[filter.key]}
							onChange={updateFilterValue}
						/>
					</Col>
				)) }
			</Row>
		</Col>
		<div className={css(styles.footer)}>
			<Col className={'d-flex justify-content-end'}>
				<Button className={'mr-2'} variant={'outline-secondary'} onClick={clearFilters}>
					<FontAwesomeIcon icon={faTrash} />&nbsp;
					Clear all
				</Button>
				<Button variant={'secondary'} type={'submit'}>
					<FontAwesomeIcon icon={faFilter} />&nbsp;
					Apply
				</Button>
			</Col>
		</div>
	</Form>
};

const styles = StyleSheet.create({
	container: {
		background: 'var(--secondary)',
		overflow: 'hidden',
		color: 'white',
		paddingTop: 15,
		borderRadius: 5,
		marginBottom: 40,
		boxShadow: '#aaa 0 5px 30px'
	},
	floatingRight: {
		display: 'block',
		float: 'right'
	},
	footer: {
		background: '#eeeeee',
		padding: '10px 0'
	}
});

export default Filters;