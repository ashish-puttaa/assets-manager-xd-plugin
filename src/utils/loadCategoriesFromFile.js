async function loadCategoriesFromFile(folderObject, fileName) {
   let categoriesJson;

   try {
      categoriesJson = await folderObject.getEntry(fileName);
   } catch (err) {
      console.log(`Couldn't locate your categories file`);
      return {
         status: 'error',
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
      console.log(`Couldn't load your categories`);

      return {
         status: 'error',
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

module.exports = loadCategoriesFromFile;
