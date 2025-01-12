import React from 'react';
import { Outlet } from 'react-router';
import TopBar from '../components/topBar/topBar';
import styled from 'styled-components';
import CheenBar from '../components/cheenBar/cheenBar';

const Container = styled.div`
    background-color:  ${({theme})=>theme.backgroundColor};
    width: 100%;
    height: 100%;
`

export default function Layout() {
    return (<Container>
        <TopBar />
        <Outlet />
        <CheenBar />
    </Container>
    );
}