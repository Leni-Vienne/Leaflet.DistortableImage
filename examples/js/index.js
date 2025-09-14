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
      dragBehavior: 'map',     // 'overlay', 'map', or 'auto'
      selectOnDrag: true,      // Don't select when dragging
    }).addTo(map);

  });
})();

L.Control.geocoder().addTo(map);
