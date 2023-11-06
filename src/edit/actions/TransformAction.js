L.TransformAction = L.EditAction.extend({
  initialize(map, overlay, options) {
    options = options || {};
    options.toolbarIcon = {
      svg: true,
      html: 'spinner',
      tooltip: overlay.options.translation.transformImage,
      className: 'transform',
    };

    L.DistortableImage.action_map.f = '_transformMode';
    L.EditAction.prototype.initialize.call(this, map, overlay, options);
  },

  addHooks() {
    const edit = this._overlay.editing;
    edit._transformMode();
  },
});
