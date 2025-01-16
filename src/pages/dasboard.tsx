import React, { useEffect } from 'react';
import DashboardComponent from '../components/dashboardComopnenet/dashboardComopnenet';
import { initUser, parseUser, User } from '../types/user/user';
import { useSelector } from 'react-redux';
import { selectIsLogedIn } from '../redux/features/userData/userDataSliceSelectors';
import { useNavigate } from 'react-router';
export default function Dashboard() {
    
    return <DashboardComponent />;
}