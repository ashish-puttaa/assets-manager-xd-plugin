const React = require('react');

const watchValue = (value, name = 'provided value') => {
   React.useEffect(() => {
      console.log(name, 'changed = ', value);
   }, [value]);
};

module.exports = watchValue;
