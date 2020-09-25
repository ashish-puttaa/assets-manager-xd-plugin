const React = require('react');
const ReactDOM = require('react-dom');

const AssetSettings = require('./asset-settings.component.jsx');
const ConfigSettings = require('./config-settings.component.jsx');

const useCreateDialog = require('../../hooks/useCreateDialog.js');

require('./settings.styles.css');

const TABS = {
   ASSETS: 'Assets',
   CONFIG: 'Config',
};

const tabList = Object.values(TABS);

function SettingsModal({ isOpen, onClose }) {
   if (!isOpen) return null;

   const [selectedTab, setSelectedTab] = React.useState(tabList[0]);
   const [dialog, closeDialog] = useCreateDialog(onClose);

   const handleSelectTab = (tabName) => {
      setSelectedTab(tabName);
   };

   return ReactDOM.createPortal(
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
               {selectedTab === TABS.ASSETS && <AssetSettings closeDialog={closeDialog} />}
               {selectedTab === TABS.CONFIG && <ConfigSettings closeDialog={closeDialog} />}
            </div>
         </div>
      </div>,
      dialog
   );
}

function SettingsButton() {
   const [isOpen, setIsOpen] = React.useState(false);

   const onClick = () => setIsOpen(true);
   const onClose = () => setIsOpen(false);

   return (
      <div>
         <button uxp-variant="action" onClick={onClick}>
            <img src="/assets/settings-flat-144.png" />
         </button>
         <SettingsModal isOpen={isOpen} onClose={onClose} />
      </div>
   );
}

module.exports = SettingsButton;
