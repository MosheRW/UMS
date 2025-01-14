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

    function handleCreateUser(user: any) {
        console.log(user);
        user && api.postAnewUser(user, true).then((data) => props.reload()) || props.reload(false);
    }

    return (
        <EditUserComponenet headline={"Create User"} user={{} as User} onSubmit={handleCreateUser} />
    );
}