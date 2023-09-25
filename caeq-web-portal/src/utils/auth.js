import axios from 'axios';
import jwt_decode from 'jwt-decode';

/**
 * A function that returns access/refresh tokens based on whether they're requested.
 * @returns { String | null} The access and refresh tokens or null if neither were requested or found in localStorage.
 */
export function getToken() {
    let token = localStorage.getItem('authToken');
    if (token != null && token !== '') return token;
    return null;
}

/**
 * @function setToken
 * @param {String} token - the access token to set.
 * @returns {String|null} token
 */
export function setToken(token) {
    if (!(typeof token === 'string') || !token) return null;

    localStorage.setItem('authToken', token);
    return token;
}

/**
 * This function saves user data to local storage
 *
 * @param {Object} user - user data that will be stored in LocalStorage, need to be json serializable
 * @return {Object|null} - returns an object representing the saved user, or null if none found
 */
export async function setCaeqUserSaved(user) {
    if (user) {
        localStorage.setItem('caeqUser', JSON.stringify(user));
        return user;
    }
    return null;
}

/**
 * This function saves user data to local storage
 *
 * @param {Object} user - user data that will be stored in LocalStorage, need to be json serializable
 * @return {Object|null} - returns an object representing the saved user, or null if none found
 */
export async function setArchitectUserSaved(user) {
    if (user) {
        localStorage.setItem('architectUser', JSON.stringify(user));
        return user;
    }
    return null;
}

/**
 * This function saves user type data to local storage
 *
 * @param {Object} token - user type data that will be stored in LocalStorage, need to be json serializable
 * @return {Object|null} - returns an object representing the saved user, or null if none found
 */
export function setUserType(token) {
    const userType = jwt_decode(token).type;
    if (userType) {
        localStorage.setItem('userType', JSON.stringify(userType));
        return true;
    }
    return null;
}

/**
 * This function retrieves the user type data from local storage
 *
 * @return {String|null} - returns a string representing the type, or null if none found
 */
export function getUserType() {
    const type = localStorage.getItem('userType');
    if (type)
        return JSON.parse(type);
    return null;
}

/**
 * This function retrieves the saved archited user from local storage
 *
 * @returns {Object|null} - returns an object representing the saved user, or null if none found
 */
export function getArchitectUserSaved() {
    let user = localStorage.getItem('architectUser');
    if (user) {
        user = JSON.parse(user);
        return user;
    }
    return null;
}

/**
 * This function retrieves the saved staff user from local storage
 *
 * @returns {Object|null} - returns an object representing the saved user, or null if none found
 */
export function getCaeqUserSaved() {
    let user = localStorage.getItem('caeqUser');
    if (user) {
        user = JSON.parse(user);
        return user;
    }
    return null;
}

/**
 * This function checks if a user is authenticated by checking if there is a valid token and saved user
 *
 * @returns {bool} - true if user is authenticated, false otherwise
 */
export function isAuthenticated() {
    const user = getUserType() === 'caeq' ? getCaeqUserSaved() : getArchitectUserSaved();
    const token = getToken();
    if (user && token) {
        if (jwt_decode(token).id === user._id) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            return true;
        }
    }
    return false;
}

/**
 * Removes the 'adminUser' and 'authToken' keys from localStorage and reloads the page.
 *
 * @returns undefined
 */
export function logOut() {
    localStorage.removeItem('adminUser');
    localStorage.removeItem('architectUser');
    localStorage.removeItem('authToken');
    window.location.reload(false);
}
