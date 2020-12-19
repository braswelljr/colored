const arrayify = (array, length) => {
  for (let index = 0; index < length; index++) {
    var RandStr = Math.floor(Math.random() * 16777215).toString(16);
    array.push(`#${RandStr}`);
  }

  return [...new Set(array)].filter(
    (color) => color.length === 7 || color.length === 4
  );
};

export default arrayify;
