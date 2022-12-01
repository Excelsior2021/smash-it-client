import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "./auth-context";
import {
  getUsers,
  getProfile,
  getMembers,
  getUserGroups,
  addNewGroup,
  login,
  createAccount,
  getAllGroups,
  getGroupStats,
  addMemberToGroup,
} from "../utils/api";
import {
  isFormValid,
  isUsernameValid,
  isPasswordCheckValid,
  isPasswordValid,
  getSessionData,
  checkAuthentication,
  isGroupNameValid,
} from "../utils/helpers";

const MainContext = React.createContext({
  user: null,
  admin: null,
  profile: null,
  members: null,
  allGroups: null,
  currentGroup: null,
  userGroups: null,
  currentGroupStats: null,
  getProfileData: username => {},
  getAllGroupsData: () => {},
  getMembersData: groupName => {},
  updateCurrentGroup: (username, groupName) => {},
  setCurrentGroupStats: currentGroupStats => {},
  sortGroupStats: field => {},
  changeGroup: groupName => {},
  isGroupValid: (newGroup, setNewGroupValid) => {},
  getLoginData: (event, loginFormData) => {},
  createAccountHandler: (event, registerFormData) => {},
});

export const MainContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [profile, setProfile] = useState(null);
  const [members, setMembers] = useState(null);
  const [allGroups, setAllGroups] = useState(null);
  const [userGroups, setUserGroups] = useState(null);
  const [currentGroup, setCurrentGroup] = useState(null);
  const [currentGroupStats, setCurrentGroupStats] = useState(null);

  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  //checks if client has token and auththenticates token on the server.
  //if client is authenticated, client is automatically logged in.
  //session persists for 24h.
  useEffect(() => {
    checkAuthentication(
      setUser,
      setCurrentGroup,
      getMembersData,
      setUserGroups,
      setCurrentGroupStats,
      getAllGroupsData,
      setAdmin,
      authCtx.login
    );
  }, []);

  useEffect(() => {
    if (!authCtx.isLoggedIn) {
      setUser(null);
      setAdmin(null);
      setProfile(null);
      setMembers(null);
      setAllGroups(null);
      setUserGroups(null);
      setCurrentGroup(null);
      setCurrentGroupStats(null);
    }
  }, [authCtx]);

  const getProfileData = async (username, groupName) =>
    setProfile(await getProfile(username, groupName));

  const getAllGroupsData = async () => setAllGroups(await getAllGroups());

  const getMembersData = async groupName => {
    setMembers(await getMembers(groupName));
  };

  const changeGroup = async (username, groupName, page) => {
    setCurrentGroup(groupName);
    await getMembersData(groupName);
    await getProfileData(username, groupName);
    setCurrentGroupStats(await getGroupStats(groupName));
    if (page === "group") navigate(`/group/${groupName}`);
  };

  const updateCurrentGroup = async (username, groupName) => {
    await addMemberToGroup(username, groupName);
    setUserGroups(await getUserGroups(username));
    setCurrentGroup(groupName);
    changeGroup(username, groupName);
  };

  const sortGroupStats = (field, reverse) => {
    if (field === "username") {
      setCurrentGroupStats(prevState =>
        prevState.sort((a, b) =>
          reverse
            ? b.username.localeCompare(a.username)
            : a.username.localeCompare(b.username)
        )
      );
      return;
    }
    setCurrentGroupStats(prevState =>
      prevState.sort((a, b) =>
        reverse ? a[field] - b[field] : b[field] - a[field]
      )
    );
  };

  const isGroupValid = async (
    newGroup,
    setNewGroupValid,
    setNewGroupNameValid
  ) => {
    const groups = await getAllGroups();
    if (
      isFormValid(newGroup, setNewGroupValid) &&
      isGroupNameValid(newGroup, groups, setNewGroupNameValid)
    ) {
      await addNewGroup(user.username, newGroup.groupName);
      setUserGroups(await getUserGroups(user.username));
      setCurrentGroup(newGroup.groupName);
      navigate(`/group/${newGroup.groupName}`);
    }
  };

  const getLoginData = async (
    event,
    loginFormData,
    setFormValid,
    setLoginInvalid
  ) => {
    event.preventDefault();
    if (isFormValid(loginFormData, setFormValid)) {
      const data = await login(loginFormData);
      if (!data) {
        setLoginInvalid(true);
      } else {
        localStorage.setItem("token", data.token);
        await getSessionData(
          data,
          setUser,
          setCurrentGroup,
          getMembersData,
          setUserGroups,
          setCurrentGroupStats,
          getAllGroupsData,
          setAdmin,
          authCtx.login
        );
      }
    }
  };

  const createAccountHandler = async (
    event,
    registerFormData,
    setFormValid,
    setUsernameValid,
    setPasswordValid,
    setPasswordCheckValid
  ) => {
    event.preventDefault();
    const usersData = await getUsers();

    const formValid = isFormValid(registerFormData, setFormValid, usersData);
    const usernameValid = isUsernameValid(
      registerFormData.username,
      usersData,
      setUsernameValid
    );
    const passwordValid = isPasswordValid(
      registerFormData.password,
      setPasswordValid
    );
    const passwordCheckValid = isPasswordCheckValid(
      registerFormData.password,
      registerFormData.passwordCheck,
      setPasswordCheckValid
    );

    if (formValid && usernameValid && passwordValid && passwordCheckValid) {
      await createAccount(registerFormData);
      const data = await login({
        username: registerFormData.username,
        password: registerFormData.password,
      });
      localStorage.setItem("token", data.token);
      setUser(data);
      authCtx.login();
      getAllGroupsData();
      navigate(`${data.username}/join-create`);
    }
  };

  return (
    <MainContext.Provider
      value={{
        user,
        admin,
        profile,
        allGroups,
        members,
        currentGroup,
        userGroups,
        currentGroupStats,
        getProfileData,
        getAllGroupsData,
        getMembersData,
        updateCurrentGroup,
        setCurrentGroupStats,
        sortGroupStats,
        changeGroup,
        isGroupValid,
        getLoginData,
        createAccountHandler,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default MainContext;
