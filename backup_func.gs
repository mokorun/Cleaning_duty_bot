function back_func() {
  try {
    nlog('count backup start');
    
    //backup date
    var today = new Date();
    
    /*conf読み込み*/
    var confData = getConf();
    
    //チャットワークメッセージ部
    var retBody = "";
    
    //sheet指定
    var spreadsheet = SpreadsheetApp.openById(confData.key).getSheetByName('シート1');
    
    //backup
    var upd = 'backup(' + today + ')';
    spreadsheet.getRange(2, 4).setValue(upd);
    
    for(var i = 3; i <= 11; i++){
      var get_backup = spreadsheet.getRange(i, 2).getValues();
      spreadsheet.getRange(i, 4).setValue(get_backup);
    }
    
    nlog('reaset fin' + today);
    
  } catch(ex) {
    //失敗したらlogに投げる
    var err_msg = "backup error";
    toErr(err_msg);
    return false;
  } 
}