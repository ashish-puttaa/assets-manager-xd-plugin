const React = require('react');

const DIALOG_ROOT = document.body;

const useCreateDialog = (handleModalClose) => {
   const { current: dialog } = React.useRef(document.createElement('dialog'));

   dialog.oncancel = () => handleModalClose && handleModalClose();

   const closeDialog = () => {
      dialog.close();
      handleModalClose && handleModalClose();
   };

   React.useEffect(() => {
      DIALOG_ROOT.appendChild(dialog);
      dialog.showModal().then(() => DIALOG_ROOT.removeChild(dialog));

      return () => DIALOG_ROOT.removeChild(dialog);
   }, []);

   return [dialog, closeDialog];
};

module.exports = useCreateDialog;
