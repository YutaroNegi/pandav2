var item,senderEmail,senderName,compose,yutaro="newAndConfig.js",perfil_participante=1,potential=1;function getAllRecipients(){toRecipients=item.to,ccRecipients=item.cc,bccRecipients=item.bcc,fromRecipients=item.from,toRecipients.getAsync((function(e){e.status==Office.AsyncResultStatus.Failed?write(e.error.message):(console.log("Receiver"),console.log(e.value[0].emailAddress),toEmail=e.value[0].emailAddress)})),fromRecipients.getAsync((function(e){e.status==Office.AsyncResultStatus.Failed?console.log(e.error.message):(console.log("Sender"),console.log(e.value),senderEmail=e.value.emailAddress,senderName=e.value.displayName,get_layout())}))}function change_perfil_dropdown(e){console.log(e),$("#perfil_dropdown").text($(e).text()),$("#perfil_dropdown").attr("value",$(e).attr("value")),perfil_participante=$(e).attr("value")}function change_potential_dropdown(e){console.log(e),$("#potential_dropdown").text($(e).text()),$("#potential_dropdown").attr("value",$(e).attr("value")),potential=$(e).attr("value")}function send_intercao(){var e={sender_email:compose?toEmail:senderEmail,to_email:compose?senderEmail:toEmail,id_projeto:Number($("#id_projeto").val()),nome_projeto:$("#nome_projeto").val(),status:Number($("#status_radio input:radio:checked").val()),id_perfil_participante:Number(perfil_participante),email_subject:$("#subject_input").val(),email_body:tinyMCE.activeEditor.getContent(),file:$("#inputGroupFile01").val(),id_contato_visibility:$("#status_radio input:radio:checked").attr("visibility"),id_potencial:potential};console.log(e),e.id_projeto?($("#id_projeto").css("border","1px solid black"),e.nome_projeto?($("#nome_projeto").css("border","1px solid black"),load.on(),$.ajax({url:"https://dev.liveuniversity.com:2700/send_interacao_decline_opt_out",method:"post",data:e}).then((function(t){load.off(),1==t[0].res?($("#sucess_modal").modal("show"),$(".clear").val(""),tinyMCE.activeEditor.setContent(""),perfil_participante=1,$("#perfil_dropdown").html("Aluno / Congressista"),e.email_body&&envia_email(e.email_subject,e.email_body,e.sender_email)):$("#error_modal").modal("show")})).fail((function(e){load.off(),console.log(e),$("#error_modal").modal("show")}))):$("#nome_projeto").css("border","1px solid red")):$("#id_projeto").css("border","1px solid red")}function save_layout(){load.on();var e={id_projeto:Number($("#id_projeto").val()),nome_projeto:$("#nome_projeto").val(),status:Number($("#status_radio input:radio:checked").val()),id_perfil_participante:Number(perfil_participante),email_subject:$("#subject_input").val(),email_body:tinyMCE.activeEditor.getContent(),id_contato_visibility:$("#status_radio input:radio:checked").attr("visibility"),sender_email:compose?senderEmail:toEmail,id_potencial:potential};$.ajax({url:"https://dev.liveuniversity.com:2700/save_layout_panda",method:"post",data:e}).then((function(e){$("#sucess_modal").modal("show"),get_layout()})).fail((function(e){$("#generic_error_modal").modal("show"),load.off()}))}function get_layout(){$.ajax({url:"https://dev.liveuniversity.com:2700/get_layout_panda",method:"post",data:{senderEmail:compose?senderEmail:toEmail}}).then((function(e){if(0!=e.length){console.log(e);var t="";e.forEach((function(e){t+='\n                <a onclick="set_layout('.concat(e.id_projeto,",'").concat(e.nome_projeto,"',").concat(e.id_perfil_participante,",").concat(e.id_contato_visibility,",'").concat(e.assunto,"','").concat(e.corpo,"', ").concat(e.id_potencial,')" value="" class="dropdown-item">').concat(e.nome_layout,"</a>\n            ")})),$("#templates").empty(),$("#templates").append(t),load.off()}else load.off()})).fail((function(e){console.log(e),load.off()}))}function set_layout(e,t,o,a,i,n,s){$("#id_projeto").val(e),$("#nome_projeto").val(t),$(".perfil_item").each((function(){console.log($(this).attr("value")),$(this).attr("value")==o&&($("#perfil_dropdown").text($(this).text()),$("#perfil_dropdown").attr("value",o),perfil_participante=o)})),$(".potential_item").each((function(){console.log($(this).attr("value")),$(this).attr("value")==s&&($("#potential_dropdown").text($(this).text()),$("#potential_dropdown").attr("value",o),potential=s)})),$(".form-check-input").each((function(e){$(this).attr("visibility")==a?$(this).prop("checked",!0):$(this).prop("checked",!1)})),$("#subject_input").val(i),tinyMCE.activeEditor.setContent(n)}function envia_email(e,t,o){var a='<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:m="http://schemas.microsoft.com/exchange/services/2006/messages" xmlns:t="http://schemas.microsoft.com/exchange/services/2006/types" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">  <soap:Header><t:RequestServerVersion Version="Exchange2010" /></soap:Header>  <soap:Body>    <m:CreateItem MessageDisposition="SendAndSaveCopy">      <m:SavedItemFolderId><t:DistinguishedFolderId Id="sentitems" /></m:SavedItemFolderId>      <m:Items>        <t:Message>          <t:Subject>'+e+'</t:Subject>          <t:Body BodyType="HTML">'+(t=htmlEncode(t))+"</t:Body>          <t:ToRecipients>            <t:Mailbox><t:EmailAddress>"+o+"</t:EmailAddress></t:Mailbox>          </t:ToRecipients>        </t:Message>      </m:Items>    </m:CreateItem>  </soap:Body></soap:Envelope>";Office.context.mailbox.makeEwsRequestAsync(a,(function(e){"failed"==e.status?showMessage("Action failed with error: "+e.error.message):showMessage("Message sent!")}))}Office.onReady((function(e){load.on(),(item=Office.context.mailbox.item).internetMessageId?(compose=!1,senderEmail=item.sender.emailAddress,senderName=item.sender.displayName,toEmail=item.to[0].emailAddress,get_layout()):(compose=!0,getAllRecipients())}));var load={on:function(){$("#load_modal").modal("show")},off:function(){$("#load_modal").modal("hide")}};function htmlEncode(e){return $("<textarea/>").text(e).html()}function htmlDecode(e){return $("<textarea/>").html(e).text()}