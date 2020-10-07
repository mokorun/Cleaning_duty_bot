function nlog(logtext) {
  /*conf読み込み*/
  var confData = getConf();
    
  //sheet指定
  var spreadsheet = SpreadsheetApp.openById(confData.key).getSheetByName('log');
  
  spreadsheet.getRange(2, 2).setValue(logtext);
  
}
