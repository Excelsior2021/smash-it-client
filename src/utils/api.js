import axios from "axios";

const apiRoot = process.env.REACT_APP_SERVER_URL;

export const getUsers = async () => {
  try {
    const { data } = await axios.get(`${apiRoot}/users`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getProfile = async (username, groupName) => {
  try {
    const { data } = await axios.get(
      `${apiRoot}/users/profile/${groupName}/${username}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllGroups = async () => {
  try {
    const { data } = await axios.get(`${apiRoot}/groups/`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getUserGroups = async username => {
  try {
    const { data } = await axios.get(`${apiRoot}/groups/${username}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getGroup = async groupName => {
  try {
    const { data } = await axios.get(`${apiRoot}/groups/${groupName}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const addMemberToGroup = async (username, groupName) => {
  try {
    const { data } = await axios.post(`${apiRoot}/groups/add`, {
      username,
      groupName,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getMembers = async groupName => {
  try {
    const { data } = await axios.get(`${apiRoot}/groups/members/${groupName}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const addNewGroup = async (username, groupName) => {
  try {
    const { data } = await axios.post(`${apiRoot}/groups/new`, {
      username,
      groupName,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getGroupStats = async groupName => {
  try {
    const { data } = await axios.get(`${apiRoot}/stats/${groupName}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateStats = async (
  username,
  opponentUsername,
  scores,
  groupName
) => {
  try {
    const { data } = await axios.put(`${apiRoot}/stats/update-stats`, {
      username,
      opponentUsername,
      scores,
      groupName,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const authenticate = async () => {
  try {
    const { data } = await axios.get(`${apiRoot}/users/authenticate`, {
      headers: { authorization: localStorage.token },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const login = async formData => {
  try {
    const { data } = await axios.post(`${apiRoot}/users/login`, {
      formData,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createAccount = async formData => {
  try {
    await axios.post(`${apiRoot}/users/create-account`, { formData });
  } catch (error) {
    console.log(error);
  }
};

export const removeMemberFromGroup = async (username, groupName) => {
  try {
    await axios.delete(`${apiRoot}/groups/remove-member`, {
      data: {
        username,
        groupName,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
