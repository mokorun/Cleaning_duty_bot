function clean_notice() {
  
    /*conf読み込み*/
    var confData = getConf();
    
    //sheet指定
    var spreadsheet = SpreadsheetApp.openById(confData.key).getSheetByName('シート1');
    
    
    // 土日休フラグの検証
    var currentTime = new Date();
    var holidayFlg = isHoliday(currentTime);
    if (holidayFlg) {
      return false;
    }  
    
    //check min_cnt
    var min_num = serch_min(spreadsheet);
    
    //who?
    var who = who_randam(spreadsheet,min_num);
    console.log('who:' + who);
    
    //+1
    add_one(spreadsheet,who);
    
    //チャットワークメッセージ部
    var retBody = "[info][title]打掃bot[/title]今天的打掃是。。。。。你！\n" + who + "[/info]" + "\n※如果 不在 或 在忙，想代理他 就To給我說 「我來做！(gogo)」";
    sendMessage(retBody,confData.room_id);
  }
  
  function serch_min(sheet){
    //base
    var min = sheet.getRange(3, 2).getValues();;
    
    for(var i = 3; i <= 11; i++){
      
      var get_num = sheet.getRange(i, 2).getValues();
      if (min > get_num) {
        min = get_num;
      }
      sheet.getRange(1, 2).setValue(min);
    }
    console.log('min:' + min);
    return min;
  }
  
  function who_randam(sheet,cnt_min){
    var get_who_array = [];
    var who = '';
  
    for(var i = 3; i <= 11; i++){
      
      var get_cnt = sheet.getRange(i, 2).getValues();
      var get_name = sheet.getRange(i, 1).getValues();
      console.log('cnt_min:' + cnt_min);
      console.log('get_cnt:' + get_cnt);
      console.log('get_name:' + get_name);
      if(get_cnt == cnt_min.toString()){
        get_who_array.push(get_name);
        console.log('push:' + get_name);
        console.log('who_array:' + get_who_array);
      }
    }
    var who = get_who_array[Math.floor(Math.random() * get_who_array.length)];
    sheet.getRange(2, 2).setValue(who);
    return who;
  }
  
  function add_one(sheet,who){
    for(var i = 3; i <= 11; i++){
      var get_name = sheet.getRange(i, 1).getValues();
      if (get_name == who.toString()) {
        var get_cnt = sheet.getRange(i, 2).getValues();
        console.log('add_before:' + get_cnt);
        sheet.getRange(i, 2).setValue(sheet.getRange(i, 2).getValue() + 1);  
      }
    }
  }