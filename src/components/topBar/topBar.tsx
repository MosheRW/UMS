import React from 'react';
import { LogOutButton, TopBarContainer, TopBarContainerContainer, TopBarTitle } from './topBar.style';
import { IoMdLogOut } from "react-icons/io";
import { useNavigate } from 'react-router';
import { isMobile } from 'react-device-detect';

export default function TopBar() {
    const navigate = useNavigate();
    return <TopBarContainerContainer>
        <TopBarContainer>

            <LogOutButton $isMobile={isMobile}
                onClick={() => {
                    localStorage.clear();
                    navigate("/login");
                }}><IoMdLogOut /></LogOutButton>



            <TopBarTitle>User Management System</TopBarTitle>

        </TopBarContainer>
    </TopBarContainerContainer>;
}