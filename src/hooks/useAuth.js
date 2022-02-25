import { useSelector } from "react-redux";

function useAuth() {
    const {
        authRequest,
        authRequestFailedMessage,
        currentUser,
    } = useSelector(store => ({
        authRequest: store.auth.authRequest,
        authRequestFailedMessage: store.auth.authRequestFailedMessage,
        currentUser: store.auth.currentUser,
    }));

    return {
        authRequest,
        authRequestFailedMessage,
        currentUser,
    }
}

export default useAuth;