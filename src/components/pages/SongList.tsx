import * as React from 'react';
import { useAppState } from '../../store';
import { fetchAllSongs } from '../../services/song';
import ActionTypes from '../../models/enum/ActionTypes';
import SongListContainer from '../containers/SongList';

const SongList: React.FC<any> = () => {
	const [{ song }, dispatch] = useAppState();

	React.useEffect(() => {
		fetchAllSongs().then(({ songs }) => {
			dispatch({
				type: ActionTypes.FETCH_ALL_SONGS,
				payload: songs
			})
		})
	}, [dispatch]);

	return song.list.length > 0 ?
		<SongListContainer list={song.list} />
		: <div>Loading...</div>
};

export default SongList;