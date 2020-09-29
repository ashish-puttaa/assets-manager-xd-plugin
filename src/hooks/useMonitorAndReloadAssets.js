const React = require('react');

const { useGlobalState } = require('../context/globalState.jsx');
const { setAllAssets, setFilteredAssets } = require('../context/assets/assets.actions.js');
const { setAllCategories } = require('../context/categories/categories.actions.js');

const loadAssetDataFromFile = require('../utils/loadAssetDataFromFile.js');

function useMonitorAndReloadAssets() {
   const [context, dispatch] = useGlobalState();
   const { assetsFolderObj, configJsonName } = context.settings;

   const loadCategories = async (folderObj, jsonName) => {
      const response = await loadAssetDataFromFile(folderObj, jsonName);

      if (response.status === 'success') {
         setAllCategories(dispatch, response.categories);
         setAllAssets(dispatch, response.assets);
         setFilteredAssets(dispatch, response.assets);
      } else {
         setAllCategories(dispatch, {});
         setAllAssets(dispatch, []);
      }
   };

   React.useEffect(() => {
      const assetsFolderExists = !!assetsFolderObj.nativePath;
      assetsFolderExists && loadCategories(assetsFolderObj, configJsonName);
   }, [assetsFolderObj, configJsonName]);
}

module.exports = useMonitorAndReloadAssets;
