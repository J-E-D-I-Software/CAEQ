import axios from "axios";
import baseApiEndpoint from "../backendConfig";

/**
 * Sends a POST request to the '/admin/auth/login' endpoint with the provided email and password as the request body.
 *
 * @param {string} email - The email of the user attempting to log in.
 * @param {string} password - The password of the user attempting to log in.
 * @returns {Promise} - A Promise object that resolves to the data returned by the server.
 */
export async function postLoginCaeqUsers(email, password) {
  let endpoint = `${baseApiEndpoint}/caequsers/auth/login`;

  const body = {
    email,
    password,
  };
  const response = await axios.post(endpoint, body);
  return response.data;
}

export async function postSignupCaeqUsers(data) {
  const endpoint = `${baseApiEndpoint}/caequsers/auth/signup`;
  const response = await axios.post(endpoint, data);
  return response.data;
}
export async function postForgotCaeqUsers(email) {
  const endpoint = `${baseApiEndpoint}/forgotpassword`;

  const body = {
    email,
  };
  const response = await axios.post(endpoint, body);
  return response.data;
}
