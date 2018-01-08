const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve({
      name: 'Wim',
      surname: 'Olivier',
      age: 43
    });
    // reject('Something went wrong!');
  }, 3000);
});

console.log('before');

promise.then((data) => {
  console.log(data);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('This is my other promise');
    }, 3000);
  });
}).then((str) => {
  console.log('does this run?', str)         // YES
}).catch((e) => {
  console.log('error:', e);
});

console.log('after');