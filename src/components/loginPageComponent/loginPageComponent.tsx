import React from "react";
import { LoginPageContainer, LoginPageContainerContainer } from "./loginPageComponent.style";
import LoginComponent from "../loginComponent/loginComponent";
import { useNavigate } from "react-router";
import store from "../../redux/store";
import { setUserToken } from "../../redux/features/userData/userDataSlice";

const basePath = "/ums";

export default function LoginPageComponent() {
    const navigate = useNavigate();


    return (
        <LoginPageContainerContainer className="LoginPageContainerContainer">
            <LoginPageContainer className="LoginPageContainer">
                <LoginComponent user={{
                    userName: localStorage.getItem("userName") || "",
                    password: ""
                }} onSubmit={(bool) => {
                    if (bool) {
                        navigate("/dashboard");
                    }
                }} />
            </LoginPageContainer>
        </LoginPageContainerContainer>

    );
};