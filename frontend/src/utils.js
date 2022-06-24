export const getError = (error) => {
  return error.response && error.response.data.message
    ? error.responmse.data.message
    : error.message;
};
