var mailboxItem,to_andress,from_adress,email_body,receptivo,cc_adress,yutaro="on_send.js";function validateBody(e){mailboxItem.body.getAsync("text",{asyncContext:e},get_body),mailboxItem.to.getAsync({asyncContext:e},get_to),mailboxItem.from.getAsync({asyncContext:e},get_from),mailboxItem.cc.getAsync({asyncContext:e},get_cc),setTimeout((function(){mailboxItem.body.getAsync("html",{asyncContext:e},gerar_interacao_reply)}),1e3)}function get_from(e){from_adress=e.value.emailAddress}function get_to(e){to_andress=e.value[0].emailAddress}function get_cc(e){cc_adress=e.value[0].emailAddress,receptivo="receptivo@panda.com"==cc_adress?1:0}function get_body(e){email_body=e.value}function gerar_interacao_reply(e){var t={to_andress,from_adress,email_body,receptivo};console.log(t),$.ajax({url:"https://dev.liveuniversity.com:2742/gerar_interacao_reply",method:"post",data:t}).then((function(t){0==t.length?(mailboxItem.notificationMessages.addAsync("NoSend",{type:"errorMessage",message:"Already sended 5 proposals"}),e.asyncContext.completed({allowEvent:!1})):e.asyncContext.completed({allowEvent:!0})})).fail((function(t){console.log(t),mailboxItem.notificationMessages.addAsync("NoSend",{type:"errorMessage",message:"Error, Problem with sql, contact the IT team"}),e.asyncContext.completed({allowEvent:!1})}))}Office.initialize=function(e){mailboxItem=Office.context.mailbox.item};