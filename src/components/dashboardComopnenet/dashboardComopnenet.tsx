import React, { useState, useEffect, useMemo } from "react";
import { initUser, parseUser, User } from "../../types/user/user";
import { Button, DashboardContainrer, HeaderCell, InputCheckMark, ManagementArea, Table, TableBody, TableCell, TableContainer, TableHeader, TableRow } from "./dashboardComopnenet.style";
import { MdEdit } from "react-icons/md";
import EditUserComponenet from "../editUserComponenet/editUserComponenet";
import { set } from "react-hook-form";
import { api } from "../../api/api";
import { useDispatch, useSelector } from "react-redux";
import { setUserToken } from "../../redux/features/userData/userDataSlice";
import ReactDOM from "react-dom";
import LoginComponent from "../loginComponent/loginComponent";
import { selectIsLogedIn } from "../../redux/features/userData/userDataSliceSelectors";
import Modal from "../modal/modal";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import CreateUserComponent from "../editUserComponenet/createUserComponent";
import { setIsSyncing } from "../../redux/features/syncStatus/syncStatusSlice";




interface Dict {
  [key: string]: boolean;
}


interface DashboardComponent {
  users: User[]
}

export default function DashboardComponent({ ...props }: DashboardComponent) {
  const isLogedIN = useSelector(selectIsLogedIn);
  const isSynced = useSelector(selectIsLogedIn);

  const [usersDataDict, setUsersDataDict] = useState<Dict>({});
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [user2Edit, setUser2Edit] = useState<User | null>(null);

  const [users, setUsers] = useState<User[] | null>(null);
  const [displayAddUser, setDisplayAddUser] = useState<boolean>(false);


  const dispatch = useDispatch();
  //hooks

  useEffect(() => {
    console.log({ isSynced });

  }, [isSynced]);

  useEffect(() => {
    api.getAllUsers().then((data) => props.users = data).then((data) => {
      console.log({ data });
      data && setUsers(data?.map(parseUser));
      dispatch(setIsSyncing(true));
    });

  }, [])

  useEffect(() => {
    if (!isSynced && isLogedIN) {
      api.getAllUsers().then((data) => props.users = data).then((data) => {
        console.log({ data });

        data && setUsers(data?.map(parseUser));
        dispatch(setIsSyncing(true));
      });
    }
  }, [isSynced])


  useEffect(() => {
    if (!isSynced && isLogedIN) {
      api.getAllUsers().then((data) => props.users = data).then((data) => {
        data && setUsers(data?.map(parseUser));
        console.log({ data });
        dispatch(setIsSyncing(true));
      });
    }
  }, [isLogedIN])


  useEffect(() => {
    const dict: Dict = {}
    props.users.forEach((user) => { dict[user.id] = false });
    setUsersDataDict(dict);
  }, [users])


  //consts


  //states


  //helpers



  //handlers
  function checkboxHandler(id: string) {
    return () => {
      const dict = { ...usersDataDict };
      dict[id] = !dict[id];
      setUsersDataDict(dict);

      if (selectAll) {
        setSelectAll(false);
      }
    }
  };

  function headerCheckboxHandler() {
    if (selectAll) {
      console.log(1);
      setSelectAll(false);
      const dict: Dict = {}
      props.users.forEach((user) => { dict[user.id] = false });
      setUsersDataDict(dict);
    } else {
      console.log(2);

      setSelectAll(true);
      const dict: Dict = {}
      props.users.forEach((user) => { dict[user.id] = true });
      setUsersDataDict(dict);
    }

  }


  function handleDelete() {

    for (const key in usersDataDict) {
      if (usersDataDict[key]) {
        api.deleteAUser(key).then((data) => {
          api.getAllUsers().then((data) => { data && setUsers(data?.map(parseUser)); });
        });
        dispatch(setIsSyncing(false));

      }
    }
  }
  function handleDisplayAddUser() {
    setDisplayAddUser(!displayAddUser);
  }
  //components
  function UserRecordComponent(user: User, index: number) {
    return (<TableRow $odd={index % 2 === 1} key={'user :' + user.id}>
      <TableCell>{user.id}</TableCell>
      <TableCell $length={12}>{user.userName}</TableCell>
      <TableCell $length={20}>{user.fullName}</TableCell>
      <TableCell $length={20}>{user.email}</TableCell>
      <TableCell $length={5}>{user.password}</TableCell>
      <TableCell $length={12}>{user?.createdAt !== null && user.createdAt.toLocaleDateString()}</TableCell>
      <TableCell $length={2}>
        <InputCheckMark checked={usersDataDict[user.id]} onChange={checkboxHandler(user.id)} />
        <MdEdit onClick={() => {
          user2Edit && setUser2Edit(null);
          setUser2Edit(user);
          console.log(user);
        }} />
      </TableCell>

    </TableRow>);
  }

  return (
    <>



      <DashboardContainrer>
        <TableContainer>
          <Table>
            <TableHeader>
              <TableRow $odd={true}>
                {Object.keys(initUser()).map((key) =>
                  <HeaderCell key={key}>{key}</HeaderCell>)}
                <HeaderCell >
                  <InputCheckMark checked={selectAll}
                    onChange={headerCheckboxHandler} /></HeaderCell>
              </TableRow>
            </TableHeader>

            {users && users?.length > 0 && <TableBody>
              {users?.map(UserRecordComponent)}
            </TableBody>}
          </Table>

        </TableContainer>

        <ManagementArea>
            <br />
            <Button onClick={handleDelete}>Delete</Button>
            <br />
            <Button onClick={handleDisplayAddUser}>add user</Button>
            <br />


          {user2Edit &&
            <EditUserComponenet user={user2Edit} onSubmit={(user) => {
              user && api.updateAUser(user2Edit.id, user).then((data) => {
                api.getAllUsers().then((data) => {
                  data && setUsers(data?.map(parseUser))
                });
              });
              setUser2Edit(null);
              // dispatch(setIsSyncing(false));
            }} />
          }

          {displayAddUser &&
            <CreateUserComponent reload={(bool = true) => {
              bool && api.getAllUsers().then((data) => {
                data && setUsers(data?.map(parseUser));
              });
              setDisplayAddUser(!displayAddUser);
            }} />
          }

        </ManagementArea>

      </DashboardContainrer>

      <Modal display={!isLogedIN} >
        <LoginComponent user={{
          userName: "",
          password: ""
        }} onSubmit={(bool = true) => { bool && api.getAllUsers().then((data) => { data && setUsers(data?.map(parseUser)) }); }} />
      </Modal>


    </>
  );
}