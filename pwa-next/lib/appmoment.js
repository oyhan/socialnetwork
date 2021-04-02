require('moment/locale/fa');

 const appMoment = require('moment-jalaali')
appMoment.loadPersian({ dialect: 'persian-modern' })


  export {appMoment};