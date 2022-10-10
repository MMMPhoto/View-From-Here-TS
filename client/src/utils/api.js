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

export { getAllPics, createNewUser, loginUser };
