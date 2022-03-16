// let yutaro = 'newAndConfig_1.js'
let item
let senderEmail
let senderName
let perfil_participante = 1
let potential = 1
let id_status = 8
let compose
let user_email
let corpo_email_receptivo



Office.onReady((info) => {
    load.on()
    item = Office.context.mailbox.item;
    user_email = Office.context.mailbox.userProfile.emailAddress
    Office.context.mailbox.item.body.getAsync('text', function (async) {corpo_email_receptivo = async.value});
    
    if(item.internetMessageId){
        compose = false
        senderEmail = item.sender.emailAddress
        senderName = item.sender.displayName
        toEmail = item.to[0].emailAddress
        get_layout()
    }else{
        compose = true
        getAllRecipients()
        
    }
})

function getAllRecipients() {
    toRecipients = item.to;
    ccRecipients = item.cc;
    bccRecipients = item.bcc;
    fromRecipients = item.from;
    
    toRecipients.getAsync(function (asyncResult) {
        if (asyncResult.status == Office.AsyncResultStatus.Failed){
            write(asyncResult.error.message);
        }
        else {
            console.log('Receiver');
            console.log(asyncResult.value[0].emailAddress);
            toEmail = asyncResult.value[0].emailAddress
        }    
    })
  
    fromRecipients.getAsync(function (asyncResult) {
        if (asyncResult.status == Office.AsyncResultStatus.Failed){
            console.log(asyncResult.error.message);
        }
        else {
            console.log('Sender');
            console.log(asyncResult.value)
            senderEmail = asyncResult.value.emailAddress
            senderName = asyncResult.value.displayName
            get_layout()
        }    
    })
}

function change_perfil_dropdown(item) {
    console.log(item);
    $('#perfil_dropdown').text($(item).text())
    $('#perfil_dropdown').attr('value', $(item).attr('value'))
    perfil_participante = $(item).attr('value')
}

function change_potential_dropdown(item) {
    console.log(item);
    $('#potential_dropdown').text($(item).text())
    $('#potential_dropdown').attr('value', $(item).attr('value'))
    potential = $(item).attr('value')
}

function change_status_dropdown(item) {
    console.log(item);
    $('#status_dropdown').text($(item).text())
    $('#status_dropdown').attr('value', $(item).attr('value'))
    id_status = $(item).attr('value')
}

function send_intercao(){
    let data = {
        sender_email:  compose? toEmail : senderEmail,
        to_email:  compose? senderEmail : toEmail,
        id_projeto: Number($('#id_projeto').val()),
        nome_projeto: $('#nome_projeto').val(),
        id_perfil_participante: Number(perfil_participante),
        email_subject: $('#subject_input').val(),
        email_body: tinyMCE.activeEditor.getContent(),
        file: $('#inputGroupFile01').val(),
        id_contato_visibility: $('#status_radio input:radio:checked').attr('visibility'),
        id_potencial: potential,
        id_status_processo: id_status,
        corpo_receptivo: corpo_email_receptivo
    }

    console.log(data);
    // return
    if(!data.id_projeto){
        $('#id_projeto').css('border', '1px solid red')
        return
    }else{
        $('#id_projeto').css('border', '1px solid black')
    }

    if(!data.nome_projeto){
        $('#nome_projeto').css('border', '1px solid red')
        return
    }else{
        $('#nome_projeto').css('border', '1px solid black')
    }

    load.on()
    $.ajax({
        url: 'https://dev.liveuniversity.com:2742/send_interacao_decline_opt_out',
        method: 'post',
        data: data
    }).then((res) => {
        load.off()
        if(res[0].res == 1){
            $('#sucess_modal').modal('show')   
            $('.clear').val('')
            tinyMCE.activeEditor.setContent('');
            perfil_participante = 1
            $('#perfil_dropdown').html('Aluno / Congressista')

            if(data.email_body){
                envia_email(data.email_subject, data.email_body, data.sender_email)
            }
        }else{
            $('#error_modal').modal('show')   
        }
        
    }).fail((err)=>{
        load.off()
        console.log(err);
        $('#error_modal').modal('show')   
    })
}

