import { useSelector } from "react-redux";
import { RootState } from '../services/types';

function useAuth() {
    const {
        authRequest,
        authRequestFailedMessage,
        currentUser,
    } = useSelector((state: RootState) => ({
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