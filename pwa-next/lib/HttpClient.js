// import UserManager from './userManager';
import axios from 'axios'
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import UserManagerBuilder from './userManager';
import { getCookieParser } from 'next/dist/next-server/server/api-utils';

// var user = UserManager.Load();
// if (!user) {
//     user = {
//         credentials: "ZGVtbzpkZW1v"
//     }
// }
var httpContext;

// export default function useHttpClient(url, method, body){


//     const [loading, setLoading] = useState(true);
//     const [data, setData] = useState();
//     const [error, setError] = useState();

//     useEffect(() => {

//         HttpClient[method](url, JSON.stringify(body))
//             .then(result => {
//                 setLoading(false);
//                 setData(result);
//             })
//             .catch(error => {
//                 setLoading(false);
//                 setError(error);
//             })

//     },[])

//     return [loading,data,error]

// }
export const HttpClient = {
    SetContext: function (context) {
        httpContext = context;
    },
    Post,
    Get,
    Put,
    GetAll,
    GetModel
}

function authentication (){
  var cookies = getCookieParser(httpContext.req)();
    return { Authorization: `Bearer ${cookies.jwt}`};
}

export default function httpClientBuilder(httpContext) {
    HttpClient.SetContext(httpContext);
    return HttpClient;
}

function GetModel(url) {
    const request = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            ...authentication()
        },
    }
    return axios.get(url, {
        auth: { username: 'demo', password: "demo" }
    }).then(handleResponse, handleError)
    return fetch(url, request).then(handleResponse, handleError)
}
async function Post(url, model,header) {
    const request = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            ...authentication(),
            ...header
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
            ...authentication()
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
            ...authentication(),
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
            ...authentication(),
            'Content-Type': 'application/json'
        },
    }
    return fetch(url, request).then(handleResponse, handleError);
}
function handleResponse(response) {


    if (response.status == 401) {
        var userManager = UserManagerBuilder(httpContext,HttpClient);
        userManager.
        Post("http://localhost:12089/User/RefreshToken/refresh-token",)
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
