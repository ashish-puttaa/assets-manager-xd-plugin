const React = require('react');

const getElementDimesions = (ref) => {
   const [panelDimensions, setPanelDimensions] = React.useState({});

   React.useEffect(() => {
      ref.current.addEventListener('resize', (e) => {
         const dimensions = e.target.getBoundingClientRect();
         setPanelDimensions(dimensions);
      });
   }, []);

   return panelDimensions;
};

module.exports = getElementDimesions;
