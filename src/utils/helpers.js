import { getUserGroups, getGroupStats, authenticate } from "./api";

//form validation checks **start**

export const isFormValid = (formState, setFormValid) => {
  let validity = true;
  for (const field in formState) {
    if (formState[field].trim() === "") {
      setFormValid(prevState => ({ ...prevState, [field]: false }));
      validity = false;
    } else {
      setFormValid(prevState => ({ ...prevState, [field]: true }));
    }
  }

  return validity;
};

export const isUsernameValid = (username, users, setUsernameValid) => {
  let validity = true;
  users.forEach(user => {
    if (user.username === username) validity = false;
  });
  setUsernameValid(validity);
  return validity;
};

export const isPasswordValid = (password, setPasswordValid) => {
  if (password.length < 6) {
    setPasswordValid(false);
    return false;
  }
  setPasswordValid(true);
  return true;
};

export const isPasswordCheckValid = (
  password,
  passwordCheck,
  setPasswordCheckValid
) => {
  if (password !== passwordCheck) {
    setPasswordCheckValid(false);
    return false;
  }
  setPasswordCheckValid(true);
  return true;
};

export const isGroupNameValid = (group, groups, setGroupNameValid) => {
  let validity = true;
  groups.forEach(group => {
    if (group.groupName === group) validity = false;
  });
  setGroupNameValid(validity);
  return validity;
};

//form validation checks **end**

//gets data on the user that has logged in.
//in order to use that data throughout the app.
export const getSessionData = async (
  data,
  setUser,
  setCurrentGroup,
  getMembersData,
  setUserGroups,
  setCurrentGroupStats,
  getAllGroupsData,
  login,
  setAdmin
) => {
  setUser(data);
  setCurrentGroup(data.groups.length > 0 ? data.groups[0].groupName : null);
  getMembersData(
    data.groups.length > 0 ? data.groups[0].groupName : null,
    data.username
  );
  setUserGroups(await getUserGroups(data.username));
  setCurrentGroupStats(
    await getGroupStats(
      data.groups.length > 0 ? data.groups[0].groupName : null
    )
  );
  await getAllGroupsData();
  login();
  data.groups[0].admin ? setAdmin(true) : setAdmin(false);
};

//checks if user is authenticated with a token to persist the session
export const checkAuthentication = async (
  setUser,
  setCurrentGroup,
  getMembersData,
  setUserGroups,
  setCurrentGroupStats,
  getAllGroupsData,
  login,
  setAdmin
) => {
  if (localStorage.token) {
    const data = await authenticate();
    getSessionData(
      data,
      setUser,
      setCurrentGroup,
      getMembersData,
      setUserGroups,
      setCurrentGroupStats,
      getAllGroupsData,
      login,
      setAdmin
    );
  }
};

//Record Match page validation checks **start**

//checks wether scores submitted from Record Match page are valid
//before sending the data to the server
export const isScoreValid = (scores, setScoresValid) => {
  let validity = false;
  if (
    parseInt(scores.userScore) === 11 ||
    parseInt(scores.opponentScore) === 11
  ) {
    validity = true;
  }
  setScoresValid(validity);
  return validity;
};

export const handleChosenMember = (chosenMember, setChosenMember) =>
  setChosenMember(chosenMember);

export const handleChangeOpponent = setChosenMember => setChosenMember(null);

export const handleWhitewash = (
  chosenMember,
  setModal,
  setScores,
  setScoreValid,
  submitState
) => {
  setModal(true);
  setScoreValid(true);
  if (chosenMember)
    if (submitState === "whitewashedUser") {
      setScores(prevState => ({
        userScore: 0,
        opponentScore: 6,
      }));
    }
  if (submitState === "whitewashedOpponent") {
    setScores(prevState => ({
      userScore: 6,
      opponentScore: 0,
    }));
  }
};

export const handleWinBy2 = (
  chosenMember,
  setModal,
  setScores,
  setScoreValid,
  submitState
) => {
  setModal(true);
  setScoreValid(true);
  if (chosenMember)
    if (submitState === "winBy2User") {
      setScores(prevState => ({
        userScore: 12,
        opponentScore: 10,
      }));
    }
  if (submitState === "winBy2Opponent") {
    setScores(prevState => ({
      userScore: 10,
      opponentScore: 12,
    }));
  }
};

export const handleSubmitScores = (
  chosenMember,
  scores,
  setModal,
  setScores,
  setScoresValid
) => {
  setModal(true);
  if (chosenMember)
    setScores(prevState => ({
      userScore: scores.userScore,
      opponentScore: scores.opponentScore,
    }));
  isScoreValid(scores, setScoresValid);
};

export const handleRecordMatchSubmit = (
  event,
  chosenMember,
  scores,
  setModal,
  setScores,
  setScoresValid,
  submitState
) => {
  event.preventDefault();

  switch (submitState) {
    case "whitewashedUser":
      handleWhitewash(
        chosenMember,
        setModal,
        setScores,
        setScoresValid,
        submitState
      );
      break;
    case "whitewashedOpponent":
      handleWhitewash(
        chosenMember,
        setModal,
        setScores,
        setScoresValid,
        submitState
      );
      break;
    case "winBy2User":
      handleWinBy2(
        chosenMember,
        setModal,
        setScores,
        setScoresValid,
        submitState
      );
      break;
    case "winBy2Opponent":
      handleWinBy2(
        chosenMember,
        setModal,
        setScores,
        setScoresValid,
        submitState
      );
      break;
    default:
      handleSubmitScores(
        chosenMember,
        scores,
        setModal,
        setScores,
        setScoresValid
      );
  }
};

//Record Match page validation checks **end**
