const React = require('react');
const fs = require('uxp').storage.localFileSystem;

const handleDragFilesToCanvas = require('../../utils/handleDragFilesToCanvas.js');
const AssetCard = require('../asset-card/asset-card.component.jsx');
const { SELECT_TYPE } = AssetCard;

require('./asset-gallery.styles.css');

const folderUrl =
   'C:/Users/ashish/AppData/Local/Packages/Adobe.CC.XD_adky2gkssdxte/LocalState/develop/zoho-asset-manager';

const imageUrls = [
   { url: 'userData/plus-math-b-96.png' },
   { url: 'userData/plus-math-96.png' },

   { url: 'userData/plus-52.png' },
   { url: 'userData/cancel-96.png' },
   { url: 'userData/edit.svg' },
   { url: 'userData/cancel2-96.png' },
   { url: 'userData/delete-96.png' },
   { url: 'userData/delete-bin-96.png' },
   { url: 'userData/delete-flat-96.png' },
   { url: 'userData/settings-flat-144.png' },
   { url: 'userData/settings-144.png' },
   { url: 'userData/settings-flat-144.svg' },
   { url: 'userData/table.svg' },
   { url: 'userData/big-table.svg' },
   { url: 'userData/peace.jpg' },
   { url: 'userData/edit-52.png' },
   { url: 'userData/coding.png' },
];

function AssetGallery() {
   const [assets, setAssets] = React.useState([]);
   const [selectedAssets, setSelectedAssets] = React.useState([]);

   React.useEffect(() => {
      setAssets(imageUrls);
   }, []);

   React.useEffect(() => {
      console.log({ selectedAssets });
   }, [selectedAssets]);

   const handleSelect = (selectType, url) => {
      const asset = assets.find((el) => el.url === url);

      if (selectType === SELECT_TYPE.MULTIPLE) {
         const isAlreadySelected = selectedAssets.some((el) => el.url === url);
         let newArray = Array.from(selectedAssets);

         if (isAlreadySelected) {
            newArray = newArray.filter((el) => el.url !== url);
         } else {
            newArray.unshift(asset);
         }

         setSelectedAssets(() => newArray);
      } else {
         setSelectedAssets(() => [asset]);
      }
   };

   const onDragStartCapture = (e) => {
      const thingsToDrag = selectedAssets.map((el) => `${folderUrl}/${el.url}`);
      handleDragFilesToCanvas(e, thingsToDrag);
   };

   const onClickCapture = () => {
      setSelectedAssets([]);
   };

   return (
      <div onClickCapture={onClickCapture} className="ag-wrapper">
         <h2>Asset Gallery :</h2>

         <div className="ag-search">
            <input type="text" placeholder="Search..." style={{ paddingLeft: '100px' }} />
            <div className="ag-search-icon">
               <img src="/assets/search-150.png" />
            </div>
         </div>

         <div className="ag-assets" draggable onDragStartCapture={onDragStartCapture}>
            {assets.map((item, i) => {
               const isSelected = selectedAssets.some((el) => el.url === item.url);

               return (
                  <AssetCard
                     url={item.url}
                     key={i}
                     selected={isSelected}
                     handleSelect={handleSelect}
                  />
               );
            })}
         </div>
      </div>
   );
}

module.exports = AssetGallery;
