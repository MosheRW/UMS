import React, { useEffect, useState } from 'react';
import { api } from '../api/api';
import store from '../redux/store';
import { setUserToken } from '../redux/features/userData/userDataSlice';
import { useNavigate } from 'react-router';

export default function Main() {
    // load the user detailes from local storage
    // if user is not logged in, redirect to login
    // else rediret to dashboard
    const navigate = useNavigate();

    useEffect(() => {
        api.getAllUsers(false).then((data) => {
            const token = localStorage.getItem("userToken");
            if (data) {
                if (token && token.length > 0) {
                    store.dispatch(setUserToken(token));
                    navigate("/dashboard");
                }
            } else if (token) {
                localStorage.removeItem("userToken");
                navigate("/login");
            } else {
                navigate("/login");
            }
        }
        );
    }, []);


    return <div>wellcome!!!</div>;
}