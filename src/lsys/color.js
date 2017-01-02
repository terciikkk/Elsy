var Color = (function() {
  function Color(r, g, b) {
    this.r = r || 0;
    this.g = g || 0;
    this.b = b || 0;
  }
  Color.prototype.str = function() {
    return 'rgb(' + Math.max(0, Math.min(255, Math.floor(this.r))) + ',' +
      Math.max(0, Math.min(255, Math.floor(this.g))) + ',' +
      Math.max(0, Math.min(255, Math.floor(this.b))) + ')';
  };
  Color.black = function() {
    return new Color(0, 0, 0);
  };
  Color.white = function() {
    return new Color(255, 255, 255);
  };
  Color.parse = (text) => {
    let match = text.toUpperCase().match(/^\#([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/);
    if (!match) return null;
    return new Color(parseInt(match[1], 16),parseInt(match[2], 16),parseInt(match[3], 16));
  }
  return Color;
})();


export default Color;
