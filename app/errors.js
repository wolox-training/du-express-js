// const { message } = require('prompt');

const internalError = (message, internalCode) => ({
  message,
  internalCode
});

exports.DATABASE_ERROR = 'database_error';
exports.databaseError = message => internalError(message, exports.DATABASE_ERROR);

exports.DEFAULT_ERROR = 'default_error';
exports.defaultError = message => internalError(message, exports.DEFAULT_ERROR);

exports.EXTERNAL_API_ERROR = 'external_api_error';
exports.external_api_error = message => internalError(message, exports.EXTERNAL_API_ERROR);

exports.INPUT_DATA_ERROR = 'input_data_error';
exports.input_data_error = message => internalError(message, exports.INPUT_DATA_ERROR);
