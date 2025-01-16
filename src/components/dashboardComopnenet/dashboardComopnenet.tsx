import React, { useState, useEffect, useMemo } from "react";
import { initUser, parseUser, User } from "../../types/user/user";
import { Button, DashboardContainrer, HeaderCell, InputCheckMark, UsersListContainer, ManagementArea, ManagmentButtons, MangmantEditorsModal, MobileUserRecord, MobileUserRecordBody, MobileUserRecordContainer, Row, Table, TableBody, TableCell, TableContainer, TableHeader, TableLabel, TableRow, TableValue } from "./dashboardComopnenet.style";
import { MdEdit } from "react-icons/md";
import EditUserComponenet from "../editUserComponenet/editUserComponenet";
import { api } from "../../api/api";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../modal/Modal";
import { BrowserView, MobileView, isMobile, isBrowser } from 'react-device-detect';
import Clickable from "../doubleClickWraper/doubleClickWraper";
import { useNavigate } from "react-router";
import { selectIsLogedIn } from "../../redux/features/userData/userDataSliceSelectors";


interface Dict {
  [key: string]: boolean;
}


interface DashboardComponent {
  users?: User[]
}

export default function DashboardComponent({ ...props }: DashboardComponent) {

  const [users, setUsers] = useState<User[] | null>(null);

  const [usersDataDict, setUsersDataDict] = useState<Dict>({});
  const [selectAll, setSelectAll] = useState<boolean>(false);

  const [displayAddUser, setDisplayAddUser] = useState<boolean>(false);
  const [user2Edit, setUser2Edit] = useState<User | null>(null);


  const isLogedIN = useSelector(selectIsLogedIn);
  const navigate = useNavigate();



  useEffect(() => {
    api.getAllUsers().then((data) => props.users = data).then((data) => {
      data && setUsers(data?.map(parseUser));
    });

  }, [])


  useEffect(() => {
    if (selectAll) {
      const dict: Dict = {}
      users && users.forEach((user) => { dict[user.id] = true });
      setUsersDataDict({ ...dict });
    }
  }, [users])

  function setDisplayAddUserWraper(bool: boolean) {
    bool && user2Edit && setUser2Edit(null);
    setDisplayAddUser(bool);
  }

  function setUser2EditWraper(user: User | null) {
    user && displayAddUser && setDisplayAddUser(false);
    setUser2Edit(user);
  }

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
    const newState = !selectAll;
    setSelectAll(newState);
    const dict: Dict = {}
    users && users.forEach((user) => { dict[user.id] = newState });
    setUsersDataDict(dict);
  }


  function handleDelete() {
    for (const key in usersDataDict) {
      if (usersDataDict[key]) {
        api.deleteAUser(key, true).then((data) => {
          api.getAllUsers().then((data) => { data && setUsers(data?.map(parseUser)); });
        });
      }
    }
  }

  function handleDisplayAddUser() {
    isMobile ? navigate("/createUser") :
      setDisplayAddUserWraper(!displayAddUser);
  }

  function CreateUserComponent({ reload }: { reload: (bool?: boolean) => void }) {
    return (
      <EditUserComponenet
        headline={"Create User"}
        user={{} as User}
        onSubmit={(user: any) => {
          user && api.postAnewUser(user, true).then((data) => reload()) || reload(false);
        }} />
    );
  }


  function UserRecordComponent(user: User, index: number) {
    return (isBrowser &&
      <TableRow $odd={index % 2 === 1} key={'user :' + user.id}>
        <TableCell>{user.id}</TableCell>
        <TableCell $length={12}>{user.userName}</TableCell>
        <TableCell $length={20}>{user.fullName}</TableCell>
        <TableCell $length={20}>{user.email}</TableCell>
        <TableCell $length={5}>{user.password}</TableCell>
        <TableCell $length={12}>{user?.createdAt !== null && user.createdAt.toLocaleDateString()}</TableCell>
        <TableCell $length={2}>
          <InputCheckMark checked={usersDataDict[user.id]} onChange={checkboxHandler(user.id)} />
          <MdEdit onClick={() => setUser2EditWraper(user)} />
        </TableCell>
      </TableRow>
    );
  }

  function UserCardComponent(user: User, index: number) {
    return <Clickable key={'user : + Clickable' + user.id}
      onDoubleClick={() => setUser2EditWraper(user)}
      onClick={checkboxHandler(user.id)}>
      <MobileUserRecordContainer
        key={'user :' + user.id}
        $choosen={useMemo(() => usersDataDict[user.id], [usersDataDict[user.id]])}>
        <MobileUserRecord>
          <MobileUserRecordBody>
            <Row>
              <TableLabel>User Name:</TableLabel>
              <TableValue>{user.userName}</TableValue>
            </Row>
            <Row>
              <TableLabel>Full Name:</TableLabel>
              <TableValue>{user.fullName}</TableValue>
            </Row>
            <Row>
              <TableLabel>Email:</TableLabel>
              <TableValue>{user.email}</TableValue>
            </Row>
          </MobileUserRecordBody>
        </MobileUserRecord>
      </MobileUserRecordContainer>
    </Clickable>
  }



  function DisplayTableHeader() {
    return (<TableHeader>
      <TableRow $odd={true}>
        {Object.keys(initUser()).map((key) =>
          <HeaderCell key={key}>{key}</HeaderCell>)}
        <HeaderCell >
          <InputCheckMark checked={selectAll}
            onChange={headerCheckboxHandler} /></HeaderCell>
      </TableRow>
    </TableHeader>
    );
  }

  function DisplayTableBody() {
    return users && users?.length > 0 && <TableBody key={'DisplayTableBody'}>
      {users?.map(UserRecordComponent)}
    </TableBody> || isBrowser && <tbody key={'DisplayTableBody body'}></tbody> || <div key={'DisplayTableBody div'}></div>;
  }

  function DisplayUsersList() {
    return users && users?.length > 0 && <UsersListContainer key={'DisplayTableBody'}>
      {users?.map(UserCardComponent)}
    </UsersListContainer> || <></>
  }

  function DisplayTable() {
    return (
      <TableContainer>
        <Table>
          <DisplayTableHeader />

          <DisplayTableBody />
        </Table>

      </TableContainer>
    );
  }

  function DisplayManagmentArea() {
    if (window.innerWidth >= 1300) {
      return (
        <ManagementArea>
          <br />
          <Button onClick={handleDelete}>Delete</Button>
          <br />
          <Button onClick={handleDisplayAddUser}>add user</Button>
          <br />


          {user2Edit &&
            <EditUserComponenet user={user2Edit} onSubmit={(user) => {
              user && api.updateAUser(user2Edit.id, user, true).then((data) => {
                api.getAllUsers().then((data) => {
                  data && setUsers(data?.map(parseUser))
                });
              });
              setUser2EditWraper(null);
            }} />
          }

          {displayAddUser &&
            <CreateUserComponent reload={(bool = true) => {
              bool && api.getAllUsers().then((data) => {
                data && setUsers(data?.map(parseUser));
              });
              setDisplayAddUserWraper(!displayAddUser);
            }} />
          }
        </ManagementArea>
      );
    } else {
      return (
        <>
          <ManagmentButtons>
            <br />
            <Button onClick={handleDelete}>Delete</Button>
            <br />
            <Button onClick={handleDisplayAddUser}>add user</Button>
            <br />
          </ManagmentButtons>

          <Modal isOpen={user2Edit !== null}
            onClose={() => setUser2EditWraper(null)}
            closeOnClickOutside
            fullScreen>
            <MangmantEditorsModal>
              <EditUserComponenet
                user={user2Edit}
                onSubmit={(user) => {
                  user && user2Edit && api.updateAUser(user2Edit?.id, user, true).then((data) => {
                    api.getAllUsers().then((data) => {
                      data && setUsers(data?.map(parseUser))
                    });
                  });
                  setUser2EditWraper(null);
                }} />
            </MangmantEditorsModal>
          </Modal>


          <Modal isOpen={displayAddUser}
            onClose={() => setDisplayAddUserWraper(false)}
            closeOnClickOutside
            fullScreen>
            <MangmantEditorsModal>
              <CreateUserComponent
                reload={(bool = true) => {
                  bool && api.getAllUsers().then((data) => {
                    data && setUsers(data?.map(parseUser));
                  });
                  setDisplayAddUserWraper(!displayAddUser);
                }} />
            </MangmantEditorsModal>

          </Modal>

        </>
      );
    }
  }

  return (
    <>
      <BrowserView>
        <DashboardContainrer>
          <DisplayTable />
          <DisplayManagmentArea />
        </DashboardContainrer>
      </BrowserView>

      <MobileView>
        <DashboardContainrer>
          <DisplayUsersList />
          <DisplayManagmentArea />
        </DashboardContainrer>
      </MobileView>
    </>
  );
}