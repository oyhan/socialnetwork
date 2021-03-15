import UserManager from './userManager';
import axios from 'axios'
import { toast } from 'react-toastify';
const authentication = {};
if (typeof window !== 'undefined') {
    const authentication = { Authorization: `Bearer ${document.cookie.jwt}` }

}
export const BrowserHttpClient = {
    Post,
    Get,
    Put,
    MultiPartFormData,
    GetModel
}

async function MultiPartFormData(url, data) {
    console.log('data: ', data);
    
    const formData = new FormData();

    for (const name in data) {
        formData.append(name, data[name]);
    }


    try {
        const response = await fetch(url, {
            method: 'POST',
            body: formData
        });
        return handleResponse(response);
    } catch (error) {
        return handleError(error);

    }
}

function GetModel(url) {
    const request = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            ...authentication
        },
    }
    return axios.get(url, {
        auth: { username: 'demo', password: "demo" }
    }).then(handleResponse, handleError)
    return fetch(url, request).then(handleResponse, handleError)
}
async function Post(url, model) {
    const request = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            ...authentication
        },
        body: model
    }
    try {
        const response = await fetch(url, request);
        return handleResponse(response);
    }
    catch (error) {
        return handleError(error);
    }
}
async function Put(url, model) {
    const request = {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            ...authentication
        },
        body: model
    }
    try {
        const response = await fetch(url, request);
        return handleResponse(response);
    }
    catch (error) {
        return handleError(error);
    }
}
function Get(url) {
    const request = {
        method: "GET",
        headers: {
            ...authentication,
            'Content-Type': 'application/json'
        },
    }
    // return axios.get(url, {
    //     auth: { username: 'demo', password: "demo" }
    // }).then(handleResponse, handleError)
    return fetch(url, request).then(handleResponse, handleError);
}
function GetAll(url) {
    const request = {
        method: "GET",
        headers: {
            ...authentication,
            'Content-Type': 'application/json'
        },
    }
    return fetch(url, request).then(handleResponse, handleError);
}
function handleResponse(response) {

    if (response.status == 401) {
        UserManager.Save(null);
        toast.info("نیاز به ورود مجدد دارید...")
        setTimeout(() => {
            window.location = "/";
        }, 3000)
    }
    return new Promise((resolve, reject) => {
        if (response.ok) {
            // return json if it was returned in the response
            var contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                try {
                    response.json().then(json => resolve(json));
                } catch (error) {
                }
            } else {
                resolve();
            }
        }
        else {
            // return error message from response body
            response.text().then(text => {
                try {
                    var json = JSON.parse(text);
                    if (json.message) {
                        reject(json.message);
                    }
                    var errorMessage = "";
                    for (var prop in json)
                        errorMessage += json[prop];
                    reject(errorMessage);
                } catch (e) {
                    reject(text);
                }
            });
        }
    });
}
function handleError(error) {

    return Promise.reject(error && error.message);
}