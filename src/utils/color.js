const arrayify = (length) => {
  let array = [];
  for (let index = length; index > 0; index--) {
    array.push(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
  }

  return [...new Set(array)].filter(
    (color) => color.length === 7 || color.length === 4
  );
};

export default arrayify;
