import { useForm } from "react-hook-form";
import { Form, InputPassword, InputText, Label } from "../editUserComponenet/editUserComponenet.style";
import { api, LoginUser } from "../../api/api";
import React from "react";
import { useDispatch } from "react-redux";
import { setUserName, setUserPassword, setUserToken } from "../../redux/features/userData/userDataSlice";
interface LoginComponent {
    user: { userName: string, password: string },
    onSubmit: (data: any) => void
}

export default function LoginComponent({ ...props }: LoginComponent) {

    /** props */
    const { user = { userName: "", password: "" }, onSubmit } = props;


    //hooks
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const dispatch = useDispatch();
    //consts

    //states

    //helpers


    //handlers
    const onSubmitHandler = handleSubmit(async (data) => {
        console.log(data);
        const res = await api.login({ ...data } as LoginUser);
        console.log(res);
        dispatch(setUserName(data.username));
        dispatch(setUserPassword(data.password));
        dispatch(setUserToken(res.token));
        onSubmit(data)
    });

    //components


    return (

        < Form onSubmit={onSubmitHandler} >
            <hgroup>
                <h1>Login</h1>
            </hgroup>
            <Label htmlFor="user name">user name</Label>
            <InputText  {...register('username', { value: user?.userName, required: true })} />
            <br />
            <Label htmlFor="password">password</Label>
            <InputPassword {...register('password', { value: user?.password, required: true })} />
            <br />
            <br />
            <button type="submit">Save</button>
            <br />
            <button type="button" onClick={() => { reset(); onSubmit(null) }}>Cancel</button>
        </Form >


    );
}