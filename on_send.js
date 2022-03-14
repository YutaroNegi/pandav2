let yutaro = 'on_send.js'
var mailboxItem;
var to_andress
var from_adress
var email_body
var receptivo
var cc_adress

Office.initialize = function (reason) {
    mailboxItem = Office.context.mailbox.item;
}

function validateBody(event) {
    mailboxItem.body.getAsync("text", { asyncContext: event }, get_body);
    mailboxItem.to.getAsync({ asyncContext: event }, get_to)
    mailboxItem.from.getAsync({ asyncContext: event }, get_from)
    mailboxItem.cc.getAsync({ asyncContext: event }, get_cc)

    setTimeout(() => {
        mailboxItem.body.getAsync("html", { asyncContext: event }, gerar_interacao_reply);
    }, 1000);
    
}

function get_from(events){
    from_adress = events.value.emailAddress
}

function get_to(events){
    to_andress = events.value[0].emailAddress
}

function get_cc(events){
    cc_adress = ''
    receptivo = 0

    // cc_adress = events.value[0].emailAddress

    // if(cc_adress == 'receptivo@panda.com'){
    //     receptivo = 1
    // }else{
    //     receptivo = 0
    // }
}

function get_body(events){
    email_body = events.value
}

function gerar_interacao_reply(asyncResult) {
    let data = { to_andress, from_adress, email_body, receptivo: 0}
    console.log(data);
    // return

    $.ajax({
        url: 'https://dev.liveuniversity.com:2742/gerar_interacao_reply',
        method: 'post',
        data: data
    }).then((res) => {
        asyncResult.asyncContext.completed({ allowEvent: true });
        // if(res.length == 0){
        //     mailboxItem.notificationMessages.addAsync('NoSend', { type: 'errorMessage', message: `Already sended 5 proposals` });
        //     asyncResult.asyncContext.completed({ allowEvent: false });
        // }else{
        //     asyncResult.asyncContext.completed({ allowEvent: true });
        // }
    }).fail((err)=>{
        console.log(err);
        mailboxItem.notificationMessages.addAsync('NoSend', { type: 'errorMessage', message: `Error, Problem with sql, contact the IT team` });
        asyncResult.asyncContext.completed({ allowEvent: false });
    })
}
