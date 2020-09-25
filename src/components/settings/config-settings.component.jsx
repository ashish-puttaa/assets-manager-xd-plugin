const React = require('react');

const AppContext = require('../../context/appContext.js');

function ConfigSettings({ closeDialog }) {
   const [fileName, setFileName] = React.useState('');
   const [isInputReadOnly, setInputReadOnly] = React.useState(true);

   const [warningMessage, setWarningMessage] = React.useState('');
   const [successMessage, setSuccessMessage] = React.useState('');

   const { configJsonName, setConfigJsonName } = React.useContext(AppContext);

   React.useEffect(() => {
      setFileName(configJsonName);
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
            <button onClick={closeDialog} uxp-variant="secondary" uxp-quiet="true">
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
