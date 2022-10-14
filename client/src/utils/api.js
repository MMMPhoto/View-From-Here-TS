// Route to get All Photos
export const getAllPics = () => {
  return fetch("/api/pics/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getOnePic = (picId) => {
  return fetch(`/api/pics/${picId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const createNewUser = (userData) => {
  return fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
};

export const loginUser = (userData) => {
  return fetch("/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
};

export const getCurrentUser = (token) => {
  return fetch("/api/users/me", {
    headers: {
      "Content-Type": "application/json",
      // authorization: `Bearer ${token}`,
    },
  });
};

export const savePic = (picToSave, token) => {
  return fetch("/api/users", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(picToSave),
  });
};

export const deleteSavedPic = (picId, token) => {
  return fetch(`/api/users/${picId}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

// export {
//   getAllPics,
//   getOnePic,
//   createNewUser,
//   loginUser,
//   savePic,
//   deleteSavedPic,
//   getCurrentUser,
// };
