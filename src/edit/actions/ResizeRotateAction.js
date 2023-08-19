L.ResizeRotateAction = L.EditAction.extend({
  initialize(map, overlay, options) {
    options = options || {};
    options.toolbarIcon = {
      svg: true,
      html: 'spinner',
      tooltip: overlay.options.translation.resizeRotateImage,
      className: 'resizeRotate',
    };

    L.DistortableImage.action_map.f = '_resizeRotateMode';
    L.EditAction.prototype.initialize.call(this, map, overlay, options);
  },

  addHooks() {
    const edit = this._overlay.editing;
    edit._resizeRotateMode();
  },
});
