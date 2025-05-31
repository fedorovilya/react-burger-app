export interface Order {
	ingredients: string[];
	_id: string;
	status: 'done' | 'cancelled' | 'created';
	name: string
	number: number;
	createdAt: string;
	updatedAt: string;
}
