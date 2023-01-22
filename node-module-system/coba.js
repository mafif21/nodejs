function showName(name) {
  return `Hi my name is ${name}`;
}

const age = 21;

module.exports = { showName, age }; //kaya compact di laravel

// module.exports.showName = showName;
// module.exports.age = age;

// module.exports = {
//   showName: showName,
//   age: age,
// };
