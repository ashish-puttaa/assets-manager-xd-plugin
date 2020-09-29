const CategoriesActionTypes = require('./categories.types.js');

exports.setAllCategories = (dispatch, allCategoriesObj) => {
   dispatch({ type: CategoriesActionTypes.SET_ALL_CATEGORIES, payload: allCategoriesObj });
};

exports.setSelectedCategories = (dispatch, selectedCategoriesArray) => {
   dispatch({
      type: CategoriesActionTypes.SET_SELECTED_CATEGORIES,
      payload: selectedCategoriesArray,
   });
};
