const React = require('react');

const { useGlobalState } = require('../../context/globalState.jsx');
const {
   setSelectedAssets: setSelectedAssetsInContext,
} = require('../../context/assets/assets.actions.js');

const handleDragFilesToCanvas = require('../../utils/handleDragFilesToCanvas.js');
const AssetCard = require('../asset-card/asset-card.component.jsx');
const { SELECT_TYPE } = AssetCard;

require('./asset-gallery.styles.css');

function AssetGallery() {
   const [assets, setAssets] = React.useState([]);
   const [selectedAssets, setSelectedAssets] = React.useState([]);

   const [context, dispatch] = useGlobalState();
   const {
      settings: { assetsFolderPath },
      assets: { filtered: filteredAssets },
   } = context;

   React.useEffect(() => {
      setAssets(filteredAssets);
   }, [filteredAssets]);

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
         setSelectedAssetsInContext(dispatch, newArray);
      } else {
         setSelectedAssets(() => [asset]);
         setSelectedAssetsInContext(dispatch, [asset]);
      }
   };

   const handleSearch = (e) => {
      const enterKeyCode = 13;
      if (e.keyCode == enterKeyCode) {
         const searchString = e.target.value;
         const searchedAssets = filteredAssets.filter((item) =>
            item.name.toLowerCase().includes(searchString.toLowerCase())
         );
         setAssets(searchedAssets);
      }
      e.target.focus();
   };

   const onDragStartCapture = (e) => {
      const thingsToDrag = selectedAssets.map((el) => `${assetsFolderPath}/${el.url}`);
      handleDragFilesToCanvas(e, thingsToDrag);
   };

   const onClickCapture = () => {
      setSelectedAssets([]);
   };

   return (
      <div onClickCapture={onClickCapture} className="ag-wrapper">
         <h2>Asset Gallery :</h2>

         <div className="ag-search">
            <input
               type="text"
               placeholder="Search..."
               style={{ paddingLeft: '100px' }}
               disabled={filteredAssets.length === 0}
               onKeyDown={handleSearch}
            />
            <div className="ag-search-icon">
               <img src="/assets/search-150.png" />
            </div>
         </div>

         <div className="ag-body">
            {filteredAssets.length ? (
               <div className="ag-assets" draggable onDragStartCapture={onDragStartCapture}>
                  {assets.map((item, i) => {
                     const isSelected = selectedAssets.some((el) => el.url === item.url);

                     return (
                        <AssetCard
                           data={item}
                           key={i}
                           selected={isSelected}
                           handleSelect={handleSelect}
                           folderUrl={assetsFolderPath}
                        />
                     );
                  })}
               </div>
            ) : (
               <div className="ag-no-assets">
                  <h2>No assets found.</h2>
                  <p>Please open Settings and do the following:</p>
                  <p>1. Select the Assets Folder Path.</p>
                  <p>2. Enter the correct name for the config file.</p>
               </div>
            )}

            {!assets.length && (
               <div className="ag-no-assets">
                  <h2>No assets match the search string.</h2>
               </div>
            )}
         </div>
      </div>
   );
}

module.exports = AssetGallery;
