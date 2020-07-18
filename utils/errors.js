function getError(errors, name) {
  return errors.find((error) => error.param === name);
}

function hasError(errors, name) {
  return getError(errors, name) !== undefined;
}

module.exports = { getError, hasError };
