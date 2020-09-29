const React = require('react');

const CategoryPicker = require('../category-picker/category-picker.component.jsx');

const { setFilteredAssets } = require('../../context/assets/assets.actions.js');
const { setSelectedCategories } = require('../../context/categories/categories.actions.js');

require('./categories.styles.css');

const { useGlobalState } = require('../../context/globalState.jsx');

function Categories() {
   const [mainCategories, setMainCategories] = React.useState([]);
   const [subCategories, setSubCategories] = React.useState([]);

   const [selectedMainCategory, setSelectedMainCategory] = React.useState('');
   const [selectedSubCategory, setSelectedSubCategory] = React.useState('');

   const [context, dispatch] = useGlobalState();
   const { all: allCategories } = context.categories;
   const { all: allAssets } = context.assets;

   React.useEffect(() => {
      setMainCategories([...Object.keys(allCategories)]);
   }, [allCategories]);

   const handleSelectedMainCategory = (val) => {
      const newKeys = val && Object.keys(allCategories[val]);
      setSelectedMainCategory(val);
      setSubCategories(newKeys);
   };

   const handleSubmit = () => {
      setSelectedCategories(dispatch, [selectedMainCategory, selectedSubCategory]);

      const filteredAssets = allAssets.filter((item) =>
         item.category.some((c) => c === selectedSubCategory)
      );

      setFilteredAssets(dispatch, filteredAssets);
   };

   return (
      <div className="categories-wrapper">
         <h2>Select Categories :</h2>

         <CategoryPicker
            title="Main Category"
            values={mainCategories}
            onChange={handleSelectedMainCategory}
         />

         <CategoryPicker
            title="Sub Category"
            values={subCategories}
            onChange={(val) => setSelectedSubCategory(val)}
         />
         <div className="categories-submit">
            <button uxp-variant="cta" onClick={handleSubmit}>
               Update List
            </button>
         </div>
      </div>
   );
}

module.exports = Categories;
