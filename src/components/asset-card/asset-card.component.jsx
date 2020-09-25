const React = require('react');

const handleDragFilesToCanvas = require('../../utils/handleDragFilesToCanvas.js');

require('./asset-card.styles.css');

const SELECT_TYPE = {
   SINGLE: 'SINGLE',
   MULTIPLE: 'MULTIPLE',
};

const folderUrl =
   'C:/Users/ashish/AppData/Local/Packages/Adobe.CC.XD_adky2gkssdxte/LocalState/develop/zoho-asset-manager';

function AssetCard({ url, handleSelect, selected }) {
   const onClick = (e) => {
      const selectType = e.ctrlKey ? SELECT_TYPE.MULTIPLE : SELECT_TYPE.SINGLE;
      handleSelect && handleSelect(selectType, url);
   };

   const onDragStart = (e) => {
      const assetUrl = `${folderUrl}/${url}`;

      if (!selected) {
         handleDragFilesToCanvas(e, assetUrl);
         handleSelect(SELECT_TYPE.SINGLE, url);
      }
   };

   return (
      <div
         className={`ac-card ${selected && 'ac-selected'}`}
         onClick={onClick}
         draggable
         onDragStart={onDragStart}
      >
         <img src={url} />
      </div>
   );
}

AssetCard.SELECT_TYPE = SELECT_TYPE;

module.exports = AssetCard;
