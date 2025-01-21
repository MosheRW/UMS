import React from 'react';
import { Icon, LogOutButton, TitleAndIconContainer, TopBarContainer, TopBarContainerContainer, TopBarTitle } from './topBar.style';
import { IoMdLogOut } from "react-icons/io";
import { useNavigate } from 'react-router';
import { isMobile } from 'react-device-detect';


export default function TopBar() {
    const navigate = useNavigate();
    return <TopBarContainerContainer>
        <TopBarContainer $isMobile={isMobile}>

            <LogOutButton $isMobile={isMobile}
                onClick={() => {
                    localStorage.clear();
                    navigate("/login");
                }}><IoMdLogOut /></LogOutButton>

            <TitleAndIconContainer $isMobile={isMobile}>
                <TopBarTitle onClick={() => navigate("/")}>{!isMobile ? 'User Management System' : 'UMS'}</TopBarTitle>
                <Icon $isMobile={isMobile} />
            </TitleAndIconContainer>

        </TopBarContainer>
    </TopBarContainerContainer>;
}