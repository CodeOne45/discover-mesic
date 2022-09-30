import { BehaviorSubject } from 'rxjs';
import Router from 'next/router';

import {fetchWrapper} from '../helpers/fetch-wrapper';

import { API_URL } from "../constant/url";


const userSubject = new BehaviorSubject(typeof window!== "undefined"?JSON.parse(localStorage.getItem('user')):"" )


export const userService = {
    
    user: userSubject.asObservable(),
    get userValue () { return userSubject.value },
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    resendEmail,
    delete: _delete,
    getUserProfilById,
    login_google,
    add_to_playlist,
};

function login(username: string, password: string) {

    return fetchWrapper.post(`${API_URL}/users/login`, { username, password })
        .then(user => {
            // publish user to subscribers and store in local storage to stay logged in between page refreshes
            userSubject.next(user);
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        });
}

function login_google() {
    //const router = useRouter();

    return fetchWrapper.get(`${API_URL}/auth/google`)
        .then(user => {
            // publish user to subscribers and store in local storage to stay logged in between page refreshes
            userSubject.next(user);
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        });
}

function logout() {
    // remove user from local storage, publish null to user subscribers and redirect to login page
    localStorage.removeItem('user');
    userSubject.next(null);
    Router.push('/account/login');
}

function register(user) {
    return fetchWrapper.post(`${API_URL}/users/register`, user);
}

function getAll() {
    return fetchWrapper.get(`${API_URL}/users/`);
}

function getById(id: string) {
    return fetchWrapper.get(`${API_URL}/users/${id}`);
}

function getUserProfilById (id: string){
    return fetchWrapper.get(`${API_URL}/users/userprofile/${id}`);
}

function update(id, params) {
    return fetchWrapper.put(`${API_URL}/users/${id}`, params)
        .then(x => {
            // update stored user if the logged in user updated their own record
            if (id === userSubject.value.id) {
                // update local storage
                const user = { ...userSubject.value, ...params };
                localStorage.setItem('user', JSON.stringify(user));

                // publish updated user to subscribers
                userSubject.next(user);
            }
            return x;
        });
}

function resendEmail(email){
    return fetchWrapper.post(`${API_URL}/users/resend`,email);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id) {
    return fetchWrapper.delete(`${API_URL}/users/${id}`);
}

function add_to_playlist(id: string , data: {}){
    return fetchWrapper.put(`${API_URL}/users/playlist/${id}`, data);
}
