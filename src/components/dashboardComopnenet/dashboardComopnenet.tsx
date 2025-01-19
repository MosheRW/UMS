import React, { useState, useEffect, useMemo } from "react";
import { initUser, parseUser, User } from "../../types/user/user";
import { Button, DashboardContainrer, HeaderCell, InputCheckMark, UsersListContainer, ManagementArea, ManagmentButtons, MangmantEditorsModal, MobileUserRecord, MobileUserRecordBody, MobileUserRecordContainer, Row, Table, TableBody, TableCell, TableContainer, TableHeader, TableLabel, TableRow, TableValue, DisplayManagmentConstainer, DisplayButtonsContainer, DisplayEditorContainer } from "./dashboardComopnenet.style";
import { DisplayUsersMobileEditionContainer, DisplayUsersContainer, DisplayUserMobileEdition, DisplayUserMobileEditionTable, DisplayUserMobileEditionBody, DisplayUserMobileEditionRow, DisplayUserMobileEditionLable, DisplayUserMobileEditionValue } from './dashboardComopnenet.style'
import { DisplayUsersBrowserEditionContainer, DisplayUsersBrowserEdition, DisplayUsersBrowserEditionHeader, DisplayUsersBrowserEditionBody, DisplayUsersBrowserEditionRow, DisplayUsersBrowserEditionHeaderCell, DisplayUsersBrowserEditionBodyCell } from './dashboardComopnenet.style';
import { MdEdit } from "react-icons/md";
import EditUserComponenet from "../editUserComponenet/editUserComponenet";
import { api } from "../../api/api";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../modal/Modal";
import { BrowserView, MobileView, isMobile, isBrowser } from 'react-device-detect';
import Clickable from "../doubleClickWraper/doubleClickWraper";
import { useNavigate } from "react-router";
import { selectIsLogedIn } from "../../redux/features/userData/userDataSliceSelectors";
import { f, h } from "react-router/dist/development/fog-of-war-DLtn2OLr";
import { set } from "react-hook-form";

