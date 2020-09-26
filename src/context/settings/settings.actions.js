const SettingsActionTypes = require('./settings.types.js');

exports.setAssetsFolderPath = (dispatch, folderPath) => {
   dispatch({ type: SettingsActionTypes.SET_ASSETS_FOLDER_PATH, payload: folderPath });
};

exports.setAssetsFolderObj = (dispatch, folderObj) => {
   dispatch({ type: SettingsActionTypes.SET_ASSETS_FOLDER_OBJECT, payload: folderObj });
};

exports.setConfigJsonName = (dispatch, fileName) => {
   dispatch({ type: SettingsActionTypes.SET_CONFIG_JSON_NAME, payload: fileName });
};
