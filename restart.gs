function restart() {
    try {

        nlog('restart');

        /*conf読み込み*/
        var confData = getConf();

        //チャットワークメッセージ部
        var retBody = "";

        //sheet指定
        var spreadsheet = SpreadsheetApp.openById(confData.key).getSheetByName('シート1');

        //reset count
        cnt_reset2();
        nlog('reaset fin');

        spreadsheet.getRange(1, 2).setValue('restore');
        spreadsheet.getRange(2, 2).setValue('restore');

        retBody = "[info][title]打掃bot_變更[/title]重新抽(gogo)[/info]";
        sendMessage(retBody,confData.room_id);

        clean_notice();

    } catch(ex) {
        //失敗したらlogに投げる
        var err_msg = "restart error";
        toErr(err_msg);
        return false;
    }
}