function save_layout(){
    load.on()
    let data = {
        id_projeto: Number($('#id_projeto').val()),
        nome_projeto: $('#nome_projeto').val(),
        status: Number($('#status_radio input:radio:checked').val()),
        id_perfil_participante: Number(perfil_participante),
        email_subject: $('#subject_input').val(),
        email_body: tinyMCE.activeEditor.getContent(),
        id_contato_visibility: $('#status_radio input:radio:checked').attr('visibility'),
        sender_email:  user_email,
        id_potencial: potential,
        favorite: $('#favorite_checkbox').is(':checked')? 1 : 0
    }

    $.ajax({
        url: 'https://dev.liveuniversity.com:2742/save_layout_panda',
        method: 'post',
        data: data
    }).then((res) => {
        $('#sucess_modal').modal('show')   
        get_layout()
    }).fail((err)=>{
        $('#generic_error_modal').modal('show')   
        load.off()
    })
}

function get_layout(){
    $.ajax({
        url: 'https://dev.liveuniversity.com:2742/get_layout_panda',
        method: 'post',
        data: {senderEmail: user_email}
    }).then((res) => {
        if(res.length == 0) {
            load.off()
            return
        }
        console.log(res);
        let drop_item = ''
        res.forEach((item)=>{
            drop_item += `
                <a onclick="set_layout(${item.id_projeto},'${item.nome_projeto}',${item.id_perfil_participante},${item.id_contato_visibility},'${item.assunto}','${item.corpo}', ${item.id_potencial})" value="" class="dropdown-item">${item.nome_layout} ${item.favorito == 1? '<img src="ecf2636e933f67901589.svg" alt=""></img>' : ''}</a>
            `
        })
        $('#templates').empty()
        $('#templates').append(drop_item)
        load.off()
    }).fail((err)=>{
        console.log(err); 
        load.off()
    })
}

function set_layout(id_projeto, nome_projeto, perfil, visibility, assunto, corpo, id_potencial){
    $('#id_projeto').val(id_projeto)
    $('#nome_projeto').val(nome_projeto)
    
    $('.perfil_item').each(function(){
        console.log($(this).attr('value'));
        if($(this).attr('value') == perfil){           
            $('#perfil_dropdown').text($(this).text())
            $('#perfil_dropdown').attr('value', perfil)
            perfil_participante = perfil
        }
    })

    $('.potential_item').each(function(){
        console.log($(this).attr('value'));
        if($(this).attr('value') == id_potencial){           
            $('#potential_dropdown').text($(this).text())
            $('#potential_dropdown').attr('value', perfil)
            potential = id_potencial
        }
    })

    $('.form-check-input').each(function(i){
        if($(this).attr('visibility') == visibility){
            $(this).prop('checked', true)
        }else{
            $(this).prop('checked', false)
        }
    })

    $('#subject_input').val(assunto)
    tinyMCE.activeEditor.setContent(corpo);
}


function envia_email(subject, body, to){
        body = htmlEncode(body)
        var request = '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:m="http://schemas.microsoft.com/exchange/services/2006/messages" xmlns:t="http://schemas.microsoft.com/exchange/services/2006/types" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
        '  <soap:Header><t:RequestServerVersion Version="Exchange2010" /></soap:Header>'+
        '  <soap:Body>'+
        '    <m:CreateItem MessageDisposition="SendAndSaveCopy">'+
        '      <m:SavedItemFolderId><t:DistinguishedFolderId Id="sentitems" /></m:SavedItemFolderId>'+
        '      <m:Items>'+
        '        <t:Message>'+
        '          <t:Subject>' + subject +'</t:Subject>'+
        '          <t:Body BodyType="HTML">'+ body +'</t:Body>'+
        '          <t:ToRecipients>'+
        '            <t:Mailbox><t:EmailAddress>' + to + '</t:EmailAddress></t:Mailbox>'+
        '          </t:ToRecipients>'+
        '        </t:Message>'+
        '      </m:Items>'+
        '    </m:CreateItem>'+
        '  </soap:Body>'+
        '</soap:Envelope>';

        Office.context.mailbox.makeEwsRequestAsync(request, function (asyncResult) {
        if (asyncResult.status == "failed") {
            showMessage("Action failed with error: " + asyncResult.error.message);
        }
        else {
            showMessage("Message sent!");
        }
        });
}

const load = {
    on: function(){
        $('#load_modal').modal('show')    
    },
    off: function(){
        $('#load_modal').modal('hide')    
    }
}

function htmlEncode(value){
    // Create a in-memory element, set its inner text (which is automatically encoded)
    // Then grab the encoded contents back out. The element never exists on the DOM.
    return $('<textarea/>').text(value).html();
  }
  
function htmlDecode(value){
    return $('<textarea/>').html(value).text();
}