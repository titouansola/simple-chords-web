import { Notyf } from 'notyf';

export const notyf = new Notyf({
	duration: 2000,
	ripple: true,
	position: {x: 'center', y: 'top' },
	dismissible: false
});