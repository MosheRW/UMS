import React, { useEffect } from "react"
import { Container, Icon, IconContainer } from "./mainPageComponent.style";
import { useNavigate } from "react-router";
import { api } from "../../api/api";
import store from "../../redux/store";
import { setUserToken } from "../../redux/features/userData/userDataSlice";


export default function MainPageComponent() {

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
    }, );


    return (
        <Container>
            <IconContainer><Icon /></IconContainer>
        </Container>
    );
};
