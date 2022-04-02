import { TOrderStatus } from '../types/web-sockets';
import reducer, { closedWSConnection, errorWSConnection, getWSMessage, initialState, startWSConnection, successWSConnection } from './web-socket'

describe('web-socket reducer', () => {

	it('should return initial state', () => {
		expect(reducer(undefined, { type: "test" })).toEqual(initialState);
	});
	it("should handle clearCartAction", () => {
		expect(reducer(initialState, startWSConnection(''))).toEqual({
			...initialState,
			wsRequest: true,
		});
	});
	it("should handle successWSConnection", () => {
		expect(reducer(initialState, successWSConnection())).toEqual({
			...initialState,
			wsConnected: true,
		});
	});
	it("should handle errorWSConnection", () => {
		expect(reducer(initialState, errorWSConnection())).toEqual({
			...initialState,
			wsError: true,
		});
	});
	it("should handle closedWSConnection", () => {
		expect(reducer(initialState, closedWSConnection())).toEqual({
			...initialState,
			wsConnected: false,
		});
	});
	it("should handle getWSMessage", () => {
		const mock = {
			success: true,
			total: 100,
			totalToday: 100,
			orders: [
				{
					ingredients: ['id'],
					_id: 'id',
					name: 'test',
					status: 'created' as TOrderStatus,
					number: 100,
					createdAt: 'createdAt',
					updatedAt: 'updatedAt'
				}
			]
		}
		expect(reducer(initialState, getWSMessage(mock))).toEqual({
			...initialState,
			success: mock.success,
			orders: mock.orders,
			total: mock.total,
			totalToday: mock.totalToday
		});
	});
})