const React = require('react');
const ReactDOM = require('react-dom');
const fs = require('uxp').storage.localFileSystem;

const AppContext = require('../../context/appContext.js');
const AssetSettings = require('./asset-settings.component.jsx');
const ConfigSettings = require('./config-settings.component.jsx');
const { hiddenInputIds, hiddenInputEvent } = require('./hidden-input.data.js');

require('./settings.styles.css');

const TABS = {
   ASSETS: 'Assets',
   CONFIG: 'Config',
};

const tabList = Object.values(TABS);

function SettingsModal({ closeModal, setAssetsFolderObj, setConfigJsonName }) {
   const [selectedTab, setSelectedTab] = React.useState(tabList[0]);
   const [folderObj, setFolderObj] = React.useState({});

   const handleSelectTab = (tabName) => {
      setSelectedTab(tabName);
   };

   return (
      <div className="settings-modal-wrapper">
         <div className="settings-header">
            <div className="settings-title-icon">
               <img src="/assets/settings-flat-144.png" />
            </div>
            <h2>Settings</h2>
         </div>

         <div className="settings-modal-panes">
            <div className="settings-modal-side">
               {tabList.map((tab, i) => (
                  <button
                     key={`settings-${tab}-i`}
                     uxp-variant="secondary"
                     uxp-quiet={selectedTab !== tab ? 'true' : 'false'}
                     onClick={() => handleSelectTab(tab)}
                  >
                     {tab}
                  </button>
               ))}
            </div>

            <div className="settings-modal-main">
               {selectedTab === TABS.ASSETS && (
                  <AssetSettings
                     closeModal={closeModal}
                     setAssetsFolderObj={setAssetsFolderObj}
                     folderObj={folderObj}
                     setFolderObj={setFolderObj}
                  />
               )}

               {selectedTab === TABS.CONFIG && (
                  <ConfigSettings closeModal={closeModal} setConfigJsonName={setConfigJsonName} />
               )}
            </div>
         </div>
      </div>
   );
}

function SettingsButton() {
   const {
      assetsFolderPath,
      setAssetsFolderObj,
      setCategories,
      configJsonName,
      setConfigJsonName,
   } = React.useContext(AppContext);

   const [isDialogRendered, toggleIsRendered] = React.useState(false);

   React.useEffect(() => {
      if (!isDialogRendered) return;

      const customEvent = new Event(hiddenInputEvent);
      const hiddenInput = document.getElementById(hiddenInputIds.ASSETS_FOLDER_PATH);

      hiddenInput.setAttribute('value', assetsFolderPath);
      hiddenInput.dispatchEvent(customEvent);
   }, [isDialogRendered, assetsFolderPath]);

   React.useEffect(() => {
      if (!isDialogRendered) return;

      const customEvent = new Event(hiddenInputEvent);
      const hiddenInput = document.getElementById(hiddenInputIds.CONFIG_FILE_NAME);

      hiddenInput.setAttribute('value', configJsonName);
      hiddenInput.dispatchEvent(customEvent);
   }, [isDialogRendered, configJsonName]);

   const onClick = () => {
      let dialog;

      const settingsDialog = document.getElementById('settings-dialog');

      if (!settingsDialog) {
         dialog = document.createElement('dialog');
         dialog.id = 'settings-dialog';

         const closeModal = () => {
            dialog.close();
            toggleIsRendered(false);
         };

         dialog.onclose = closeModal;

         ReactDOM.render(
            <SettingsModal
               closeModal={closeModal}
               setAssetsFolderObj={setAssetsFolderObj}
               configJsonName={configJsonName}
               setConfigJsonName={setConfigJsonName}
            />,
            dialog
         );

         document.body.appendChild(dialog);
      } else {
         dialog = settingsDialog;
      }

      dialog.showModal();
      toggleIsRendered(true);
   };

   return (
      <div>
         <button uxp-variant="action" onClick={onClick}>
            <img src="/assets/settings-flat-144.png" />
         </button>
         <input
            type="hidden"
            className="hidden-input"
            id={hiddenInputIds.ASSETS_FOLDER_PATH}
            value={assetsFolderPath}
         />
         <input
            type="hidden"
            className="hidden-input"
            id={hiddenInputIds.CONFIG_FILE_NAME}
            value={configJsonName}
         />
      </div>
   );
}

module.exports = SettingsButton;
