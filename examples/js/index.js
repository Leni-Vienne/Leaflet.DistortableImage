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
      draggable: true 
    }).addTo(map);

  });
})();

L.Control.geocoder().addTo(map);
