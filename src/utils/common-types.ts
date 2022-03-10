import { Location } from 'history'

export interface ILocationState {
	reset: boolean;
	background: Location<unknown>;
	from: string;
}