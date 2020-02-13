var helper = {
  getBoldPositions: function (text) {
    var boldPositions = [];
    for (var i = 0, len = text.length; i < len; i++) {
      if (text[i] == '*') {
        boldPositions.push(i);
        Logger.log('text: ' + text[i]);
      }
    }
    return boldPositions;  
  },
  getLinkPositions: function (text) {
    var linkPositions = [];
    if (text.indexOf('link:') > 0) {
      linkPositions.push(text.indexOf('link:'));
      linkPositions.push(text.indexOf('[]'));
    }
    return linkPositions;
  }
}