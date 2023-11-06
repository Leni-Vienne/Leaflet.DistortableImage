L.TransformResizeHandle = L.EditHandle.extend({
  options: {
    TYPE: 'transformResize',
    icon: L.icon({
      iconUrl:
        // eslint-disable-next-line max-len
        `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="10" stroke="white" stroke-width="4" fill="%23ffffff55"/>
            <circle cx="16" cy="16" r="10" stroke="%232563eb" stroke-width="2" fill="none"/>
         </svg>`,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    }),
  },

  _onHandleDrag() {
    const overlay = this._handled;
    const map = overlay._map;
    const formerLatLng = overlay.getCorner(this._corner);
    const anchorLatLng = overlay.getOppositeCorner(this._corner);
    const newLatLng = this.getLatLng();

    const scale = this._calculateScalingFactor(formerLatLng, newLatLng, anchorLatLng);

    let edgeMinWidth = overlay.edgeMinWidth;
    if (!edgeMinWidth) { edgeMinWidth = 50; } /* just in case */

    const corner1 = map.latLngToContainerPoint(overlay.getCorner(0));
    const corner2 = map.latLngToContainerPoint(overlay.getCorner(1));
    const w = Math.abs(corner1.x - corner2.x);
    const h = Math.abs(corner1.y - corner2.y);
    const distance = Math.sqrt(w * w + h * h);
    if (distance > edgeMinWidth || scale > 1) {
      overlay.scaleBy(scale, anchorLatLng);
    } else {
      overlay.scaleBy(1, anchorLatLng);
    }
  },

  updateHandle() {
    this.setLatLng(this._handled.getCorner(this._corner));
  },
});

L.transformResizeHandle = (overlay, idx, options) => {
  return new L.TransformResizeHandle(overlay, idx, options);
};
