function cnt_reset() {
  try {
    
    nlog('count reaset start');
    
    /*conf読み込み*/
    var confData = getConf();
    
    //チャットワークメッセージ部
    var retBody = "";
    
    //sheet指定
    var spreadsheet = SpreadsheetApp.openById(confData.key).getSheetByName('シート1');
    
    //reset count
    for(var i = 3; i <= 11; i++){
      var get_backup = spreadsheet.getRange(i, 4).getValues();
      spreadsheet.getRange(i, 2).setValue(get_backup);
    }
    
    nlog('reaset fin');
    
    spreadsheet.getRange(1, 2).setValue('restore');
    spreadsheet.getRange(2, 2).setValue('restore');
    
    retBody = "[info][title]打掃bot_變更[/title]好啦~ \n別忘丟垃圾[/info]";
    sendMessage(retBody,confData.room_id);
    
  } catch(ex) {
    //失敗したらlogに投げる
    var err_msg = "reset error";
    toErr(err_msg);
    return false;
  } 
}
