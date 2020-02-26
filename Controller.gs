var control = {
  extractVariables: function (lines) {
    var compound = {};
    compound.variables = {};
    compound.lines = [];
    for (var i = 0, len = lines.length; i < len; i++) {
      var line = lines[i];
      if (line.substr(0,1) == ':') {
        var variableName = line.substr(1,line.indexOf(':',1) - 1);
        Logger.log('variable name: ' + variableName);
        compound.variables[variableName] = line.substr(line.indexOf(':',1)+1);
      } else {
        compound.lines.push(line)
      }
    }
    return compound;
  },
  removeComments: function (lines) {
    var markup = [];
    for (var i = 0, len = lines.length; i < len; i++) {
      var line = lines[i];
      if (line.substr(0,2) == '//') {
        continue;
      }
      markup.push(line);
    }
    return markup;
  },
  divideAsciiMarkupIntoParts: function (markup) {
    var baseParts = []
    for (var i = 0, len = markup.length; i < len; i++) {
      var line = markup[i];
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