import * as React from 'react';
import { Pagination } from 'react-bootstrap';
import { useAppState } from '@scw/store';
import { ActionType } from '@scw/models';

const usePagination = (): [{currentPage: number, max: number}, (page: number) => void] => {
	const [{ song }, dispatch] = useAppState();

	const changePage = (page: number) => dispatch({ type: ActionType.CHANGE_PAGE, payload: page });

	return [{ currentPage: song.page, max: song.pageAmount }, (page: number) => changePage.bind(null, page)];
};

const Pager: React.FC<any> = () => {
	const [{ currentPage, max }, setCurrentPage] = usePagination();

	const fisFirstPage = currentPage <= 0;
	const isLastPage = currentPage >= max - 1;

	const previousPage = currentPage - 1;
	const nextPage = currentPage + 1;

	return <Pagination className={'justify-content-center'}>
		<Pagination.First disabled={fisFirstPage} onClick={setCurrentPage(0)} />

		{ !fisFirstPage && <Pagination.Item onClick={setCurrentPage(previousPage)}>{ previousPage + 1 }</Pagination.Item> }
		<Pagination.Item active>{ currentPage + 1 }</Pagination.Item>
		{ !isLastPage && <Pagination.Item onClick={setCurrentPage(nextPage)}>{ nextPage + 1 }</Pagination.Item> }

		<Pagination.Last disabled={isLastPage} onClick={setCurrentPage(max - 1)}/>
	</Pagination>
};

export default Pager;