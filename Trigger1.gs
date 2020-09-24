function Trigger1() {
  
    //明日は休みかチェック
    var today = new Date();
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var d_a_tomorrow = new Date();
    d_a_tomorrow.setDate(d_a_tomorrow.getDate() + 2);
  
    var tomorrowHolidayFlg = isHoliday(tomorrow);
    var d_a_tomorrowHolidayFlg = isHoliday(d_a_tomorrow);
    
    if (d_a_tomorrowHolidayFlg) {
  
      if (tomorrowHolidayFlg) {
        today.setHours(17);
        today.setMinutes(00);
        ScriptApp.newTrigger("clean_notice").timeBased().at(today).create();
      }
      
      tomorrow.setHours(17);
      tomorrow.setMinutes(00);
      ScriptApp.newTrigger("clean_notice").timeBased().at(tomorrow).create();
      
    }else{
      d_a_tomorrow.setHours(17);
      d_a_tomorrow.setMinutes(00);
      ScriptApp.newTrigger("clean_notice").timeBased().at(d_a_tomorrow).create();
    }
  }
  
  
  function deleteTrigger(tesu) {
    var triggers = ScriptApp.getProjectTriggers();
    for(var i=0; i < triggers.length; i++) {
      if (triggers[i].getHandlerFunction() == tesu) {
        ScriptApp.deleteTrigger(triggers[i]);
      }
    }
  }
