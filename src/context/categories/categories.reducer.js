const CategoriesActionTypes = require('./categories.types.js');

const initialState = {
   selected: [],
   all: {},
};

const categoriesReducer = (state, action) => {
   switch (action.type) {
      case CategoriesActionTypes.SET_ALL_CATEGORIES:
         return { ...state, all: action.payload };

      case CategoriesActionTypes.SET_SELECTED_CATEGORIES:
         return { ...state, selected: action.payload };

      default:
         return state;
   }
};

categoriesReducer.initialState = initialState;

module.exports = categoriesReducer;
