function Entity(context, image, x, y, tag) {
    this.tag = tag;
}

Entity.prototype = {
  update: function () {},
  draw: function () {
    this.context.drawImage(this.image, this.x, this.y);
  },
};
