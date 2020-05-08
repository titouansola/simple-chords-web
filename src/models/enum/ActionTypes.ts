export enum ActionTypes {
	// DATA FETCH
	FETCH_ALL_SONGS = 'FETCH ALL SONGS',
	FETCH_SONG = 'FETCH SONG',
	// CREATOR
	CREATOR_FLUSH = 'CREATOR FLUSH',
	// Song info
	UPDATE_SONG_INFO = 'UPDATE INFO',
	// Song parts
	ADD_SONG_PART = 'ADD SONG PART',
	DEL_SONG_PART = 'DELETE SONG PART',
	DUPLICATE_SONG_PART = 'DUPLICATE SONG PART',
	ORDER_SONG_PART = 'ORDER SONG PART',
	// Part lines
	UPDATE_PART_TYPE = 'UPDATE PART TYPE',
	ADD_PART_LINE = 'ADD PART LINE',
	DEL_PART_LINE = 'DELETE PART LINE',
	DUPLICATE_PART_LINE = 'DUPLICATE_PART LINE',
	UPDATE_TEXT_LINE = 'UPDATE TEXT LINE',
	ORDER_PART_LINE = 'ORDER PART LINE',
	// Line chords
	ADD_CHORD = 'ADD CHORD',
	DEL_CHORD = 'DEL CHORD',
	DUPLICATE_CHORD = 'DUPLICATE CHORD',
	UPDATE_CHORD = 'UPDATE CHORD'
}

export default ActionTypes;