/**
 * handleCreateUser
 * handleEditUser
 * handelDeleteUser
 * handleSort
 * handleFilter
 * 
 * displayUsers
 * * all users details 
 * 
 * displayButtons
 * * add
 * * delete
 * * filter
 * 
 * displayEditor
 * * editNew
 * * editEcsist
 * 
 * displayAnimations
 * * animation for loading
 * * animation for somthing happend
 * 
 * displayUsersForBrowser:
 * * table.
 * * headersWithSortingAndMarker.
 * * userRecordForTableWithMarkerAndEditor.
 * 
 * displayUsersForMobile:
 * * list.
 * * userCardForListThatsClickableAndChangeColors.
 * 
 * displayManagmentForWideBrowser(at the side):
 * * displayButtons
 * * displayEditor
 * 
 * displayMnagmentForBrowser(pop up):
 * displayButtonsAboveTheTable.
 * displayEditorInModal.
 * 
 * displayManagmentForMobile(navigation):
 * displayButtonsAboveTheTable.
 * * addButtonForSorting.
 * navigateToEditorsPages.
 */
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

  const [width, setWidth] = useState(window.innerWidth > 1300);


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

  useEffect(() => {
    setWidth(window.innerWidth > 1300);
  }, [window.innerWidth])
  /************************************* */
  const handlers = {
    handleReload: (bool = true) => {
      bool && api.getAllUsers().then((data) => {
        data && setUsers(data?.map(parseUser));
      });
      displayAddUser && setDisplayAddUser(false);
      user2Edit && setUser2Edit(null);
    },
    handleCreateUser: async (user: User) => {
      user && api.postAnewUser(user, true).then((data) => handlers.handleReload());
    },
    handleEditUser: async (user: User) => {
      user && api.updateAUser(user.id, user, true).then((data) => handlers.handleReload());
    },
    handleDelete: () => {
      for (const key in usersDataDict) {
        if (usersDataDict[key]) {
          api.deleteAUser(key, true).then((data) => {
            api.getAllUsers().then((data) => { data && setUsers(data?.map(parseUser)); });
          });
        }
      }
    },
    handleSort: (field: keyof User) => {
      function sort(user1: User, user2: User) {
        if (!field) return 1;
        if (!user1) return -1;
        if (!user2) return 1;

        const val1 = user1[field];
        const val2 = user2[field];

        if (val1 == null) return -1;
        if (val2 == null) return 1;

        return val1 > val2 ? 1 : -1;
      };

      if (users) {
        const tempUsers = users?.sort(sort);
        tempUsers && setUsers(tempUsers);
      }
    },
    handleFilter: (field: keyof User) => {
      function filter(user1: User) {
        /* TODO: handleFilter*/
        return true;
      };

      if (users) {
        const tempUsers = users?.filter(filter)
        tempUsers && setUsers(tempUsers);
      }
    }
  };

  const toggleHelpers = {
    helpCreateUser: (bool: boolean) => {
      if (isMobile) {
        navigate("/createUser");
        return;
      }
      bool && user2Edit && setUser2Edit(null);
      setDisplayAddUser(bool);
    },
    helpEditUser: (user: User | null) => {
      if (isMobile) {
        navigate("/EditUser", { state: user2Edit });
        return;
      }
      user && displayAddUser && setDisplayAddUser(false);
      user && user !== user2Edit && setUser2Edit(user) || user2Edit && setUser2Edit(null);
    },
    helpDeleteUser: () => {
      handlers.handleDelete();
    },
    helpSort: (field: keyof User) => {

      isMobile && console.log('not implemanted yet');

      handlers.handleSort(field);
    },
    helpFilter: (field: keyof User) => {
      handlers.handleFilter(field);
      /* TODO: handleFilter*/
    },
    helpCheck: (userId: string) => {
      return () => {
        const dict = { ...usersDataDict };
        dict[userId] = !dict[userId];
        setUsersDataDict(dict);

        if (selectAll) {
          setSelectAll(false);
        }
      }
    },
    helpSelectAll: () => {
      const newState = !selectAll;
      setSelectAll(newState);
      const dict: Dict = {}
      users && users.forEach((user) => { dict[user.id] = newState });
      setUsersDataDict(dict);
    }
  };



  function DisplayButtons() {
    const buttons = {
      handlers: {},
      Components: {
        Add: () => <><Button onClick={() => toggleHelpers.helpCreateUser(!displayAddUser)}>Add</Button></>,
        Delete: () => <><Button onClick={() => toggleHelpers.helpDeleteUser()}>Delete</Button></>,
        Filter: () => <><Button onClick={() => toggleHelpers.helpFilter("id")}>Filter</Button></>,
        Sort: () => <><Button onClick={() => toggleHelpers.helpSort("id")}>Sort</Button></>,
      }
    };

    return (
      <DisplayButtonsContainer
        $isWide={width && !isMobile}>
        <buttons.Components.Add />
        <buttons.Components.Delete />
        <buttons.Components.Filter />
        {isMobile && <buttons.Components.Sort />}
      </DisplayButtonsContainer>
    )
  }

  function DisplayEditor() {
    function CreateUser() {
      return <EditUserComponenet
        headline={"Create User"}
        user={{} as User}
        onSubmit={handlers.handleCreateUser}
        onCancel={() => {
          setDisplayAddUser(false);
        }}
      />
    }
    function EditUser() {
      return <EditUserComponenet
        headline={"Edit User"}
        user={user2Edit}
        onSubmit={handlers.handleEditUser}
        onCancel={() => {
          setUser2Edit(null);
        }}
      />
    }
    function Display() {

      if (width)
        return (displayAddUser && <CreateUser /> || user2Edit && <EditUser /> || <></>);
      else return <>
        <Modal isOpen={displayAddUser}
          onClose={() => setDisplayAddUser(false)}
          closeOnClickOutside
          fullScreen>
          <CreateUser />
        </Modal>

        <Modal isOpen={user2Edit !== null}
          onClose={() => setUser2Edit(null)}
          closeOnClickOutside
          fullScreen>
          <EditUser />
        </Modal>
      </>

    }

    return (
      <BrowserView>
        <DisplayEditorContainer
          $isWide={width && !isMobile}>
          <Display />
        </DisplayEditorContainer>

        {!width && !isMobile && <Display />}
      </BrowserView>
    )
  }

  function DisplayUsers() {

    function intoCamelCase(str: string) {
      const firstUpperCharCode = 'A'.charCodeAt(0);
      const lastUpperCharCode = 'Z'.charCodeAt(0);

      const firstLowerCharCode = 'a'.charCodeAt(0);
      const lastLowerCharCode = 'z'.charCodeAt(0);

      const delte = firstLowerCharCode - firstUpperCharCode;

      let outString: string = '';

      if (str.charCodeAt(0) >= firstUpperCharCode && str.charCodeAt(0) <= lastLowerCharCode)
        outString += `${String.fromCharCode(str.charCodeAt(0) - delte)}`;

      for (let i = 1; i < str.length; i++) {
        const charCode = str.charCodeAt(i);
        if (charCode >= firstUpperCharCode && charCode <= lastUpperCharCode)
          outString += ` ${String.fromCharCode(charCode + delte)}`;
        else
          outString += String.fromCharCode(charCode);
      }
      return outString;
    }


    const browserEdition = {
      keys2Display: ["userName", "fullName", "email", "createdAt"] as Array<keyof User>,

      DisplayHeaders: () => {

        return (
          <DisplayUsersBrowserEditionHeader>
            <DisplayUsersBrowserEditionRow $odd={false}>
              {browserEdition.keys2Display.map((key, index) => {
                return <DisplayUsersBrowserEditionHeaderCell>
                  {intoCamelCase(key)}
                </DisplayUsersBrowserEditionHeaderCell>
              })}
              <DisplayUsersBrowserEditionHeaderCell>
                <InputCheckMark
                  checked={selectAll}
                  onChange={() => toggleHelpers.helpSelectAll()} />
              </DisplayUsersBrowserEditionHeaderCell>
            </DisplayUsersBrowserEditionRow>
          </DisplayUsersBrowserEditionHeader>)
      },
      DisplayUsers: () => {
        return (
          <DisplayUsersBrowserEditionBody>
            {users && users.map((user, index) => {
              return <DisplayUsersBrowserEditionRow $odd={index % 2 === 0}>
                {browserEdition.keys2Display.map((key, index) => {
                  const value = user && user[key];
                  return <DisplayUsersBrowserEditionBodyCell>
                    {value instanceof Date ? value.toLocaleString() : value}
                  </DisplayUsersBrowserEditionBodyCell>
                })}
                <DisplayUsersBrowserEditionBodyCell>
                  <InputCheckMark
                    checked={usersDataDict[user.id]}
                    onChange={toggleHelpers.helpCheck(user.id)} />
                  <MdEdit onClick={() => toggleHelpers.helpEditUser(user)} />
                </DisplayUsersBrowserEditionBodyCell>

              </DisplayUsersBrowserEditionRow>
            })}

          </DisplayUsersBrowserEditionBody>)
      },
      Display: () => {
        return (
          <DisplayUsersBrowserEdition>
            <browserEdition.DisplayHeaders />
            <browserEdition.DisplayUsers />
          </DisplayUsersBrowserEdition>)

      }
    };

    const mobileEdition = {
      keys2Display: ["userName", "fullName", "email"] as Array<keyof User>,
      DisplayHeaders: ({ label }: { label: keyof User }) => {
        return <DisplayUserMobileEditionLable>{intoCamelCase(label)}</DisplayUserMobileEditionLable>
      },
      DisplayDetails: ({ user, label }: { user: User, label: keyof User }) => {
        const value = user && user[label];
        return <DisplayUserMobileEditionValue>
          {value instanceof Date ? value.toLocaleString() : value}
        </DisplayUserMobileEditionValue>
      },
      Display: (user: User) => {
        return <Clickable key={'user : + Clickable' + user.id}
          onDoubleClick={() => toggleHelpers.helpEditUser(user)}
          onClick={toggleHelpers.helpCheck(user.id)}>
          <DisplayUserMobileEdition
            $isChoosen={usersDataDict[user?.id]}>

            <DisplayUserMobileEditionTable>
              <DisplayUserMobileEditionBody>

                {mobileEdition.keys2Display.map((field, index) => {
                  return <DisplayUserMobileEditionRow>
                    <mobileEdition.DisplayHeaders key={`keyof DisplayHeaders ${user.id}`} label={field} />
                    <mobileEdition.DisplayDetails user={user} label={field} />
                  </DisplayUserMobileEditionRow>
                })}

              </DisplayUserMobileEditionBody>
            </DisplayUserMobileEditionTable>

          </DisplayUserMobileEdition>
        </Clickable>
      }
    }

    return (
      <DisplayUsersContainer>
        <BrowserView>
          <DisplayUsersBrowserEditionContainer>
            <browserEdition.Display />
            {/* {users && users.map(browserEdition.Display)} */}
          </DisplayUsersBrowserEditionContainer>
        </BrowserView>

        <MobileView>
          <DisplayUsersMobileEditionContainer>
            {users && users.map(mobileEdition.Display)}
          </DisplayUsersMobileEditionContainer>
        </MobileView>
      </DisplayUsersContainer>)
  }


  function DisplayAnimations() {
    /**  TODO: displayAnimations
        * for loading
        * for special occasions
        */

    return <></>
  };


  function DisplayManagment() {
    return (
      <DisplayManagmentConstainer
        $isWide={width && !isMobile}>
        <DisplayButtons />
        <DisplayEditor />
      </DisplayManagmentConstainer>

    )
  }



  function Done() {
    return (
      <>
        {/*direction should be according to isMobile*/}
        <DisplayManagment />
        <DisplayAnimations />
        <DisplayUsers />
      </>
    )
  }





  return <Done />

  /************************************************************************** */
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
            onChange={headerCheckboxHandler} />
        </HeaderCell>
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