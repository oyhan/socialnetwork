require('moment/locale/fa');

var moment = require('moment-jalaali')
moment.loadPersian({ dialect: 'persian-modern' })

export function toHumanReadableDate(gregorianDate){
    

    var date = moment(gregorianDate);
    const datephrase = date.format("jMMMM jYYYY");
    return datephrase;
}   

export function toHumanReadableDateLong(gregorianDate){
    

    var date = moment(gregorianDate);
    const datephrase = date.format("jD jMMMM jYYYY");
    return datephrase;
}   