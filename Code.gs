function convertAsciiToGoogle() {
  var myDocument = DriveApp.getFilesByName('preface.adoc').next().getBlob().getDataAsString();
  // collapse includes into mega doc
  var lines = myDocument.split("\n");
  var parts = control.divideAsciiMarkupIntoParts(lines);
  var gParts = control.convertPartsToGoogleParts(parts);
  var doc = g.docs.createBaseTemplatedDocument(gParts[0].text);
  g.docs.insertGPartsIntoDocument(gParts, doc);
}
