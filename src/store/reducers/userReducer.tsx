import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    id: null,
    username: "",
    email: "",
  },
  reducers: {
    clearUser: (state: any) => {
      state.id = null;
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("access_token");
    },
    initUser: (state, { payload }) => {
      console.log(payload);
      state.id = payload.id;
      state.email = payload.email;
      state.username = payload.username;
    },
  },
});

export default userSlice.reducer;

export const { clearUser, initUser } = userSlice.actions;

// export interface UserState {
//   loading?: boolean;
//   error?: string;
//   userInfo?: {
//     username?: string | null;
//     id?: number;
//   };
// }

// interface Action {
//   type: string;
//   payload: {
//     loading?: boolean;
//     username?: string | null;
//     id?: number;
//     error?: string | null;
//   };
// }

// const initialState: UserState = {
//   loading: false,
// };

// export const userReducer = (
//   state = initialState,
//   action: Action
// ): UserState => {
//   switch (action.type) {
//     case USER_LOGIN_REQUEST:
//       return { loading: false };
//     case USER_LOGIN_SUCCESS:
//       return {
//         loading: true,
//         userInfo: {
//           username: action.payload.username,
//         },
//       };
//     case USER_LOGIN_ERROR:
//       return { loading: false, error: action.payload.error! };
//     case USER_LOGOUT:
//       return {};
//     case USER_LOGOUT_ERROR:
//       return { loading: false, error: action.payload.error! };
//     default:
//       return state;
//   }
// };
