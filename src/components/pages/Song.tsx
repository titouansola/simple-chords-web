import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useAppState } from '../../state';
import { fetchSong } from '../../services/song';
import Song from '../../models/Song';
import ActionTypes from '../../state/actionTypes';
import SongProvider from '../providers/Song';

const Song: React.FunctionComponent<{}> = () => {
	const { songId } = useParams();
	const [{ song }, dispatch] = useAppState();
	
	// Fetch song with song id
	React.useEffect(() => {
		fetchSong(songId)
			.then((song: Song) => dispatch({ type: ActionTypes.FETCH_SONG, payload: song }))
	}, [dispatch]);

	return song.current ? <SongProvider song={song.current}/> : <div>Loading...</div>;
};

export default Song;