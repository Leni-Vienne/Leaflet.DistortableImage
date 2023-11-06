/*  eslint-disable max-len */
L.TransformRotateHandle = L.EditHandle.extend({
  options: {
    TYPE: 'transformRotate',
    icon: L.icon({
      iconUrl:
        `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
          <style type="text/css">
            .st0{ fill: %232563eb; }
            .st1{ fill: white; }
          </style>
          <path class="st0" d="M16,0L16,0c8.8,0,16,7.2,16,16l0,0c0,8.8-7.2,16-16,16l0,0C7.2,32,0,24.8,0,16l0,0C0,7.2,7.2,0,16,0z"/>
          <path class="st1" d="M16,26.4c-2.9,0-5.4-1-7.4-3s-3-4.5-3-7.4c0-2.9,1-5.3,3-7.4c2-2,4.5-3,7.4-3c1.5,0,3,0.3,4.4,0.9
            c1.4,0.6,2.6,1.5,3.5,2.7V6.9c0-0.3,0.1-0.6,0.4-0.9c0.2-0.2,0.5-0.4,0.9-0.4c0.3,0,0.6,0.1,0.9,0.4c0.2,0.2,0.4,0.5,0.4,0.9v6.5
            c0,0.3-0.1,0.6-0.4,0.9s-0.5,0.4-0.9,0.4h-6.5c-0.3,0-0.6-0.1-0.9-0.4s-0.4-0.5-0.4-0.9c0-0.3,0.1-0.6,0.4-0.9
            c0.2-0.2,0.5-0.4,0.9-0.4h4.2c-0.7-1.2-1.7-2.2-2.9-2.9c-1.2-0.7-2.5-1.1-4-1.1c-2.2,0-4.1,0.8-5.6,2.3C8.9,12,8.1,13.8,8.1,16
            s0.8,4,2.3,5.6c1.5,1.5,3.4,2.3,5.6,2.3c1.5,0,2.9-0.4,4.1-1.1c1.2-0.8,2.2-1.8,2.9-3.1c0.2-0.3,0.4-0.5,0.7-0.6
            c0.3-0.1,0.6-0.1,0.9,0c0.3,0.1,0.6,0.3,0.7,0.6c0.1,0.3,0.1,0.6,0,0.9c-0.9,1.7-2.1,3.1-3.8,4.2C19.9,25.8,18,26.4,16,26.4z"/>
        </svg>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    }),
  },

  _onHandleDrag() {
    const overlay = this._handled;
    const formerLatLng = overlay.getCorner(this._corner);
    const newLatLng = this.getLatLng();
    const angle = this.calculateAngleDelta(formerLatLng, newLatLng);
    overlay.rotateBy(angle, 'rad');
  },

  updateHandle() {
    this.setLatLng(this._handled.getCorner(this._corner));
  },
});

L.transformRotateHandle = function(overlay, idx, options) {
  return new L.TransformRotateHandle(overlay, idx, options);
};
