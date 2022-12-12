import { 
    USER_LOGIN_ERROR,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_LOGOUT_ERROR,
} from "../../types/users";


export interface UserState {
    loading?: boolean, 
    error?: string, 
    userInfo?: {
        username?: string | null;
        access?: string;
        refresh?: string;
    }
}

interface Action {
    type: string,
    payload: {
        loading?: boolean;
        username?: string | null;
        access?: string;
        refresh?: string;
        error?: string | null;
    }
}

const initialState: UserState = {
    loading: false, 
}


export const userReducer = (state = initialState, action: Action): UserState => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: false }
        case USER_LOGIN_SUCCESS:
            return { 
                loading: true,
                userInfo: {
                    username: action.payload.username,
                    access: action.payload.access,
                    refresh: action.payload.refresh,
                }
            }
        case USER_LOGIN_ERROR:
            return { loading: false, error: action.payload.error! }
        case USER_LOGOUT:
            return {}
        case USER_LOGOUT_ERROR:
            return { loading: false, error: action.payload.error! }
        default:
            return state

    }
}