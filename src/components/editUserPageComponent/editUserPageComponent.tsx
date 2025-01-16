import React from "react";
import { User } from "../../types/user/user";
import { api } from "../../api/api";
import EditUserComponenet from "../editUserComponenet/editUserComponenet";
import { Container } from "./editUserPageComponent.style";
import { useNavigate } from "react-router";

export enum Version {
    Create,
    Edit,
    SignUP
};


interface EditUserPage {
    version: Version;
    user?: User;
}

export default function EditUserPage({ ...props }: EditUserPage) {

    const navigate = useNavigate();

    const { user = {} as User, version } = props;



    function handleDone() {
        navigate(-1);
    }

    function helpCreateNewUser(user: User | null) {
        user && api.postAnewUser(user, true).then((data) => {
            handleDone();
        });
    }

    /** i know that this is unsafe,
     *  but it is only way to do that without using my own server as token issuer */
    function helpSignUpWithNewUser(user: User | null) {

        user && api.login({ username: "test1", password: "1234" }, true).then((data) => {
            api.signUpUser(user, data?.token, true).then((data) => {
                navigate("/");
            });
        });
    }
    function helpEditUser(user: User | null) {
        user && api.updateAUser(user.id, user, true).then((data) => {
            handleDone();
        });
    }

    function picHeadline() {
        switch (version) {
            case Version.Create:
                return "Create User";
            case Version.Edit:
                return "Edit User";
            case Version.SignUP:
                return "Sign Up";
            default:
                return "";
        }

    }

    function picHelper() {
        switch (version) {
            case Version.Create:
                return helpCreateNewUser;
            case Version.Edit:
                return helpEditUser;
            case Version.SignUP:
                return helpSignUpWithNewUser;
            default:
                return () => { throw new Error("not given a version") };
        };
    }

    return <Container>
        <EditUserComponenet
            user={user}
            headline={picHeadline()}
            onSubmit={picHelper} 
            reset={handleDone}
            />
    </Container>;
}