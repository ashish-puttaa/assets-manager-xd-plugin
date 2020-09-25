const reactShim = require('../react-shim');
const AssetView = require('./asset-view.jsx');
const React = require('react');
const ReactDOM = require('react-dom');

const panel = document.createElement('div');

function show(event) {
   ReactDOM.render(<AssetView />, panel);
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
