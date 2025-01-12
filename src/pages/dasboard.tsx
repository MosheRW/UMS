import React from 'react';
import DashboardComponent from '../components/dashboardComopnenet/dashboardComopnenet';
import { User } from '../types/user/user';
import {users} from '../full_users_list';
export default function Dashboard() {

    return <DashboardComponent users={users} />;
}