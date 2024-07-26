export enum WebsocketStatus {
	CONNECTING = 'CONNECTING...',
	ONLINE = 'ONLINE',
	OFFLINE = 'OFFLINE',
}

export interface IWebsocketResponse {
	success: boolean;
	orders: IWebsocketOrder[];
	total: number;
	totalToday: number;
}

export interface IWebsocketOrder {
	ingredients: string[];
	_id: string;
	name: string;
	status: string;
	number: number;
	createdAt: string;
	updatedAt: string;
}
