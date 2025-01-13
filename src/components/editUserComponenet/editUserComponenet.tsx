import react, { use, useEffect, useMemo } from 'react';
import { User } from '../../types/user/user';
import { Container, Form, InputEmail, InputPassword, InputText, Label } from './editUserComponenet.style';
import { useForm } from 'react-hook-form';

export default function EditUserComponenet({ ...props }: { user: User | null, headline?: string, onSubmit: (data: any) => void }) {

    const { user = {
        id: "",
        userName: "",
        fullName: "",
        email: "",
        password: "",
        createdAt: new Date(),
        token: "",        
    }, headline = "Edit User"
    , onSubmit } = props;

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    useEffect(() => {
        console.log(user);
        reset();
    }, [user])
    return (
        // <Container>
        <Form onSubmit={handleSubmit((data) => { console.log(data); onSubmit(data) })}>
            <hgroup>
                <h1>{headline}</h1>
            </hgroup>

            <Label htmlFor="full name">full name</Label>
            <InputText {...register('fullName', { value:user?.fullName, required: true})} />
            <br />
            <Label htmlFor="user name">user name</Label>
            <InputText  {...register('username', { value: user?.userName, required: true })} />
            <br />
            <Label htmlFor="email">email</Label>
            <InputEmail {...register('email', { value: user?.email, required: true })} />
            <br />
            <Label htmlFor="password">password</Label>
            <InputPassword {...register('password', { value: user?.password, required: true })} />
            <br />
            <br />
            <button type="submit">Save</button>
            <br />
            <button type="button" onClick={() => { reset(); onSubmit(null) }}>Cancel</button>
        </Form>
        // </Container>
    )
}