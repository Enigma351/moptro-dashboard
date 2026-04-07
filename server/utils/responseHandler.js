/**
 * Utility to send standardized success responses.
 * @param {Response} res Express response object.
 * @param {number} statusCode HTTP status code.
 * @param {any} data Data to return.
 * @param {string} message Professional success message.
 */
export const sendSuccess = (res, statusCode, data = null, message = 'Success') => {
  const response = {
    status: 'success',
    message,
  };

  if (data) {
    response.data = data;
  }

  return res.status(statusCode).json(response);
};

export const sendError = (res, statusCode, message) => {
  return res.status(statusCode).json({
    status: statusCode.toString().startsWith('4') ? 'fail' : 'error',
    message,
  });
};
