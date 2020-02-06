function convertAsciiToGoogle() {
  var myDocument = DriveApp.getFilesByName('mydocument.adoc').next().getBlob().getDataAsString();
  var lines = myDocument.split("\n");
  var parts = control.divideAsciiMarkupIntoParts(lines);
  var gParts = control.convertPartsToGoogleParts(parts);
  var doc = g.docs.createBaseTemplatedDocument(gParts[0].text);
  g.docs.insertGPartsIntoDocument(gParts, doc);
}
