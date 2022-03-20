import { TOrderStatus } from '../services/slices/web-socket';

export function formatDateFromOrder(date: string): string {
	const day = 1000 * 60 * 60 * 24;
	const currentDate = new Date();
	const orderDate = new Date(date);
	const different = currentDate.getTime() - orderDate.getTime();
	let res = '';
	if (different < day)
		res = 'Сегодня'
	else if (different < day * 2)
		res = 'Вчера'
	else
		res = `${Math.trunc(different / day)} дня назад`;

	res += `, ${orderDate.toLocaleDateString(undefined, { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' }).substring(12)}`;
	return res;
}

export function orderStatusToString(status: TOrderStatus) {
	switch (status) {
		case 'done': return 'Выполнен';
		case 'pending': return 'Готовится';
		case 'created': return 'Создан';
		default: return status;
	}
}