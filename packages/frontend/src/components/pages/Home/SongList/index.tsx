import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { Song } from '@scw/models';

interface SongListProps {
	list: Song[];
}

const SongList: React.FC<SongListProps> = (props: SongListProps) => {
	const history = useHistory();

	const goToSong = (songId: number) => {
		history.push(`/song/${songId}`);
	};

	return <Table responsive hover borderless striped>
		<thead>
			<tr>
				<th>Title</th>
				<th>Artist</th>
				<th>Instrument</th>
				<th>Tuning</th>
			</tr>
		</thead>
		<tbody>
			{
				props.list.map((song: Song, key) => (
					<tr style={{ cursor: 'pointer' }} key={key} onClick={() => goToSong(song.id)}>
						<td>{song.title}</td>
						<td>{song.author}</td>
						<td>{song.instrument}</td>
						<td>{song.tuning}</td>
					</tr>
				))
			}
		</tbody>
	</Table>
};

export default SongList;