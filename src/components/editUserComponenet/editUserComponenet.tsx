import react, { use, useEffect, useMemo } from 'react';
import { User } from '../../types/user/user';
import { Button, Container, Form, InputEmail, InputPassword, InputText, InputWithLabelAndErrorsWrapper, InputWithLabelWrapper, Label } from './editUserComponenet.style';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from "@hookform/error-message"

import { ErrorP } from '../loginPageComponent/loginPageComponent.style';
import { on } from 'events';

interface EditUserComponenet {
    user: User | null;
    headline?: string;
    onSubmit: (data: any) => void;
    onCancel?: () => void
}

export default function EditUserComponenet({ ...props }: { user: User | null, headline?: string, onCancel?: () => void, onSubmit: (data: any) => void }) {

    const { user = {
        id: "",
        userName: "",
        fullName: "",
        email: "",
        password: "",
        createdAt: new Date(),
        token: "",
    }, headline = "Edit User",
        onCancel = () => {

        }, onSubmit } = props;

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    useEffect(() => {
        console.log(user);
        reset();
    }, [user])
    return (
        <Container className='editUserContainer'>
            <Form onSubmit={handleSubmit((data) => { console.log(data); onSubmit(data) })} >
                <hgroup>
                    <h1>{headline}</h1>
                </hgroup>

                <InputWithLabelAndErrorsWrapper>
                    <InputWithLabelWrapper>
                        <Label htmlFor="full name">full name</Label>
                        <InputText
                            autoComplete="off"
                            placeholder='enter your full name'
                            {...register('fullName', {
                                value: user?.fullName,
                                required: "full name is required",
                                pattern: {
                                    value: /^[a-zA-Z]+( [a-zA-Z]+)+$/,
                                    message: "enter a valid name, with at least 2 words"
                                }
                            })} />

                    </InputWithLabelWrapper>
                    <ErrorMessage errors={errors} name="fullName" render={({ message }) => <ErrorP>{message}</ErrorP>} />

                </InputWithLabelAndErrorsWrapper>

                <InputWithLabelAndErrorsWrapper>
                    <InputWithLabelWrapper>

                        <Label htmlFor="user name">user name</Label>
                        <InputText
                            autoComplete="off"
                            placeholder='enter your user name'
                            {...register('username', {
                                value: user?.userName,
                                required: "userName is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9_]+$/,
                                    message: "enter a valid user name, english letters, numbers and underscores"
                                },
                                maxLength: {
                                    value: 20,
                                    message: "This input exceed maxLength.",
                                },
                            })} />
                    </InputWithLabelWrapper>

                    <ErrorMessage errors={errors} name="username" render={({ message }) => <ErrorP>{message}</ErrorP>} />
                </InputWithLabelAndErrorsWrapper>

                <InputWithLabelAndErrorsWrapper>
                    <InputWithLabelWrapper>

                        <Label htmlFor="email">email</Label>
                        <InputEmail
                            autoComplete="off"
                            placeholder='enter your email'
                            {...register('email', { value: user?.email, required: "email is required" })} />
                    </InputWithLabelWrapper>
                    <ErrorMessage errors={errors} name="email" render={({ message }) => <ErrorP>{message}</ErrorP>} />
                </InputWithLabelAndErrorsWrapper>

                <InputWithLabelAndErrorsWrapper>
                    <InputWithLabelWrapper>
                        <Label htmlFor="password">password</Label>
                        <InputPassword
                            autoComplete="off"
                            placeholder='enter your password'
                            {...register('password', { value: user?.password, required: true })} />
                    </InputWithLabelWrapper>
                </InputWithLabelAndErrorsWrapper>


                <Button type="submit">Save</Button>

                <Button type="button" onClick={() => { reset(); onSubmit(null); onCancel(); }}>Cancel</Button>

            </Form>
        </Container>
    )
}