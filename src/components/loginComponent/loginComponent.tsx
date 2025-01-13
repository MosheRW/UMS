import { useForm } from "react-hook-form";
import { Button, Form, InputPassword, InputText, Label } from "../editUserComponenet/editUserComponenet.style";
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
        console.log(data);
        const res = await api.login({ ...data } as LoginUser);
        if (!res?.token) {
            cancel();
        } else {
            dispatch(setUserName(data.username));
            dispatch(setUserPassword(data.password));
            dispatch(setUserToken(res?.token));
            onSubmit(data)
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
            <br />
            <Label htmlFor="password">password</Label>
            <InputPassword {...register('password', { value: user?.password, required: true })} />
            <br />
            <br />
            <Button type="submit">Save</Button>
            <br />
            <Button type="button" onClick={cancel}>Cancel</Button>
        </Form >


    );
}