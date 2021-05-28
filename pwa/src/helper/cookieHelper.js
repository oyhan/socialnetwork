import cookieCutter from 'cookie-cutter';
import UserManager from '../lib/userManager';
var moment = require('moment-jalaali')

export function setCredentials(response) {
    UserManager.Save(response.user)
    save(response, 5);
}
export function removeCredentials() {
    save({ user: {} }, -5);
}

function save(response, days) {


    const expireDate = moment().add(days, 'days').toDate();


    const opts = { path: "/", expires: expireDate };

    cookieCutter.set('refreshToken', response.refreshToken, opts);
    cookieCutter.set('jwt', response.token, opts);
}