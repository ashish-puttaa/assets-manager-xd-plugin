const SettingsActionTypes = require('./settings.types.js');

const DEFAULT_JSON = 'config.json';

const initialState = {
   assetsFolderPath: '',
   assetsFolderObj: {},
   configJsonName: DEFAULT_JSON,
};

const settingsReducer = (state, action) => {
   switch (action.type) {
      case SettingsActionTypes.SET_ASSETS_FOLDER_PATH:
         return { ...state, assetsFolderPath: action.payload };

      case SettingsActionTypes.SET_ASSETS_FOLDER_OBJECT:
         return { ...state, assetsFolderObj: action.payload };

      case SettingsActionTypes.SET_CONFIG_JSON_NAME:
         return { ...state, configJsonName: action.payload };

      default:
         return state;
   }
};

settingsReducer.initialState = initialState;

module.exports = settingsReducer;
