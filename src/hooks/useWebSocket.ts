import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { closedWSConnection, startWSConnection } from '../services/slices/web-socket';
import { useAppDispatch } from '../services/store';
import { ACCESS_TOKEN_NAME, WSS_ALL_ORDERS_URL, WSS_PERSONALS_ORDERS_URL } from '../utils/constants';
import { getCookie } from '../utils/cookies';

function useWebSocket() {
	const location = useLocation();
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (location.pathname.startsWith('/feed')) {
			dispatch(startWSConnection(WSS_ALL_ORDERS_URL));
		}
		else {
			dispatch(startWSConnection(`${WSS_PERSONALS_ORDERS_URL}?token=${getCookie(ACCESS_TOKEN_NAME)}`));
		}
		return () => { dispatch(closedWSConnection()) }
	}, [dispatch, location])
}

export default useWebSocket;
