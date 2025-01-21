import React from 'react';
import { Outlet } from 'react-router';
import TopBar from '../components/topBar/topBar';

export default function Layout() {
    return (<>
        <TopBar />
        <Outlet />
    </>
    );
}