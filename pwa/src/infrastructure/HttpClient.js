import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import UserManager from '../lib/userManager';

const authentication = (url) => {
    return ({ Authorization: `Basic ${UserManager.Load()?.credentials}` })
}

export const HttpClient = {
    Post,
    Get,
    Put,
    GetAll,
}

export function useHttpClient(url, method, getResult, body) {

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [error, setError] = useState();


    useEffect(() => {

        HttpClient[method || "Get"](url, JSON.stringify(body))
            .then(result => {

                if (getResult)
                    result = getResult(result);

                setData(result);
                setLoading(false);
            })
            .catch(error => {

                setLoading(false);
                setError(error);
            })

    }, [])

    return [loading, data, error]

}



async function Post(url, model) {
    const request = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            ...authentication(url)
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
            ...authentication(url)
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
            ...authentication(url),
            'Content-Type': 'application/json'
        },
    }

    return fetch(url, request).then(handleResponse, handleError);
}
function GetAll(url) {
    const request = {
        method: "GET",
        headers: {
            ...authentication(url),
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