import React, { useState, useEffect, useMemo } from "react";
import { initUser, parseUser, User } from "../../types/user/user";
import { Button, DashboardContainrer, InputCheckMark, DisplayManagmentConstainer, DisplayButtonsContainer, DisplayEditorContainer, DisplayButtonsContainerSub, DisplayUsersContainerContainer } from "./dashboardComopnenet.style";
import { DisplayUsersMobileEditionContainer, DisplayUsersContainer, DisplayUserMobileEdition, DisplayUserMobileEditionTable, DisplayUserMobileEditionBody, DisplayUserMobileEditionRow, DisplayUserMobileEditionLable, DisplayUserMobileEditionValue } from './dashboardComopnenet.style'
import { DisplayUsersBrowserEditionContainer, DisplayUsersBrowserEdition, DisplayUsersBrowserEditionHeader, DisplayUsersBrowserEditionBody, DisplayUsersBrowserEditionRow, DisplayUsersBrowserEditionHeaderCell, DisplayUsersBrowserEditionBodyCell } from './dashboardComopnenet.style';
import { MdEdit } from "react-icons/md";
import EditUserComponenet from "../editUserComponenet/editUserComponenet";
import { api } from "../../api/api";
import { useSelector } from "react-redux";
import Modal from "../modal/Modal";
import { BrowserView, MobileView, isMobile } from 'react-device-detect';
import Clickable from "../doubleClickWraper/doubleClickWraper";
import { useNavigate } from "react-router";
import { selectIsLogedIn } from "../../redux/features/userData/userDataSliceSelectors";
import { Label, Select } from "../../style/themes.style";


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

  const [sorted, setSorted] = useState<keyof User>("id");

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
        tempUsers && setUsers([...tempUsers]);
        setSorted(field);
      }

      !sorted && setSorted(field);
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
        Delete: () => <Button onClick={() => toggleHelpers.helpDeleteUser()}>Delete</Button>,
        Filter: () => <Button>filter: <br />
          <Select name="filter"
            value={sorted}
            onChange={(e) => toggleHelpers.helpSort(e.target.value as keyof User)}>
            {Object.keys(initUser()).map((key) => <option key={key}>{key}</option>)}
          </Select></Button>,
        Sort: () => <Button><Label>Sort: </Label>
          <Select name="sort"
            value={sorted}
            onChange={(e) => toggleHelpers.helpSort(e.target.value as keyof User)}>
            {Object.keys(initUser()).map((key) => <option key={key}>{key}</option>)}
          </Select></Button>,
        SelectAll: () => <Button onClick={() => toggleHelpers.helpSelectAll()}>{selectAll ? "Deselect All" : "Select All"}</Button>,
      }
    };

    return (
      <DisplayButtonsContainer
        className="displayButtonsContainer"
        $isWide={width && !isMobile}>
        <DisplayButtonsContainerSub
          $isWide={width && !isMobile}>
          <buttons.Components.Add />
          <buttons.Components.Delete />
          {isMobile && <buttons.Components.SelectAll />}
        </DisplayButtonsContainerSub>

        {isMobile && <DisplayButtonsContainerSub
          $isWide={!width && !isMobile}
        >
          <buttons.Components.Sort />
        </DisplayButtonsContainerSub>
        }
      </DisplayButtonsContainer>

    )
  };
  function DisplayEditor() {
    function CreateUser() {

      return <DisplayEditorContainer
        $isWide={width && !isMobile}>
        <EditUserComponenet
          headline={"Create User"}
          user={{} as User}
          onSubmit={handlers.handleCreateUser}
          onCancel={() => setDisplayAddUser(false)}
        /></DisplayEditorContainer>
    }
    function EditUser() {
      return <DisplayEditorContainer $isWide={width && !isMobile}><EditUserComponenet
        headline={"Edit User"}
        user={user2Edit}
        onSubmit={(user) => handlers.handleEditUser(user)}
        onCancel={() => {
          setUser2Edit(null);
        }}
      /></DisplayEditorContainer>
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
        <Display />
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
      keys2Display: ["id", "userName", "fullName", "email", "createdAt"] as Array<keyof User>,

      DisplayHeaders: () => {

        return (
          <DisplayUsersBrowserEditionHeader>
            <DisplayUsersBrowserEditionRow $isHeader>
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
      <DisplayUsersContainerContainer className="DisplayUsersContainerContainer">
      <DisplayUsersContainer className="DisplayUsersContainer">
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
      </DisplayUsersContainer>
      </DisplayUsersContainerContainer>)
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



  return (<>
    <DashboardContainrer>
      <DisplayManagment />
      <DisplayAnimations />
      <DisplayUsers />
    </DashboardContainrer></>
  )
}




