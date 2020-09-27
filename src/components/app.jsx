const React = require('react');
const fs = require('uxp').storage.localFileSystem;
const { error } = require('../../lib/dialogs.js');

const CategoryPicker = require('./category-picker/category-picker.component.jsx');
const AssetGallery = require('./asset-gallery/asset-gallery.component.jsx');
const SettingsButton = require('./settings/settings.component.jsx');

const useDimensionsOnResize = require('../hooks/useDimensionsOnResize.js');
const loadAssetDataFromFile = require('../utils/loadAssetDataFromFile.js');

const { useGlobalState } = require('../context/globalState.jsx');
const {
   setAssetsFolderObj,
   setAssetsFolderPath,
} = require('../context/settings/settings.actions.js');

require('./app.styles.css');

function App() {
   const [mainCategories, setMainCategories] = React.useState([]);
   const [subCategories, setSubCategories] = React.useState([]);

   const [selectedMainCategory, setSelectedMainCategory] = React.useState('');
   const [selectedSubCategory, setSelectedSubCategory] = React.useState('');

   const [context, dispatch] = useGlobalState();
   const { settings } = context;
   const { assetsFolderPath, assetsFolderObj, configJsonName } = settings;

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
      (async () => {
         const pluginDataFolder = await fs.getDataFolder();
         setAssetsFolderObj(dispatch, pluginDataFolder);
      })();
   }, []);

   React.useEffect(() => {
      const filePath = assetsFolderObj.nativePath;
      filePath && setAssetsFolderPath(dispatch, assetsFolderObj.nativePath);

      const assetsFolderExists = !!assetsFolderObj.nativePath;
      assetsFolderExists && loadCategories(assetsFolderObj, configJsonName);
   }, [assetsFolderObj, configJsonName]);

   const wrapperRef = React.useRef();
   const panelDimensions = useDimensionsOnResize(wrapperRef);

   return (
      <div className="app-wrapper">
         <div className="sb-wrapper">
            <h1>Asset Manager</h1>
            <SettingsButton className="sb-button" />
         </div>

         <div ref={wrapperRef} className="app-options">
            <div className="app-categories">
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
               <div className="update-list">
                  <button uxp-variant="cta">Update List</button>
               </div>
            </div>

            <div className="asset-description"></div>
         </div>

         <AssetGallery />

         {panelDimensions && (
            <p>
               Panel size: {panelDimensions.width} x {panelDimensions.height}
            </p>
         )}

         {assetsFolderPath && (
            <div>
               Selected Folder:
               <input type="text" uxp-quiet="true" value={assetsFolderPath} readOnly />
            </div>
         )}

         {configJsonName && <p>Json Name: {configJsonName}</p>}
      </div>
   );
}

module.exports = App;
