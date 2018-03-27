function getErrorMessages(error) {
  if (error.details && error.details.length > 0) {
    return error.details.reduce((p, v) => {
      return `${p} ${v.message} </br>`;
    }, "");
  }
  return error.message;
}

module.exports = function (obj) {
  obj.getErrorMessages = getErrorMessages;
};
