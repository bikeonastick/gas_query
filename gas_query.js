//function onOpen() { 
//  var spreadsheet = SpreadsheetApp.getActive();
//  var menuItems = [
//    {name: 'TestLibrary', functionName: 'testLib_'}
//  ];
//  spreadsheet.addMenu('Test', menuItems);
//}
//
//function testLib_(){
//  // query to run
//  // link to a sheet that works with this query
//  // https://docs.google.com/spreadsheets/d/1VHYCetyFLiOfOB9NALdY_OeebYuAJXlLEc7PtiFXJO4/edit?usp=sharing
//  var myQuery = '=QUERY(demo_data!A1:C7,"SELECT B,C WHERE B < 1000",1)';
//  //object 
//  var filledObj = runQuery(myQuery);
//  var message = "User:" + filledObj.getRowObj(0).get('TwitterHandle') + " has less than 1000 followers."
//  var ui = SpreadsheetApp.getUi().alert(message); 
//  Logger.log(filledObj.allData);
//  Logger.log(filledObj.getHeadings());
//  Logger.log("number of rows=" + filledObj.numRows());
//  Logger.log("number of cols=" + filledObj.numColumns());
//}

/**
 * Workaround for the fact that you cannot execute the =QUERY macro from Javascript. Works
 * by creating a temporary sheet, dumping your query into it, putting the results into a
 * JavaScript object, and deleting the sheet. REQUIRES your data has headers at the top. If
 * you are getting 'undefined' when calling get on a row, you may need to add a 1 to the end of
 * the query you are passing in: -QUERY(Sheet1!A1:D,"SELECT A, C, D WHERE B = 'sad'",1) The last
 * argument is there to tell the query engine that the top row of data is header, so it's 
 * included in the returned dataset. 
 * 
 * @param {string} a functional =QUERY macro for data within your spreadsheet
 * @return {object} an object with convenience methods for accessing the data. Call getRowObj on the 
 * returned object and each row object has convenience methods to either get the row as an array (rowArr())
 * or to just get values by name, e.g., retObj.getRowObj().get('column heading name'). 
 */
function runQuery(query) {
  var ss = SpreadsheetApp.getActive();
  var now = new Date();
  var tempSheetName = "temp"+ now.getTime();
  var tempSheet = ss.insertSheet(tempSheetName);
  tempSheet.getRange(1, 1).setFormula(query);
  var lastCol = tempSheet.getLastColumn();
  var lastRow = tempSheet.getLastRow();
  
  var sheetData = tempSheet.getRange(1, 1, lastRow, lastCol);
  
  var retObj = {
    allData: sheetData.getValues(),
    getHeadings: function() { return retObj.allData[0]; },
    getRowArr: function(rowIx) { 
      //compensate for headings row
      return retObj.allData[rowIx + 1]; 
    },
    getRowObj: function(rowIx) { 
      var rowObj = {
        rowArr: function() {return retObj.getRowArr(rowIx);},
        headings: function() { return retObj.getHeadings();},
        get: function(item) {
          var headIx = rowObj.headings().indexOf(item);
          return rowObj.rowArr()[headIx];
        }
      };
      return rowObj; 
    },
    getHeadingIndex: function(heading){ 
      var hr = retObj.getHeadings();
      return hr.indexOf(heading);
    },
    numRows: function() {
      return retObj.allData.length -1;
    },
    numColumns: function() {
      return retObj.allData[0].length;
    }
  };
  
  ss.deleteSheet(tempSheet);
  
  return retObj;
 
}

