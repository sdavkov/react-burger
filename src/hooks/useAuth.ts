import { useAppSelector } from '../services/store';

function useAuth() {
    const {
        authRequest,
        authRequestFailedMessage,
        currentUser,
    } = useAppSelector(state => ({
        authRequest: state.auth.authRequest,
        authRequestFailedMessage: state.auth.authRequestFailedMessage,
        currentUser: state.auth.currentUser,
    }));

    return {
        authRequest,
        authRequestFailedMessage,
        currentUser,
    }
}

export default useAuth;