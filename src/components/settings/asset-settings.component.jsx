const React = require('react');
const fs = require('uxp').storage.localFileSystem;

const loadAssetDataFromFile = require('../../utils/loadAssetDataFromFile.js');
const { hiddenInputIds, hiddenInputEvent } = require('./hidden-input.data.js');

function AssetSettings({ closeModal, setAssetsFolderObj, folderObj, setFolderObj }) {
   const [folderPath, setFolderPath] = React.useState('');
   const [configFileName, setConfigFileName] = React.useState('');

   const [message, setMessage] = React.useState({ type: 'warning', content: '' });
   const { content: messageContent, type: messageType } = message;

   React.useEffect(() => {
      const folderPathInput = document.getElementById(hiddenInputIds.ASSETS_FOLDER_PATH);
      const configNameInput = document.getElementById(hiddenInputIds.CONFIG_FILE_NAME);
      setFolderPath(folderPathInput.value);
      setConfigFileName(configNameInput.value);

      const handleFolderPathEvent = (e) => setFolderPath(e.target.value);
      const handleConfigNameEvent = (e) => setConfigFileName(e.target.value);
      folderPathInput.addEventListener(hiddenInputEvent, handleFolderPathEvent);
      configNameInput.addEventListener(hiddenInputEvent, handleConfigNameEvent);

      return () => {
         folderPathInput.removeEventListener(hiddenInputEvent, handleFolderPathEvent);
         configNameInput.removeEventListener(hiddenInputEvent, handleConfigNameEvent);
      };
   }, []);

   const validateSelectedFolder = async (folder, configFileName) => {
      if (folder && configFileName) {
         const response = await loadAssetDataFromFile(folder, configFileName);

         if (response.status === 'error') {
            if (response.type === 'parseError')
               setMessage({
                  type: 'error',
                  content: `Could not parse the contents of ${configFileName} in the selected folder.`,
               });

            if (response.type === 'locateError')
               setMessage({
                  type: 'error',
                  content: `Config file (${configFileName}) not found in the selected folder.`,
               });
         } else {
            !messageContent && setMessage({ type: 'success', content: 'Everything okay.' });
         }
      }
   };

   React.useEffect(() => {
      validateSelectedFolder(folderObj, configFileName);
   }, [folderObj, configFileName]);

   const selectFolder = async () => {
      const folder = await fs.getFolder();
      if (folder) {
         setMessage({ type: 'success', content: 'Successfully updated assets folder.' });
         setAssetsFolderObj(folder);
         setFolderObj(folder);
      } else {
         setMessage({ type: 'warning', content: 'Select operation was cancelled by user.' });
      }
   };

   const handleKeyDown = (e) => {
      const enterKeyCode = 13;
      if (e.keyCode == enterKeyCode) {
         selectFolder();
      }
   };

   return (
      <React.Fragment>
         <h1 className="settings-modal-title">Select Assets Folder</h1>
         <p className="settings-modal-info">Your assets are being imported from:</p>
         <input
            type="text"
            uxp-quiet="true"
            value={folderPath}
            onKeyDown={handleKeyDown}
            readOnly
         />

         {messageContent && <p className={`settings-${messageType}`}>{messageContent}</p>}

         <footer>
            <button onClick={closeModal} uxp-variant="secondary" uxp-quiet="true">
               Close
            </button>
            <button uxp-variant="cta" type="submit" onClick={selectFolder}>
               Select Folder
            </button>
         </footer>
      </React.Fragment>
   );
}

module.exports = AssetSettings;
