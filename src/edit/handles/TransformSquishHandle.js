L.TransformSquishHandle = L.EditHandle.extend({
  options: {
    TYPE: 'transformSquish',
    icon: L.icon({
      iconUrl:
        // eslint-disable-next-line max-len
        `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="6" stroke="white" stroke-width="4" fill="%23ffffff55"/>
            <circle cx="16" cy="16" r="6" stroke="%232563eb" stroke-width="2" fill="none"/>
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
    const anchorCorners = this._corner === -1 ? [2, 3] :
      this._corner === -2 ? [0, 1] :
      this._corner === -3 ? [0, 2] :
      [1, 3];

    let edgeMinWidth = overlay.edgeMinWidth;
    if (!edgeMinWidth) { edgeMinWidth = 50; } /* just in case */

    const corner1 = map.latLngToContainerPoint(overlay.getCorner(0));
    const corner2 = map.latLngToContainerPoint(overlay.getCorner(1));
    const w = Math.abs(corner1.x - corner2.x);
    const h = Math.abs(corner1.y - corner2.y);
    const distance = Math.sqrt(w * w + h * h);
    if (distance > edgeMinWidth || scale > 1) {
      this.squishBy(scale, anchorCorners);
    } else {
      this.squishBy(1, anchorCorners);
    }
  },

  squishBy(scale, anchorCorners) {
    if (scale === 0) { return; }

    const overlay = this._handled;
    const map = overlay._map;
    const scaledCorners = {};

    for (let i = 0; i < 4; i++) {
      if (anchorCorners.includes(i)) {
        scaledCorners[i] = overlay.getCorner(i);
        continue;
      }

      const oppositeCorners = i === 0 ? [1, 2] : i === 1 ? [0, 3] : i === 2 ? [0, 3] : [1, 2];
      const anchor = map.project(overlay.getCorner(oppositeCorners.filter(x => anchorCorners.includes(x))[0]));
      const p = map
          .project(overlay.getCorner(i))
          .subtract(anchor)
          .multiplyBy(scale)
          .add(anchor);
      scaledCorners[i] = map.unproject(p);
    }

    overlay.setCorners(scaledCorners);
  },

  updateHandle() {
    this.setLatLng(this._handled.getCorner(this._corner));
  },
});

L.transformSquishHandle = (overlay, idx, options) => {
  return new L.TransformSquishHandle(overlay, idx, options);
};
