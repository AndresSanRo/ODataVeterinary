import { Base } from './base';
import { Owner } from './owner';

export interface Pet extends Base<number> {
	name?: string;
	age?: number;
	species?: string;
	owners?: Owner[];
}
