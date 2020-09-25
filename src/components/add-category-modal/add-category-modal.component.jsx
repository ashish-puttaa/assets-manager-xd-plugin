const React = require('react');
const ReactDOM = require('react-dom');

require('./add-category-modal.styles.css');

const CHAR_LIMIT = 36;

function AddCategoryModal({ title, dialog, handleCreation }) {
   const [name, setName] = React.useState('');
   const [warningMessage, setWarningMessage] = React.useState('');

   const onInputChange = (e) => {
      const value = e.target.value;
      if (value.length <= CHAR_LIMIT) setName(value);
   };

   const handleCreate = () => {
      if (name.length === 0) {
         return setWarningMessage('Please specify a name for the category.');
      } else {
         handleCreation && handleCreation(name);
         closeModal();
      }
   };

   const handleKeyDown = (e) => {
      const enterKeyCode = 13;

      if (e.keyCode == enterKeyCode) {
         handleCreate();
      }
   };

   const closeModal = () => {
      dialog.close();
   };

   return (
      <div className="acm-wrapper">
         <div className="acm-header">
            <p className="acm-title">Create {title}</p>
            <hr />
         </div>

         <p className="acm-info">What would you like to name your new category?</p>
         <input onChange={onInputChange} value={name} onKeyDown={handleKeyDown} />

         {warningMessage && <p className="acm-warning">{warningMessage}</p>}

         <footer>
            <button uxp-variant="primary" onClick={closeModal}>
               Cancel
            </button>
            <button type="submit" uxp-variant="cta" onClick={handleCreate}>
               Create
            </button>
         </footer>
      </div>
   );
}

function AddCategoryButton({ modalTitle, handleCreateCategory }) {
   const onClick = () => {
      const dialog = document.createElement('dialog');
      ReactDOM.render(
         <AddCategoryModal
            title={modalTitle}
            dialog={dialog}
            handleCreation={handleCreateCategory}
         />,
         dialog
      );
      document.body.appendChild(dialog).showModal();
   };

   return (
      <button uxp-variant="action" onClick={onClick} title={`Add ${modalTitle}`}>
         <img src="/assets/plus-math-b-96.png" />
      </button>
   );
}

module.exports = AddCategoryButton;
