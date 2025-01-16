import React from "react";
import { LoginPageContainer, LoginPageContainerContainer } from "./loginPageComponent.style";
import LoginComponent from "../loginComponent/loginComponent";
import { useNavigate } from "react-router-dom";

const basePath = "/ums";

export default function LoginPageComponent() {
    const navigate = useNavigate();

    return (
        <LoginPageContainerContainer className="LoginPageContainerContainer">
            <LoginPageContainer className="LoginPageContainer">
                <LoginComponent user={{
                    userName: "",
                    password: ""
                }} onSubmit={(bool) => {
                    if (bool) {
                        navigate(basePath + "/dashboard");
                    }
                }} />
            </LoginPageContainer>
        </LoginPageContainerContainer>

    );
};