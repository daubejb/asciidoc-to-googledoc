var control = {
  divideAsciiMarkupIntoParts: function (lines) {
    var baseParts = []
    for (var i = 0, len = lines.length; i < len; i++) {
      var line = lines[i];
      var parts = control.getParts(line);
      baseParts.push(parts);
    }
    return baseParts;  
  },
  convertPartsToGoogleParts: function (parts) {
    var gParts = [];
    for (var i = 0, len = parts.length; i < len; i++) {
      var part = parts[i];
      var partType = part.type;
      part.type = control.convertPartType(partType);
      gParts.push(
        {
          type: part.type,
          text: part.text
        }
      );
    }
    return gParts;
  },
  convertPartType: function(partType) {
    switch (partType) {
      case '=': 
        return 'title';
      case '':
        return 'newline';
      case '==':
        return 'h1';
      case '===':
        return 'h2';
      case '*':
        return 'ol';
      default:
        return 'p';
    }
  },
  getParts: function (element) {
    var part = {
      type: element.substr(0,element.indexOf(' ')),
      text: element.substr(element.indexOf(' ')+1)
    };
    if (part.type !== '=' &&
        part.type !== '==' &&
        part.type !== '===' &&
        part.type !== ' ' &&
        part.type !== '*') {
      part.type = 'p';
      part.text = element;
    }
    return part;
  }
}