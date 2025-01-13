import React from 'react';
import { LogOutButton, TopBarContainer, TopBarContainerContainer } from './topBar.style';
import { IoMdLogOut } from "react-icons/io";
import { useNavigate } from 'react-router';

export default function TopBar() {
    const navigate = useNavigate();
    return <TopBarContainerContainer>
        <TopBarContainer>

            <LogOutButton onClick={() => {
                localStorage.clear();
                navigate("/login");
            }}><IoMdLogOut /></LogOutButton>

            <h1>User Management System</h1>

        </TopBarContainer>
    </TopBarContainerContainer>;
}