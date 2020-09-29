const React = require('react');

const { useGlobalState } = require('../../context/globalState.jsx');
const { error } = require('../../../lib/dialogs.js');
const loadAssetDataFromFile = require('../../utils/loadAssetDataFromFile.js');

const CategoryPicker = require('../category-picker/category-picker.component.jsx');

require('./categories.styles.css');

function Categories() {
   const [mainCategories, setMainCategories] = React.useState([]);
   const [subCategories, setSubCategories] = React.useState([]);

   const [selectedMainCategory, setSelectedMainCategory] = React.useState('');
   const [selectedSubCategory, setSelectedSubCategory] = React.useState('');

   const [context, dispatch] = useGlobalState();
   const { settings } = context;
   const { assetsFolderObj, configJsonName } = settings;

   const setCategories = (jsonData) => {
      setMainCategories(jsonData.main);
      setSubCategories(jsonData.sub);
   };

   const loadCategories = async (folderObj, jsonName) => {
      const response = await loadAssetDataFromFile(folderObj, jsonName);

      if (response.status === 'success') {
         const { data: jsonData } = response;
         setCategories(jsonData);
      } else {
         const { data: errorData } = response;
         error(errorData.title, errorData.body);
      }

      return errorMessage;
   };

   React.useEffect(() => {
      const assetsFolderExists = !!assetsFolderObj.nativePath;
      assetsFolderExists && loadCategories(assetsFolderObj, configJsonName);
   }, [assetsFolderObj, configJsonName]);

   return (
      <div className="categories-wrapper">
         <h2>Select Categories :</h2>

         <CategoryPicker
            title="Main Category"
            values={mainCategories}
            onChange={(val) => setSelectedMainCategory(val)}
         />

         <CategoryPicker
            title="Sub Category"
            values={subCategories}
            onChange={(val) => setSelectedSubCategory(val)}
         />
         <div className="categories-submit">
            <button uxp-variant="cta">Update List</button>
         </div>
      </div>
   );
}

module.exports = Categories;
