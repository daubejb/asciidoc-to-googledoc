function convertAsciiToGoogle() {
  var myDocument = DriveApp.getFilesByName('preface.adoc').next().getBlob().getDataAsString();
  // collapse includes into mega doc
  var lines = myDocument.split("\n");
  var compound = control.extractVariables(lines); //JEFF YOU WERE HERE TRYING TO FIGURE OUT COMMENTS AND VARIABLES
  var variables = compound.variables;
  Logger.log('variables: ' + variables);
  var linesNoVariables = compound.lines

  var markup = control.removeComments(linesNoVariables);
  var parts = control.divideAsciiMarkupIntoParts(markup);


  var gParts = control.convertPartsToGoogleParts(parts);

  var title = variables.subject + ' ' + variables.customer;
  Logger.log('title: ' + title)
  var doc = g.docs.createBaseTemplatedDocument(title);
  g.docs.insertGPartsIntoDocument(gParts, doc);
  g.docs.replaceVariables(variables, doc);
}
