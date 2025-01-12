import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { User } from "../../../types/user/user";

interface UserState extends User {
    token: string;
}


const initialState: UserState = {
    id: "",
    userName: "",
    fullName: "",
    email: "",
    password: "",
    createdAt: new Date(),
    token: "",
};

export const userDataSlice = createSlice({
    name: "userData",
    initialState,
    reducers: {
        setUserID: (state, action: PayloadAction<string>) => {
            state.id = action.payload;
            localStorage.setItem("userId", state.id);
        },
        setUserData: (state, action: PayloadAction<UserState>) => {
            state.id = action.payload.id;
            localStorage.setItem("userId", state.id);
            
            state.userName = action.payload.userName;
            localStorage.setItem("userName", state.userName);

            state.fullName = action.payload.fullName;
            localStorage.setItem("userFullName", state.fullName);

            state.email = action.payload.email;
            localStorage.setItem("userEmail", state.email);

            // it is safe and/or necessary?
            state.password = action.payload.password;
                        
            state.createdAt = action.payload.createdAt;
            localStorage.setItem("userCreatedAt", state.createdAt.toUTCString()); 

            state.token = action.payload.token;
            localStorage.setItem("userToken", state.token); 

        },
    },
});

export const { setUserData } = userDataSlice.actions;
export default userDataSlice.reducer;