import { Base } from './base';
import { Pet } from './pet';

export interface Owner extends Base<number> {
	name?: string;
	lastName?: string;
	phoneNumber?: number;
	location?: string;
	petId?: number;
	pet?: Pet;
}
