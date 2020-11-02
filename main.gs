function doPost(e) {
  try {
    /*conf読み込み*/
    var confData = getConf();
    
    e.method = "POST";
    var param = e.parameter;
    var contents = JSON.parse(e.postData.contents);
    
    var body = contents.webhook_event.body //本文
    var from_account = contents.webhook_event.from_account_id //who from

    var msg_proxy = body.indexOf("我來做！(gogo)", 1);
    var msg_reset = body.indexOf("今天不打掃", 1);
    var msg_retart = body.indexOf("打掃彩券 重新(gogo)", 1);

    if ( msg_proxy == -1 && msg_reset){
      var keyword = -1;
    }

    if (msg_proxy !== -1){
      console.log('代理処理');
      cln_proxy(from_account);
    }else if (msg_reset !== -1){
      console.log('カウントreset処理');
      cnt_reset();
    }else if (msg_retart !== -1){
      console.log('再抽選');
      restart();
    }else{
    }
 
    //return ContentService.createTextOutput("Hello World");
    return 0;

  } catch(ex) {
    //失敗
    var err_msg = "障害発生";
    sendMessage(err_msg);
    return false;
  }
}