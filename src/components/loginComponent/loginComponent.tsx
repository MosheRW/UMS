import React from "react";
import { useForm } from "react-hook-form";
import { Button, Form, InputPassword, InputText, Label } from "../editUserComponenet/editUserComponenet.style";
import { api, LoginUser } from "../../api/api";
import { useDispatch } from "react-redux";
import { setUserName, setUserPassword, setUserToken } from "../../redux/features/userData/userDataSlice";
import { ErrorP } from "../loginPageComponent/loginPageComponent.style";

interface LoginComponent {
    user: { userName: string, password: string };
    onSubmit: (data: LoginUser | null) => void;
}

export default function LoginComponent({ ...props }: LoginComponent) {

    /** props */
    const { user = { userName: localStorage.getItem("userName"), password: "" }, onSubmit } = props;


    //hooks
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const dispatch = useDispatch();

    //handlers
    const onSubmitHandler = handleSubmit(async (data) => {
        const res = await api.login({ ...data } as LoginUser);
        if (!res?.token) {
            cancel();
        } else {
            dispatch(setUserName(data.username));
            dispatch(setUserPassword(data.password));
            console.assert(res?.token, 'there isnt a token in the response');
            dispatch(setUserToken(res?.token));
            onSubmit(data as LoginUser);
        }
    });

    const cancel = () => {
        reset();
        onSubmit(null);
    }

    return (

        < Form onSubmit={onSubmitHandler} >
            <hgroup>
                <h1>Login</h1>
            </hgroup>
            <Label htmlFor="user name">user name</Label>
            <InputText  {...register('username', { value: user?.userName, required: true })} />
            {errors.username && <ErrorP>user name is required</ErrorP>}
            <br />
            <Label htmlFor="password">password</Label>
            <InputPassword {...register('password', { value: user?.password, required: true })} />
            {errors.password && <ErrorP>password is required</ErrorP>}

            <br />
            <br />
            <Button type="submit">Save</Button>
            <br />
            <Button type="button" onClick={cancel}>Cancel</Button>
        </Form >


    );
}