const reactShim = require('../react-shim');
const App = require('./app.jsx');
const React = require('react');
const ReactDOM = require('react-dom');

const GlobalState = require('../context/globalState.jsx');

const panel = document.createElement('div');

function show(event) {
   ReactDOM.render(
      <GlobalState>
         <App />
      </GlobalState>,
      panel
   );
   event.node.appendChild(panel);
}

function update(selection) {}

function hide(event) {}

module.exports = {
   assetView: {
      show,
      update,
      hide,
   },
};
