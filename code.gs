function doGet(e) {
  return HtmlService.createTemplateFromFile("index").evaluate()
    .setTitle("Web-RPT ผู้โดยสาร")
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function processForm(formObject) {
  var searchText1 = formObject.searchtext ? formObject.searchtext.toString().toLowerCase() : "";
  var searchText2 = formObject.searchtext2 ? formObject.searchtext2.toString().toLowerCase() : "";

  var results = [];

  if (searchText1 || searchText2) {
    if (searchText1 && searchText2) {
      // Search by both fields
      results = searchByTwoColumns(searchText1, searchText2, 0, 1); // Column 0 is "ต้นทาง", Column 1 is "ปลายทาง"
    } else if (searchText1) {
      // Search by only starting location
      results = searchByColumn(searchText1, 0); // Column 0 is "ต้นทาง"
    } else if (searchText2) {
      // Search by only destination
      results = searchByColumn(searchText2, 1); // Column 1 is "ปลายทาง"
    }
  }

  return results;
}


// Function to search in a specific column
function searchByColumn(searchText, columnIndex) {
  var ss = SpreadsheetApp.openById('155qv6dH-j1EckqKyf72gm1cOhOwNRkMO3zqjLP5nGq0');
  var data = ss.getDataRange().getValues();
  var results = [];

  data.forEach(function(row) {
    if (row[columnIndex].toString().toLowerCase().includes(searchText)) {
      results.push(row);
    }
  });

  return results;
}

// SEARCH FOR MATCHED CONTENTS (used for concatenated search)
function search(searchText) {
  var ss = SpreadsheetApp.openById('1zDAqi5HsfvlY5ssohr10jUaDmJMmPLTMs2Rt1DZdCWg');
  var data = ss.getDataRange().getValues();
  var results = [];

  data.forEach(function(row) {
    var concatenatedRow = (row[0].toString().toLowerCase() + " " + row[1].toString().toLowerCase());
    if (concatenatedRow.indexOf(searchText) !== -1) {
      results.push(row);
    }
  });

  return results;
}
function searchByTwoColumns(searchText1, searchText2, columnIndex1, columnIndex2) {
  var ss = SpreadsheetApp.openById('1zDAqi5HsfvlY5ssohr10jUaDmJMmPLTMs2Rt1DZdCWg');
  var data = ss.getDataRange().getValues();
  var results = [];

  data.forEach(function(row) {
    if (row[columnIndex1].toString().toLowerCase().includes(searchText1) &&
        row[columnIndex2].toString().toLowerCase().includes(searchText2)) {
      results.push(row);
    }
  });

  return results;
}
