import getConfig from 'next/config';

import {userService} from '../services/user.service';

import axios from "axios";

const { publicRuntimeConfig } = getConfig();

export const fetchWrapper = {
    get,
    post,
    put,
    delete: _delete
};

function get(url: any) {
    const requestOptions = {
        method: 'GET',
        url: url,
        headers: authHeader(url)
    };
    return axios(requestOptions);
}
 function post(url: any, body: any) {
    const requestOptions = {
        method: 'POST',
        url: url,
        headers: { 'Content-Type': 'application/json', ...authHeader(url) },
        credentials: 'include',
        data: JSON.stringify(body)  
    };
    const response = axios(requestOptions);
    return response;
}

function put(url: any, body: any) {
    const requestOptions = {
        method: 'PUT',
        url: url,
        headers: { 'Content-Type': 'application/json', ...authHeader(url) },
        data: JSON.stringify(body)
    };
    
    return axios(requestOptions);    
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(url: any) {
    const requestOptions = {
        method: 'DELETE',
        url: url,
        headers: authHeader(url)
    };
    return axios(requestOptions);    
}

// helper functions

function authHeader(url: any) {
    // return auth header with jwt if user is logged in and request is to the api url
    var user = userService.userValue;
    const isLoggedIn = user && user.token;
    const isApiUrl = url.startsWith(publicRuntimeConfig.apiUrl);
    if (isLoggedIn && isApiUrl) {
        return { Authorization: `Bearer ${user.token}` };
    } else {
        return {};
    }
}

function handleResponse(response: any) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        
        if (!response.ok) {
            if ([401, 403].includes(response.status) && userService.userValue) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                userService.logout();
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}