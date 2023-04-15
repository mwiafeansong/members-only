exports.capitalizeWords = function (str) {
  const words = str.split(' ');
  if (words.length > 1) {
    const newStr = words
      .map((word) => {
        return word[0].toUpperCase() + word.substring(1);
      })
      .join(' ');

    return newStr;
  }

  return str.charAt(0).toUpperCase() + str.substring(1);
};

exports.capitalizeFirstWord = (str) => {
  let words = str.split(' ');
  words[0] = words[0].charAt(0).toUpperCase() + words[0].substring(1);
  newStr = words.join(' ');

  return newStr;
};
