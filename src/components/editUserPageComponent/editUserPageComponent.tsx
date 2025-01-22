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


interface EditUserPageProps {
    version: Version;
    user?: User;
}

export default function EditUserPage({ ...props }: EditUserPageProps) {

    const navigate = useNavigate();

    const { user = {} as User, version } = props;



    function handleDone() {
        navigate(-1);
    }

    function helpCreateNewUser(user: Omit<User, "id"> | null) {
        if (user) api.postAnewUser(user, true).then(() => {
            handleDone();
        });
    }

    /** i know that this is unsafe,
     *  but it is only way to do that without using my own server as token issuer */
    function helpSignUpWithNewUser(user: Omit<User, "id"> | null) {

        if (user) api.login({ username: "test1", password: "1234" }, true).then((data) => {
            api.signUpUser(user, data?.token, true).then(() => {
                navigate("/");
            });
        });
    }
    function helpEditUser(initUser: Partial<User> | null) {
        if (user && user.id && initUser) {

            api.updateAUser(user.id, initUser, true).then(() => {
                handleDone();
            });
        }
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

    function picHelper(_user: Partial<User> | Omit<User, "id"> | null) {
        if (!_user) return;
        switch (version) {
            case Version.Create: {
                helpCreateNewUser(_user as Omit<User, "id">);
                break;
            }
            case Version.Edit: {
                helpEditUser(_user as Partial<User>);
                break;
            }
            case Version.SignUP: {
                helpSignUpWithNewUser(_user as Omit<User, "id">);
                break;
            }
            default:
                return () => { throw new Error("not given a version") };
        };
    }

    return <Container>
        <EditUserComponenet
            user={user}
            headline={picHeadline()}
            onSubmit={picHelper} //(user) => { if (user) picHelper()(user) }
            onCancel={handleDone}
        />
    </Container>;
}