import * as React from 'react';
import { useAppState } from '@scw/store';
import { fetchAllSongs } from '@scw/webservices';
import { ActionType } from '@scw/models';
import SongList from './SongList';
import Filters from './Filters';
import Pager from './Pager';

const HomePage: React.FC<any> = () => {
	const [{ song }, dispatch] = useAppState();

	React.useEffect(() => {
		if (song.fetch) {
			fetchAllSongs({ ...song.filters, page: song.page }).then(songPage => {
				dispatch({
					type: ActionType.FETCH_ALL_SONGS,
					payload: songPage
				});
			});
		}
	}, [song.fetch]);

	return song.list.length > 0 ?
		<>
			<Filters />
			<Pager />
			<SongList list={song.list} />
			<Pager />
		</>
		: <div>Loading...</div>
};

export default HomePage;