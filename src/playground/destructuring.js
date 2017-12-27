//
//  OBJECT destructuring
//


// const person = {
//   name: 'Andrew',
//   age: 27,
//   location: {
//     city: 'Philadelphia',
//     temp: 88
//   }
// };

// // const name = person.name;
// // const age = person.age;
// const { name: firstName = 'Anonymous', age } = person;       // object destructuring
// console.log(`${firstName} is ${age}.`);

// const { city, temp: temperature } = person.location;   // deep destructuring and renaming
// if (city && temperature) {
//   console.log(`It's ${temperature} in ${city}.`);
// }


// const book = {
//   title: 'Ego is the Enemy',
//   author: 'Ryan Holiday',
//   publisher: {
//     //name: 'Penguin'
//   }
// };

// const { name: publisherName = 'Self-Published' } = book.publisher;

// console.log(publisherName);


//
//  ARRAY destructuring
//

const address = ['1299 S Juniper Street', 'Philadelphia', 'Pennsylvania', '19147'];

// console.log(`You are in ${address[1]} ${address[2]}.`);

// const [street, city, state, zip] = address;     // destructure and name variables by location in the array
// const [, city, state = 'New York'] = address;     // when we only want certain positional values destructured into variables. Also, supplu default value if there is none.
// console.log(`You are in ${city} ${state}.`);


const item = ['Coffee (hot)', '$2.00', '$2.50', '$2.75'];
const [itemName, , mediumPrice] = item;
console.log(`A medium ${itemName} costs ${mediumPrice}`);