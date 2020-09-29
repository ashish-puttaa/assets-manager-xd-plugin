const AssetsActionTypes = require('./assets.types.js');

const initialState = {
   selected: [],
   filtered: [],
   all: [],
};

const assetsReducer = (state, action) => {
   switch (action.type) {
      case AssetsActionTypes.SET_ALL_ASSETS:
         return { ...state, all: action.payload };

      case AssetsActionTypes.SET_SELECTED_ASSETS:
         return { ...state, selected: action.payload };

      case AssetsActionTypes.SET_FILTERED_ASSETS:
         return { ...state, filtered: action.payload };

      default:
         return state;
   }
};

assetsReducer.initialState = initialState;

module.exports = assetsReducer;
