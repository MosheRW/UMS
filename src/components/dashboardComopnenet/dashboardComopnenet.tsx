import React, { useCallback, useEffect, useMemo } from "react";
import { initUser, User } from "../../types/user/user";
import { EditUserContainer, HeaderCell, InputCheckMark, ModalContainer, Table, TableBody, TableCell, TableContainer, TableHeader, TableRow } from "./dashboardComopnenet.style";
import { MdEdit } from "react-icons/md";
import EditUserComponenet from "../editUserComponenet/editUserComponenet";
import { set } from "react-hook-form";
import { api } from "../../api/api";
import { useDispatch, useSelector } from "react-redux";
import { setUserToken } from "../../redux/features/userData/userDataSlice";
import ReactDOM from "react-dom";
import LoginComponent from "../loginComponent/loginComponent";
import { selectIsLogedIn } from "../../redux/features/userData/userDataSliceSelectors";





interface Dict {
  [key: string]: boolean;
}


interface DashboardComponent {
  users: User[]
}

export default function DashboardComponent({ ...props }: DashboardComponent) {

  const [dataChanged, setDataChanged] = React.useState<boolean>(false);
  const [usersDataDict, setUsersDataDict] = React.useState<Dict>({});
  const [selectAll, setSelectAll] = React.useState<boolean>(false);
  const [user2Edit, setUser2Edit] = React.useState<User | null>(null);

  const dispatch = useDispatch();

  //hooks
  const displayLogin = useSelector(selectIsLogedIn);

  const usersData = useMemo(() => {
    if (displayLogin) 
      {api.getAllUsers().then((data) => props.users += data).finally(() => setDataChanged(!dataChanged));}
    const dict: Dict = {}
    props.users.forEach((user) => { dict[user.id] = false });
    setUsersDataDict(dict);
    return props.users;
  }, [dataChanged, displayLogin]);



  //consts


  //states


  //helpers



  //handlers
  function checkboxHandler(id: string) {
    return () => {
      console.log({ id });
      const dict = { ...usersDataDict };
      dict[id] = !dict[id];
      setUsersDataDict(dict);

      if (selectAll) {
        setSelectAll(false);
      }
    }
  };

  function headerCheckboxHandler() {
    console.log('hello');
    if (selectAll) {
      setSelectAll(false);
      const dict: Dict = {}
      props.users.forEach((user) => { dict[user.id] = false });
      setUsersDataDict(dict);
    } else {
      setSelectAll(true);
      const dict: Dict = {}
      props.users.forEach((user) => { dict[user.id] = true });
      setUsersDataDict(dict);
    }

  }

  function handleDelete() {

  };

  //components
  function UserRecordComponent(user: User, index: number) {
    return (<TableRow $odd={index % 2 === 1} key={'user :' + user.id}>
      <TableCell>{user.id}</TableCell>
      <TableCell $length={12}>{user.userName}</TableCell>
      <TableCell $length={20}>{user.fullName}</TableCell>
      <TableCell $length={20}>{user.email}</TableCell>
      <TableCell $length={5}>{user.password}</TableCell>
      <TableCell $length={12}>{user.createdAt.toLocaleDateString()}</TableCell>
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
      <button onClick={async () => {
        setDataChanged(!dataChanged);
        // const data = await api.login({ username: 'test1', password: '1234' });
        // console.log(data.token);
        // dispatch(setUserToken(data.token));
        const data2 = await api.getAllUsers();
        console.log(data2);


      }}>Refresh</button>
      <button onClick={() => {

      }}>delete</button>

      <TableContainer>
        <Table>
          <TableHeader>
            <TableRow $odd={0 % 2 === 1}>
              {Object.keys(initUser()).map((key) =>
                <HeaderCell key={key}>{key}</HeaderCell>)}
              <HeaderCell >
                <InputCheckMark checked={selectAll}
                  onChange={headerCheckboxHandler} /></HeaderCell>
            </TableRow>
          </TableHeader>

          {usersData && usersData?.length > 0 && <TableBody>
            {usersData.map(UserRecordComponent)}
          </TableBody>}
        </Table>


        {user2Edit &&
          <EditUserContainer>
            <EditUserComponenet user={user2Edit} onSubmit={(user) => setUser2Edit(null)} />
          </EditUserContainer>
        }



      </TableContainer>

      {!displayLogin && ReactDOM.createPortal(<ModalContainer>
        <LoginComponent user={{
          userName: "",
          password: ""
        }} onSubmit={function (data: any): void {
          // throw new Error("Function not implemented.");
        }} /> </ModalContainer>, document.body)}

    </>
  );
}