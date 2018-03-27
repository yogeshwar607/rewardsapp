const mongoose = require('mongoose');

function isSpecialChar(str, withAmpersand = true) {
  const re = withAmpersand ? /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\':<>\?]/g : /[~`!#$%\^*+=\-\[\]\\';,/{}|\\':<>\?]/g
  const _isSpecialChar = re.test(str);
  return _isSpecialChar;
}

function isNumeric(num) {
  return !isNaN(num);
}

function isValidEmailAddress(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\']+(\.[^<>()[\]\\.,;:\s@\']+)*)|(\'.+\'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function getFirstAndLastNames(fullName) {
  return {
    firstName: fullName.split(' ').slice(0, -1).join(' '),
    lastName: fullName.split(' ').slice(-1).join(' '),
  };
}

function toObjectId(arg) {
  if (arg.constructor === Array) {
    return arg.map((val) => {
      return new mongoose.Types.ObjectId(val);
    });
  }
  return new mongoose.Types.ObjectId(arg);
}

function getSortColumnName(columns, order) {
  return columns[order[0]['column']]['name'];
}

function getSortColumnOrder(order) {
  return order[0]['dir'] === 'asc' ? 1 : -1;
}

// fetch data from query string and populate it to pagination filter
function getPaginationFilter(query) {
  const skip = parseInt(query.start, 10) || 0;
  const limit = parseInt(query.length, 10) || 10;
  const draw = parseInt(query.draw, 10);
  const search = query.search;
  const columns = query.columns;
  const order = query.order;
  const dbColumnName = getSortColumnName(columns, order);
  const sortOrder = getSortColumnOrder(order);
  const sort = {};
  sort[dbColumnName] = sortOrder;
  return { skip, limit, sort, draw, search };
}


module.exports = {
  isSpecialChar,
  isNumeric,
  isValidEmailAddress,
  getFirstAndLastNames,
  getPaginationFilter,
  toObjectId,
};