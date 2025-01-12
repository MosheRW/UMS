import React, { useCallback, useEffect, useMemo } from "react";
import { User } from "../../types/user/user";
import { EditUserContainer, HeaderCell, InputCheckMark, Table, TableBody, TableCell, TableContainer, TableHeader, TableRow } from "./dashboardComopnenet.style";
import { MdEdit } from "react-icons/md";
import EditUserComponenet from "../editUserComponenet/editUserComponenet";
import { set } from "react-hook-form";




interface Dict {
  [key: string]: boolean;
}


interface DashboardComponent {
  users: User[]
}

export default function DashboardComponent({ ...props }: DashboardComponent) {

  //props
  const [dataChanged, setDataChanged] = React.useState<boolean>(false);
  const [usersDataDict, setUsersDataDict] = React.useState<Dict>({});
  const [selectAll, setSelectAll] = React.useState<boolean>(false);
  // const [onEdit, setOnEdit] = React.useState<boolean>(false);
  const [user2Edit, setUser2Edit] = React.useState<User | null>(null);

  const usersData = useMemo(() => {

    const dict: Dict = {}
    props.users.forEach((user) => { dict[user.id] = false });
    setUsersDataDict(dict);
    return props.users;
  }, [dataChanged]);

  //hooks
  useEffect(() => {
    console.log({ usersDataDict });
  }
    , [usersDataDict]);

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

  //components
  function UserRecordComponent(user: User, index: number) {
    return (<TableRow $odd={index % 2 === 1} key={'user :' + user.id}>
      <TableCell>{user.id}</TableCell>
      <TableCell $length={12}>{user.userName}</TableCell>
      <TableCell $length={20}>{user.fullName}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell $length={15}>{user.password}</TableCell>
      <TableCell $length={12}>{user.createdAt.toLocaleDateString()}</TableCell>
      <TableCell $length={0.01}>
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
      <button onClick={() => setDataChanged(!dataChanged)}>Refresh</button>
      <button onClick={() => { }}>delete</button>

      <TableContainer>
        <Table>
          <TableHeader>
            <TableRow $odd={0 % 2 === 1}>
              {Object.keys(usersData[0]).map((key) =>
                <HeaderCell key={key}>{key}</HeaderCell>)
              }
              <TableCell $length={0.01}><InputCheckMark checked={selectAll} onChange={headerCheckboxHandler} /></TableCell>

            </TableRow>
          </TableHeader>

          <TableBody>
            {usersData.map(UserRecordComponent)}
          </TableBody>
        </Table>


        {user2Edit &&
          <EditUserContainer>
            <EditUserComponenet user={user2Edit} onSubmit={(user) => setUser2Edit(null)} />
          </EditUserContainer>
        }


      </TableContainer>

    </>
  );
}