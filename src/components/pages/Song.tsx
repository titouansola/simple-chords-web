import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useAppState } from '../../state';

const Song: React.FunctionComponent<{}> = () => {
	const { songId } = useParams();
	const [state, dispatch] = useAppState();
	// Fetch song with song id
	return <div>
		Hello World! song ID : {songId}
	</div>;
};

export default Song;