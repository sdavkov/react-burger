import { useSelector } from "react-redux";
import { IRootState } from '../utils/ts-types';

function useAuth() {
    const {
        authRequest,
        authRequestFailedMessage,
        currentUser,
    } = useSelector((state: IRootState) => ({
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