const React = require('react');
const fs = require('uxp').storage.localFileSystem;

const Categories = require('./categories/categories.component.jsx');
const AssetGallery = require('./asset-gallery/asset-gallery.component.jsx');
const SettingsButton = require('./settings/settings.component.jsx');

const useDimensionsOnResize = require('../hooks/useDimensionsOnResize.js');

const { useGlobalState } = require('../context/globalState.jsx');
const {
   setAssetsFolderObj,
   setAssetsFolderPath,
} = require('../context/settings/settings.actions.js');

require('./app.styles.css');

function App() {
   const [context, dispatch] = useGlobalState();
   const { settings } = context;
   const { assetsFolderPath, assetsFolderObj, configJsonName } = settings;

   React.useEffect(() => {
      (async () => {
         const pluginDataFolder = await fs.getDataFolder();
         setAssetsFolderObj(dispatch, pluginDataFolder);
      })();
   }, []);

   React.useEffect(() => {
      const filePath = assetsFolderObj.nativePath;
      filePath && setAssetsFolderPath(dispatch, assetsFolderObj.nativePath);
   }, [assetsFolderObj, configJsonName]);

   const wrapperRef = React.useRef();
   const panelDimensions = useDimensionsOnResize(wrapperRef);

   return (
      <div className="app-wrapper">
         <div className="app-header">
            <h1>Asset Manager</h1>
            <SettingsButton className="app-settings-btn" />
         </div>

         <div ref={wrapperRef} className="app-options">
            <Categories />
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
