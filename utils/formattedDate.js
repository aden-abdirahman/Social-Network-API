const moment = require('moment');

function formattedDate(date) {
    return moment(date).format("YYYY-MM-dd_hh-mm-ss");
}

module.exports = { formattedDate }