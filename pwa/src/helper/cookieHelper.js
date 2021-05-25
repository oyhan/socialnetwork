import cookieCutter from 'cookie-cutter';
var moment = require('moment-jalaali')

export function setCredentials(response) {
    const userCookie = JSON.stringify(response.user);
    localStorage.setItem("user", userCookie);

    const expireDate = moment().add(5, 'days').toDate();
    

    const opts = { path: "/", expires: expireDate };

    cookieCutter.set('refreshToken', response.refreshToken, opts);
    cookieCutter.set('jwt', response.token, opts);
}