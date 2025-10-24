let map;

(() => {
  map = L.map('map').setView([51.505, -0.09], 13);
  map.addGoogleMutant();

  map.whenReady(() => {
    // Example: Auto mode - drag map when unselected, drag overlay when selected
    img = L.distortableImageOverlay('example.jpg', {
      selected: true,
      fullResolutionSrc: 'large.jpg',
      deselectOnOutsideClick: true,
      dragBehavior: 'auto',     // 'overlay', 'map', or 'auto' (moves map by default, overlay if selected)
      selectOnDrag: false, // Don't select when dragging
      draggable: true, // in addition to 'editable: true', allows to access toolbar but can or cannot drag
      defaultMode: 'resizeRotate'// 'drag', 'scale', 'distort', 'rotate', 'freeRotate', 'resizeRotate', 'transform', 'lock', more...?
    }).addTo(map);

  });

  // Define different action sets
      const basicTools = [
        L.DragAction,
        L.ScaleAction, 
        L.RotateAction,
        L.DeleteAction
      ];

      const advancedTools = [
        L.DragAction,
        L.ScaleAction,
        L.DistortAction,
        L.RotateAction,
        L.FreeRotateAction,
        L.LockAction,
        L.OpacityAction,
        L.BorderAction,
        L.ExportAction,
        L.DeleteAction
      ];


  /*setTimeout(() => {
    img.setOptions({ draggable: false, actions: basicTools });
  }, 5000);

    setTimeout(() => {
    img.setOptions({  actions: advancedTools });
  }, 5000);*/
})();

L.Control.geocoder().addTo(map);
