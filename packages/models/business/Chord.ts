import { Fondamental } from '../enum';

export default interface Chord {
	position: number;
	fondamental: Fondamental;
	minor: boolean;
	qualities: string;
}