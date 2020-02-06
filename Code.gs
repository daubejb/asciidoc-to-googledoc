function convertAsciiToGoogle() {
  var myDocument = DriveApp.getFilesByName('mydocument.adoc').next().getBlob().getDataAsString();
  var lines = myDocument.split("\n");
  var parts = control.divideAsciiMarkupIntoParts(lines);
  var gParts = control.convertPartsToGoogleParts(parts);
  var doc = DocumentApp.create(gParts[0].text);
  g.docs.insertGPartsIntoDocument(gParts, doc);
}



function getBoldPositions(text) {
  var boldPositions = [];
  for (var i = 0, len = text.length; i < len; i++) {
    if (text[i] == '*') {
      boldPositions.push(i);
      Logger.log('text: ' + text[i]);
    }
  }
  return boldPositions;
}