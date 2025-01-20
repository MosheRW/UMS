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
    if (!isLogedIN) {
      navigate("/");
    }
  }, [isLogedIN])

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
      user2Edit && user && api.updateAUser(user2Edit.id, user, true).then((data) => handlers.handleReload());
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
      console.log(2, { field });
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
        console.log(3, { field });

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

      console.log({ field });
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
        Add: () => <Button onClick={() => toggleHelpers.helpCreateUser(!displayAddUser)}>Add</Button>,
        Filter: () => <Button onClick={() => toggleHelpers.helpFilter("id")}>Filter</Button>,
        Delete: () => <Button onClick={() => toggleHelpers.helpDeleteUser()}>Delete</Button>,
        // Edit: () => <Button onClick={() => toggleHelpers.helpEditUser()}>Edit</Button>,
        Sort: () => <Button onClick={() => toggleHelpers.helpSort("id")}>Sort</Button>,
      }
    };

    useEffect(() => {
      const bool = width && !isMobile;
      console.log({ bool, $isWide: width && !isMobile });
    }
      , [])

    return (
      <DisplayButtonsContainer
        className="displayButtonsContainer"
        $isWide={width && !isMobile}>
        <buttons.Components.Add />
        <buttons.Components.Delete />
        {/* {isMobile && <buttons.Components.Edit />} */}
        <buttons.Components.Filter />
        {isMobile && <buttons.Components.Sort />}
      </DisplayButtonsContainer>
    )
  };
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
        onSubmit={(user) => handlers.handleEditUser(user)}
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
          // closeOnClickOutside
          fullScreen>
          <CreateUser />
        </Modal>

        <Modal isOpen={user2Edit !== null}
          onClose={() => setUser2Edit(null)}
          // closeOnClickOutside
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
  };
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
                return <DisplayUsersBrowserEditionHeaderCell onClick={() => toggleHelpers.helpSort(key)}>
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



  return (
    <DashboardContainrer>
      <DisplayManagment />
      <DisplayAnimations />
      <DisplayUsers />
    </DashboardContainrer>
  )
}




