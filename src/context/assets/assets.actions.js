const AssetsActionTypes = require('./assets.types.js');

exports.setAllAssets = (dispatch, allAssets) => {
   dispatch({ type: AssetsActionTypes.SET_ALL_ASSETS, payload: allAssets });
};

exports.setSelectedAssets = (dispatch, selectedAssets) => {
   dispatch({ type: AssetsActionTypes.SET_SELECTED_ASSETS, payload: selectedAssets });
};

exports.setFilteredAssets = (dispatch, filteredAssets) => {
   dispatch({ type: AssetsActionTypes.SET_FILTERED_ASSETS, payload: filteredAssets });
};
