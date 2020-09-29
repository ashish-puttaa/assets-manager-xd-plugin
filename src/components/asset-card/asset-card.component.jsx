const React = require('react');
const upath = require('upath');

const handleDragFilesToCanvas = require('../../utils/handleDragFilesToCanvas.js');

require('./asset-card.styles.css');

const SELECT_TYPE = {
   SINGLE: 'SINGLE',
   MULTIPLE: 'MULTIPLE',
};

function AssetCard({ data, handleSelect, selected, folderUrl }) {
   const onClick = (e) => {
      const selectType = e.ctrlKey ? SELECT_TYPE.MULTIPLE : SELECT_TYPE.SINGLE;
      handleSelect && handleSelect(selectType, data.url);
   };

   const onDragStart = (e) => {
      const assetUrl = upath.join(folderUrl, data.url);

      if (!selected) {
         handleDragFilesToCanvas(e, assetUrl);
         handleSelect(SELECT_TYPE.SINGLE, data.url);
      }
   };

   return (
      <div
         className={`ac-card ${selected && 'ac-selected'}`}
         onClick={onClick}
         draggable
         onDragStart={onDragStart}
         title={data.name}
      >
         <img src={upath.join('userData', data.url)} />
      </div>
   );
}

AssetCard.SELECT_TYPE = SELECT_TYPE;

module.exports = AssetCard;
