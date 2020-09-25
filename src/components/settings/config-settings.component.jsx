const React = require('react');
const fs = require('uxp').storage.localFileSystem;

const { hiddenInputIds, hiddenInputEvent } = require('./hidden-input.data.js');

function ConfigSettings({ closeModal, setConfigJsonName }) {
   const [fileName, setFileName] = React.useState('');
   const [warningMessage, setWarningMessage] = React.useState('');
   const [successMessage, setSuccessMessage] = React.useState('');
   const [isInputReadOnly, setInputReadOnly] = React.useState(true);

   React.useEffect(() => {
      const hiddenInput = document.getElementById(hiddenInputIds.CONFIG_FILE_NAME);
      setFileName(hiddenInput.value);

      const handleHiddenInputEvent = (e) => setFileName(e.target.value);
      hiddenInput.addEventListener(hiddenInputEvent, handleHiddenInputEvent);

      return () => hiddenInput.removeEventListener(hiddenInputEvent, handleHiddenInputEvent);
   }, []);

   const saveChanges = () => {
      if (!fileName || fileName === '.json') {
         setSuccessMessage('');
         return setWarningMessage('File name cannot be empty.');
      }
      fileName && setConfigJsonName(fileName);
      setInputReadOnly(true);
      setSuccessMessage('Successfully saved changes.');
   };

   const handleInputChange = (e) => {
      let newFileName = e.target.value;
      if (!newFileName.includes('.json')) newFileName = newFileName.concat('.json');
      setFileName(newFileName);
   };

   const handleKeyDown = (e) => {
      const enterKeyCode = 13;
      if (e.keyCode == enterKeyCode) {
         setInputReadOnly(!isInputReadOnly);
      }
   };

   return (
      <React.Fragment>
         <h1 className="settings-modal-title">Rename Config file</h1>
         <p className="settings-modal-info">The plugin is looking for a json file with name:</p>
         <div className="settings--config-input-wrapper">
            <input
               type="text"
               uxp-quiet="true"
               value={fileName}
               onChange={handleInputChange}
               onKeyDown={handleKeyDown}
               disabled={isInputReadOnly}
            />

            {isInputReadOnly ? (
               <button uxp-variant="action" onClick={() => setInputReadOnly(false)}>
                  <img src="/assets/edit-104.png" />
               </button>
            ) : (
               <button uxp-variant="action" onClick={() => setInputReadOnly(true)}>
                  <img src="/assets/checkmark-light-96.png" />
               </button>
            )}
         </div>

         {successMessage && <p className="settings-success">{successMessage}</p>}
         {warningMessage && <p className="settings-warning">{warningMessage}</p>}

         <footer>
            <button onClick={closeModal} uxp-variant="secondary" uxp-quiet="true">
               Close
            </button>
            <button uxp-variant="cta" type="submit" onClick={saveChanges}>
               Save Changes
            </button>
         </footer>
      </React.Fragment>
   );
}

module.exports = ConfigSettings;
