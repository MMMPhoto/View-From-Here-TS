// Route to get All Photos
const getAllPics = () => {
  return fetch("/api/pics/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const createNewUser = (userData) => {
  return fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
};

const loginUser = (userData) => {
  return fetch("/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
};

const getCurrentUser = (token) => {
  return fetch("api/users/me", {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};

const savePic = (picData, token) => {
  return fetch("/api/users", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(picData),
  });
};

const deleteSavedPic = (picId, token) => {
  return fetch(`/api/users/${picId}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export {
  getAllPics,
  createNewUser,
  loginUser,
  savePic,
  deleteSavedPic,
  getCurrentUser,
};
