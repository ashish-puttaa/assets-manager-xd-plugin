async function loadAssetDataFromFile(folderObject, fileName) {
   let configJson;

   try {
      configJson = await folderObject.getEntry(fileName);
   } catch (err) {
      return {
         status: 'error',
         type: 'locateError',
         data: {
            title: "Couldn't locate your categories file",
            body: `The plugin was unable to locate your ${fileName}. Please check the directory and try again.`,
         },
      };
   }

   let assetsData;

   try {
      assetsData = JSON.parse(await configJson.read());
   } catch (err) {
      return {
         status: 'error',
         type: 'parseError',
         data: {
            title: "Couldn't load your categories",
            body: `The plugin was unable to parse ${fileName}. Please check the file and try again.`,
         },
      };
   }

   let categoriesObj;

   try {
      categoriesObj = assetsData.reduce((acc, asset) => {
         let parent = acc;

         asset.category.forEach((category, i) => {
            if (!parent.hasOwnProperty(category)) parent[category] = {};
            parent = parent[category];
         });

         return acc;
      }, {});
   } catch (err) {
      return {
         status: 'error',
         type: 'parseError',
         data: {
            title: "Couldn't load your categories",
            body: `The config file does not contain the necessary data. Please refer the sample json. Error: ${err}`,
         },
      };
   }

   return {
      status: 'success',
      assets: assetsData,
      categories: categoriesObj,
   };
}

module.exports = loadAssetDataFromFile;
