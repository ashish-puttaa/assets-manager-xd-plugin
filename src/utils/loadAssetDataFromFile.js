async function loadAssetDataFromFile(folderObject, fileName) {
   let categoriesJson;

   try {
      categoriesJson = await folderObject.getEntry(fileName);
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

   let categoriesFromJson;

   try {
      categoriesFromJson = JSON.parse(await categoriesJson.read());
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

   return {
      status: 'success',
      data: categoriesFromJson,
   };
}

module.exports = loadAssetDataFromFile;
