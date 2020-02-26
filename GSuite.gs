var g = {
  docs: {
    replaceVariables: function(variables, doc) {
      doc.getBody().editAsText()
      .replaceText('{customer}', variables.customer) // TODO - ERROR TRAPPING IF variables.customer is undefined
      .replaceText('{docyear}', variables.docyear);  // TODO - ERROR TRAPPING IF variables.customer is undefined
    },
    insertGPartsIntoDocument: function (gParts, doc) {
      for (var i = 0, len = gParts.length; i < len; i++) {
        var part = gParts[i];
        g.docs.insertSpecificGPartType(part, doc);
      }
    },
    insertSpecificGPartType: function (part, doc) {
      switch (part.type) {
        case 'title':
          g.docs.insertTitle(part.text, doc);
          break;
        case 'newline':
          g.docs.insertNewline(doc);
          break;
        case 'h1':
          g.docs.insertH1(part.text, doc);
          break;
        case 'h2':
          g.docs.insertH2(part.text, doc);
          break;
        case 'ol':
          g.docs.insertOl(part.text, doc);
          break;
        case 'pagebreak':
          g.docs.insertPageBreak(doc);
        default:
          g.docs.insertParagraph(part.text, doc);
          break;      
      }
    },
    insertTitle: function (text, doc) {
      text = text.toUpperCase();
      var title = doc.getBody().appendParagraph(text)
      title.setHeading(DocumentApp.ParagraphHeading.TITLE);
      title.setAlignment(DocumentApp.HorizontalAlignment.CENTER);    
    },
    insertNewline: function (doc) {
      var newLine = doc.getBody().appendParagraph("\n");
    },
    insertH1: function (text, doc) {
      var h1 = doc.getBody().appendParagraph(text);
      h1.setHeading(DocumentApp.ParagraphHeading.HEADING1);
      h1.setAlignment(DocumentApp.HorizontalAlignment.LEFT);
    },
    insertH2: function (text, doc) {
      var h2 = doc.getBody().appendParagraph(text);
      h2.setHeading(DocumentApp.ParagraphHeading.HEADING2);
      h2.setAlignment(DocumentApp.HorizontalAlignment.LEFT);
    },
    insertOl: function (text, doc) {
      doc.getBody().appendListItem(text);
    },
    insertParagraph: function (text, doc) {
      var boldPositions = helper.getBoldPositions(text);
      var linkPositions = helper.getLinkPositions(text);
      Logger.log(linkPositions);
      var p = doc.getBody().appendParagraph(text);
      p.setHeading(DocumentApp.ParagraphHeading.NORMAL);
      if (boldPositions.length > 1) {
        Logger.log(p.editAsText());
        p.editAsText().setBold(boldPositions[0], boldPositions[1], true)
        p.replaceText("*", "");
      }
      if (linkPositions.length > 1) {
        var regExp = new RegExp(/link:http:.*\[\]/);
        var testText = p.editAsText().getText();
        var testText2 = regExp.exec(testText)[0];
        var replacement = testText2.slice(5,-2);
        var textToFind = testText2.toString();
        p.replaceText("link:http:.*\\[\\]", replacement)
        var link = p.findText(replacement)
        var start = link.getStartOffset();
        var text = link.getElement().asText();
        text.setLinkUrl(start, start + replacement.length, replacement);
      }
    },
    insertPageBreak: function (doc) {
      doc.getBody().appendPageBreak();
    },
    createBaseTemplatedDocument: function (title) {
      var doc = DocumentApp.create(title);
      doc.addHeader().appendImage(App.globals.images.titlePageHeaderBlob)
      .setHeight(50)
      .setWidth(50)
      .getParent()
      .asParagraph()
      .setAlignment(DocumentApp.HorizontalAlignment.CENTER);
      return doc;
    }
  }
}

//  if(element){ // if found a match
//    var start = element.getStartOffset();
//    var text = element.getElement().asText();
//    text.replaceText("<<urlGoesHere>>",url);
//    text.setLinkUrl(start, start+url.length, url);
//    doc.saveAndClose();