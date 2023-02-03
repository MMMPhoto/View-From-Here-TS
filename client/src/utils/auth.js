// Decode a token and get the user's information out of it
import decode from "jwt-decode";

// Get user data
export function getToken() {
  // Retrieves the user token from localStorage
  return localStorage.getItem("id_token");
};

// Check if token is expired
export function isTokenExpired(token) {
  try {
    const decoded = decode(token);
    if (decoded.exp < Date.now() / 1000) {
      return true;
    } else return false;
  } catch (err) {
    return false;
  };
};

// Get profile of current user
export function getProfile() {
  return decode(getToken());
};

// Check if user's logged in
export function loggedIn() {
  // Checks if there is a saved token and it's still valid
  const token = getToken();
  return !!token && !isTokenExpired(token); // handwaiving here
};

// Log in user
export function login(idToken) {
  // Saves user token to localStorage
  localStorage.setItem("id_token", idToken);
};

// Log out user
export function logout() {
  // Clear user token and profile data from localStorage
  localStorage.clear();
  // this will reload the page and reset the state of the application
  window.location.assign("/");
};
