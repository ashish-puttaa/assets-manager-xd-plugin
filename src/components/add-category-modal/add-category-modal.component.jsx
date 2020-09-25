const React = require('react');
const ReactDOM = require('react-dom');

const useCreateDialog = require('../../hooks/useCreateDialog.js');

require('./add-category-modal.styles.css');

const CHAR_LIMIT = 36;

function AddCategoryModal({ isOpen, onClose, title, handleCreation }) {
   if (!isOpen) return null;

   const [name, setName] = React.useState('');
   const [warningMessage, setWarningMessage] = React.useState('');

   const [dialog, closeDialog] = useCreateDialog(onClose);

   const onInputChange = (e) => {
      const value = e.target.value;
      if (value.length <= CHAR_LIMIT) setName(value);
   };

   const handleCreate = () => {
      if (name.length === 0) {
         return setWarningMessage('Please specify a name for the category.');
      } else {
         handleCreation && handleCreation(name);
         closeDialog();
      }
   };

   const handleKeyDown = (e) => {
      const enterKeyCode = 13;
      if (e.keyCode == enterKeyCode) {
         handleCreate();
      }
   };

   return ReactDOM.createPortal(
      <div className="acm-wrapper">
         <div className="acm-header">
            <p className="acm-title">Create {title}</p>
            <hr />
         </div>

         <p className="acm-info">What would you like to name your new category?</p>
         <input onChange={onInputChange} value={name} onKeyDown={handleKeyDown} />

         {warningMessage && <p className="acm-warning">{warningMessage}</p>}

         <footer>
            <button uxp-variant="primary" onClick={closeDialog}>
               Cancel
            </button>
            <button type="submit" uxp-variant="cta" onClick={handleCreate}>
               Create
            </button>
         </footer>
      </div>,
      dialog
   );
}

function AddCategoryButton({ modalTitle, handleCreateCategory }) {
   const [isOpen, setIsOpen] = React.useState(false);

   const onClick = () => setIsOpen(true);
   const onClose = () => setIsOpen(false);

   return (
      <div>
         <button uxp-variant="action" onClick={onClick} title={`Add ${modalTitle}`}>
            <img src="/assets/plus-math-b-96.png" />
         </button>
         <AddCategoryModal
            isOpen={isOpen}
            onClose={onClose}
            title={modalTitle}
            handleCreation={handleCreateCategory}
         />
      </div>
   );
}

module.exports = AddCategoryButton;
