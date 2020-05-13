import * as React from 'react';
import { useAppState } from '@scw/store';
import { fetchAllSongs } from '@scw/webservices';
import { ActionType } from '@scw/models';
import SongList from './SongList';

const HomePage: React.FC<any> = () => {
	const [{ song }, dispatch] = useAppState();

	React.useEffect(() => {
		fetchAllSongs().then(({ songs }) => {
			dispatch({
				type: ActionType.FETCH_ALL_SONGS,
				payload: songs
			})
		})
	}, [dispatch]);

	return song.list.length > 0 ?
		<SongList list={song.list} />
		: <div>Loading...</div>
};

export default HomePage;