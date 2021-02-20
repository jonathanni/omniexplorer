export default (strings, ...keys) =>
  function (data) {
    const temp = strings.slice();
    keys.forEach((key, i) => {
      temp[i] += data[key];
    });
    return temp.join('');
  };
