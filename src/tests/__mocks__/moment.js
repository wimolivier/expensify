const moment = require.requireActual('moment');   // call the actual/original/real moment library (not the mock). See the Jest docs about manual mocks.

export default (timestamp = 0) => {               // define our own function that returns a static timestamp for testing
  return moment(timestamp);
};