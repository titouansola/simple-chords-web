import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useAppState } from '@scw/store';
import { fetchSong } from '@scw/webservices';
import { Song, ActionType } from '@scw/models';
import SongComponent from './SongLayout';

const SongPage: React.FunctionComponent<{}> = () => {
	const { songId } = useParams();
	const [{ song }, dispatch] = useAppState();
	
	// Fetch song with song id
	React.useEffect(() => {
		fetchSong(songId)
			.then((song: Song) => dispatch({ type: ActionType.FETCH_SONG, payload: song }))
	}, [dispatch]);

	return song.current ? <SongComponent song={song.current}/> : <div>Loading...</div>;
};

export default SongPage;