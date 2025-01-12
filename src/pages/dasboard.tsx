import React, { useEffect } from 'react';
import DashboardComponent from '../components/dashboardComopnenet/dashboardComopnenet';
import { initUser, parseUser, User } from '../types/user/user';
import { api } from '../api/api';
import { users } from '../full_users_list';
import { useSelector } from 'react-redux';
import { selectIsLogedIn } from '../redux/features/userData/userDataSliceSelectors';
export default function Dashboard() {

    const isLogedIn = useSelector(selectIsLogedIn);

    const [usersZ, setUsersZ] = React.useState<User[]>([initUser()]);

    useEffect(() => {
        if (isLogedIn) {
            api.getAllUsers().then((data) => {
                console.log(data);
                setUsersZ(data.map(parseUser));
            });
        }
    }, [isLogedIn,]);




    return <DashboardComponent users={usersZ} />;
}