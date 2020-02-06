var g = {
  docs: {
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
        case 'ol':
          g.docs.insertOl(part.text, doc);
          break;
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
    insertOl: function (text, doc) {
      doc.getBody().appendListItem(text);
    },
    insertParagraph: function (text, doc) {
      var boldPositions = getBoldPositions(text);
      var p = doc.getBody().appendParagraph(text);
      p.setHeading(DocumentApp.ParagraphHeading.NORMAL);
      if (boldPositions.length > 0) {
        Logger.log(p.editAsText());
        p.editAsText().setBold(boldPositions[0], boldPositions[1], true)
      }
    }
  }
}
