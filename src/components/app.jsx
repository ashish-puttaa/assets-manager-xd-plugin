const React = require('react');
const fs = require('uxp').storage.localFileSystem;

const Categories = require('./categories/categories.component.jsx');
const AssetGallery = require('./asset-gallery/asset-gallery.component.jsx');
const SettingsButton = require('./settings/settings.component.jsx');

const { useGlobalState } = require('../context/globalState.jsx');
const { setAssetsFolderObj } = require('../context/settings/settings.actions.js');

const useMonitorAndReloadAssets = require('../hooks/useMonitorAndReloadAssets.js');

require('./app.styles.css');

function App() {
   const [context, dispatch] = useGlobalState();

   React.useEffect(() => {
      (async () => {
         const pluginDataFolder = await fs.getDataFolder();
         setAssetsFolderObj(dispatch, pluginDataFolder);
      })();
   }, []);

   useMonitorAndReloadAssets();

   return (
      <div className="app-wrapper">
         <div className="app-header">
            <h1>Asset Manager</h1>
            <SettingsButton className="app-settings-btn" />
         </div>

         <div className="app-options">
            <Categories />
            <div className="asset-description"></div>
         </div>

         <AssetGallery />
      </div>
   );
}

module.exports = App;
