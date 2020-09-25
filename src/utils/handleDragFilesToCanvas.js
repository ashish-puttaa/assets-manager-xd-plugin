const handledragFilesToCanvas = (e, thingsToDrag) => {
   if (thingsToDrag.length > 0) {
      e.dataTransfer.dropEffect = 'copy';

      const data = Array.isArray(thingsToDrag) ? thingsToDrag.join('\n') : thingsToDrag;
      e.dataTransfer.setData('text/uri-list', data);
   }
};

module.exports = handledragFilesToCanvas;
