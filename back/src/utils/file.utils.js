export const getPart = (str, ind) => {
  if (str.includes("-")) {
    return str.split("-")[ind] || str;
  }
  return str;
};
