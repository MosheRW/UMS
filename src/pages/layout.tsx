import React from 'react';
import { Outlet } from 'react-router';
import TopBar from '../components/topBar/topBar';
import styled from 'styled-components';
import CheenBar from '../components/cheenBar/cheenBar';

const Container = styled.div`
body {
    background-color: ${({ theme }) => theme.background};
}
    width: 100%;
    height: 100%;
`

export default function Layout() {
    return (<Container>
        <TopBar />
        <Outlet />
    </Container>
    );
}