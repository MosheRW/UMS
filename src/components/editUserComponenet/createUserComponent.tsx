import React from "react";
import LoginComponent from "../loginComponent/loginComponent";
import EditUserComponenet from "./editUserComponenet";
import { User } from "../../types/user/user";
import { api } from "../../api/api";
import { useDispatch } from "react-redux";
import { setIsSyncing } from "../../redux/features/syncStatus/syncStatusSlice";

interface CreateUserComponent {
    reload: (bool?: boolean) => void
}

export default function CreateUserComponent({ ...props }: CreateUserComponent) {

    const dispatch = useDispatch();
    function handleCreateUser(user: any) {
        console.log(user);
        user && api.postAnewUser(user).then((data) => props.reload()) || props.reload(false);

        dispatch(setIsSyncing(false));
    }

    return (
        <EditUserComponenet headline={"Create User"} user={{} as User} onSubmit={handleCreateUser} />
    );
}