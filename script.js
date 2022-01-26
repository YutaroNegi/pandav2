function _createForOfIteratorHelper(e,a){var t;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(t=_unsupportedIterableToArray(e))||a&&e&&"number"==typeof e.length){t&&(e=t);var n=0,o=function(){};return{s:o,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var r,c=!0,i=!1;return{s:function(){t=e[Symbol.iterator]()},n:function(){var e=t.next();return c=e.done,e},e:function(e){i=!0,r=e},f:function(){try{c||null==t.return||t.return()}finally{if(i)throw r}}}}function _unsupportedIterableToArray(e,a){if(e){if("string"==typeof e)return _arrayLikeToArray(e,a);var t=Object.prototype.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?_arrayLikeToArray(e,a):void 0}}function _arrayLikeToArray(e,a){(null==a||a>e.length)&&(a=e.length);for(var t=0,n=new Array(a);t<a;t++)n[t]=e[t];return n}var yutaro="script.js",id_contato="";function criar_contato_paths(){var e=$("#select_enterprise").val();switch($("#fill_warning").addClass("d-none"),$("#search_warning").addClass("d-none"),$("#search_warning_2").addClass("d-none"),e){case"1":create_contato_pf();break;case"2":create_contato_empresa();break;case"3":create_contato_create_empresa()}}function busca_interacao(e){$.ajax({url:"https://dev.liveuniversity.com:2700/busca_interacao_email",method:"post",data:{email:e}}).then((function(a){interacao=a,id_contato=a[0].id_contato;var t,n,o,r,c=a[0].contato_visibility;c=null==a[0].contato_visibility?"vazio":a[0].contato_visibility,r=0==a[0].voltou?"No-Bounce (0)":"Bounce (1)",t=null==a[0].Cargo?"":a[0].Cargo,n=null==a[0].telefone?"":a[0].telefone,o=null==a[0].area?"":a[0].area,$("#nome").val(a[0].Nome),$("#sobrenome").val(a[0].Sobrenome),$("#email").val(e),$("#id_contato").text(a[0].id_contato),$("#interacao").val(a[0].IDInteracao),$("#projeto").val(a[0].IDProjeto),$("#observacao").text(a[0].observacao),$("#status").val(a[0].status_processo),$("#operador").val(a[0].operador),$("#origem").val(a[0].origem_interacao),$("#telefone").val(n),$("#area").val(o),$("#cargo").val(t),$("#current_visibility").text(c),$("#current_bounce").text(r);var i,l="",s=_createForOfIteratorHelper(a[0].email_array);try{for(s.s();!(i=s.n()).done;)mail=i.value,l+='\n            <div class="input-group input-group-sm mb-2 email_input_div">\n              <input value=\''.concat(mail.email,"' id=\"email-").concat(mail.id_email,'" type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" readonly>\n              <img onclick="change_btn_function_user(this)" id="edit_email_btn" class="hover-pointer" src="4fa02ba3eeb22ca444b3.svg" alt="">\n              <img onclick="change_btn_function_user(this), update_contato_info(\'email\', ').concat(mail.id_email,')" id="update_email_btn" class="d-none hover-pointer check" src="222a1c7ef846e3979556.svg" alt="">\n              <img onclick="delete_parent(this, \'email\', ').concat(mail.id_email,')" id="edit_email_btn" class="d-none hover-pointer trash" src="1129c53a10f3c7163570.svg" alt="">\n            </div>\n          ')}catch(e){s.e(e)}finally{s.f()}$("#email_span").after(l);var _,d="",p=_createForOfIteratorHelper(a[0].telefone_array);try{for(p.s();!(_=p.n()).done;)phone=_.value,d+='\n            <div class="input-group input-group-sm mb-2 telefone_input_div">\n              <input value=\'('.concat(phone.DDD.toString(),") ").concat(phone.Prefixo.toString(),"-").concat(phone.Sufixo,'\' onkeypress="mask(this, mphone);" onblur="mask(this, mphone);" id="telefone-').concat(phone.id_contato_telefone,'" type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" readonly>\n              <img onclick="change_btn_function_user(this)" id="edit_telefone_btn" class="hover-pointer" src="4fa02ba3eeb22ca444b3.svg" alt="">\n              <img onclick="change_btn_function_user(this), update_contato_info(\'telefone\', ').concat(phone.id_contato_telefone,')" id="update_telefone_btn" class="d-none hover-pointer check" src="222a1c7ef846e3979556.svg" alt="">\n              <img onclick="delete_parent(this, \'telefone\', ').concat(phone.id_contato_telefone,')" id="edit_telefone_btn" class="d-none hover-pointer trash" src="1129c53a10f3c7163570.svg" alt="">\n            </div>\n          ')}catch(e){p.e(e)}finally{p.f()}$("#telefone_span").after(d),loadOff()})).fail((function(e){loadOff(),$("#search_modal").modal("show")}))}function create_contato_pf(){var e=$("#create_contato_nome").val(),a=$("#create_contato_sobrenome").val(),t=$("#create_contato_email").val(),n=$("#create_contato_sexo").val();if(e&&a&&t&&n){$("#fill_warning").addClass("d-none");var o={nome:e,sobrenome:a,email:t,sexo:n};$("#close_modal_search_btn").click(),loadOn(),modal_reset(),$.ajax({url:"https://dev.liveuniversity.com:2700/criar_contato",method:"post",data:o}).then((function(e){loadOff(),$("#resposta_criacao_contato").text("ID Contato: ".concat(e[0].id_contato)),$("#user_criado_modal").modal("show"),busca_interacao(e[0].email)})).fail((function(e){loadOff(),$("#create_contato_nome").val(""),$("#create_contato_sobrenome").val(""),$("#create_contato_email").val(""),$("#create_contato_sexo").val(""),$("#erro_criacao_modal").modal("show")}))}else $("#fill_warning").removeClass("d-none")}function create_contato_empresa(){var e=$("#create_contato_nome").val(),a=$("#create_contato_sobrenome").val(),t=$("#create_contato_email").val(),n=$("#create_contato_sexo").val(),o=$("#selected_empresa_input").attr("id_empresa");if(e&&a&&t&&n)if($("#fill_warning").addClass("d-none"),o){$("#search_warning_2").addClass("d-none");var r={nome:e,sobrenome:a,email:t,sexo:n,empresa:o};$("#close_modal_search_btn").click(),loadOn(),modal_reset(),console.log(r),$.ajax({url:"https://dev.liveuniversity.com:2700/criar_contato_empresa",method:"post",data:r}).then((function(e){loadOff(),$("#resposta_criacao_contato").text("ID Contato: ".concat(e[0].id_contato)),$("#user_criado_modal").modal("show"),busca_interacao(e[0].email)})).fail((function(e){loadOff(),$("#create_contato_nome").val(""),$("#create_contato_sobrenome").val(""),$("#create_contato_email").val(""),$("#create_contato_sexo").val(""),$("#erro_criacao_modal").modal("show")}))}else $("#search_warning_2").removeClass("d-none");else $("#fill_warning").removeClass("d-none")}function create_contato_create_empresa(){var e=$("#create_contato_nome").val(),a=$("#create_contato_sobrenome").val(),t=$("#create_contato_email").val(),n=$("#create_contato_sexo").val(),o=$("#criar_empresa_nome").val(),r=$("#criar_empresa_cnpj").val();if(e&&a&&t&&n&&o&&r){$("#fill_warning").addClass("d-none");var c={nome:e,sobrenome:a,sexo:n,email:t,empresa:o,cnpj:r};console.log(c),$("#close_modal_search_btn").click(),loadOn(),modal_reset(),$.ajax({url:"https://dev.liveuniversity.com:2700/create_contato_create_empresa_panda",method:"post",data:c}).then((function(e){console.log(e),loadOff(),$("#resposta_criacao_contato").text("ID Contato: ".concat(e[0].id_contato)),$("#user_criado_modal").modal("show"),busca_interacao(e[0].email)})).fail((function(e){loadOff(),$("#create_contato_nome").val(""),$("#create_contato_sobrenome").val(""),$("#create_contato_email").val(""),$("#create_contato_sexo").val(""),$("#erro_criacao_modal").modal("show")}))}else $("#fill_warning").removeClass("d-none")}function search_email(){var e=$("#search_email_input").val();e&&(loadOn(),busca_interacao(e),$("#close_modal_search_btn").click(),modal_reset())}function show_visbility(e,a){document.getElementById("current_visibility").innerHTML=e.innerHTML;var t={id_contato,id_visibility:a};null!=t.id_contato&&null!=t.id_visibility&&(console.log(t),$.ajax({url:"https://dev.liveuniversity.com:2700/alterar_visibilidade_panda",method:"post",data:t}).then((function(e){console.log(e)})).fail((function(e){console.log(e)})))}function open_pedidos(){loadOn(),$(".nav_items").each((function(e){$(this).removeClass("d-flex"),$(this).addClass("d-none")})),$("#historico_div").removeClass("d-none");var e={id_contato};$.ajax({url:"https://dev.liveuniversity.com:2700/get_historico_pedidos_panda",method:"post",data:e}).then((function(e){$("#pedidos_table_head").empty();var a,t="",n=_createForOfIteratorHelper(e);try{for(n.s();!(a=n.n()).done;)item=a.value,t+='\n        <tr>\n          <th scope="row">'.concat(item.id_pedido,"</th>\n          <td>").concat(item.pedido_status,"</td>\n          <td>").concat(item.pedido_data,"</td>\n        </tr>\n      ")}catch(e){n.e(e)}finally{n.f()}var o='\n      <tr>\n        <th scope="col">Order ID</th>\n        <th scope="col">Order Status</th>\n        <th scope="col">Order Date</th>\n      </tr>\n      '+t+"\n    ";$("#pedidos_table_head").append(o),loadOff()})).fail((function(e){console.log(e),loadOff()}))}function show_bounce(e,a){document.getElementById("current_bounce").innerHTML=e.innerHTML;var t={id_contato,email:senderEmail,bounce_status:a};console.log(t),null!=t.id_contato&&null!=t.bounce_status&&$.ajax({url:"https://dev.liveuniversity.com:2700/alterar_bounce_email",method:"post",data:t}).then((function(e){console.log(e)})).fail((function(e){console.log(e)}))}function select_enterprise(){$("#fill_warning").addClass("d-none");var e=$("#select_enterprise").val();switch(console.log(e),e){case"1":$(".enterprise_class").each((function(e){$(this).addClass("d-none")}));break;case"2":$(".enterprise_class").each((function(e){$(this).addClass("d-none")})),$("#procurar_empresa_div").removeClass("d-none");break;case"3":$(".enterprise_class").each((function(e){$(this).addClass("d-none")})),$("#criar_empresa_div").removeClass("d-none")}}function procura_empresa_path(){if($("#fill_warning").addClass("d-none"),$("#search_warning").addClass("d-none"),$("#search_warning_2").addClass("d-none"),$("#procura_empresa_val").val()){$("#search_warning").addClass("d-none");var e=$("#procura_empresa_tipo").val(),a=$("#procura_empresa_val").val();1==e?search_nome_empresa(a):search_cnpj_empresa(a)}else $("#search_warning").removeClass("d-none")}function search_nome_empresa(e){$("#nothing_found_div").addClass("d-none"),$("#search_load").removeClass("d-none"),$("#empresa_search_tb").empty();var a={empresa:e};$.ajax({url:"https://dev.liveuniversity.com:2700/procura_nome_empresa_panda",method:"post",data:a}).then((function(e){$("#search_load").addClass("d-none"),e.length>0?($("#empresa_search_tb_div").removeClass("d-none"),$("#nothing_found_div").addClass("d-none")):$("#nothing_found_div").removeClass("d-none");var a,t="",n=_createForOfIteratorHelper(e);try{for(n.s();!(a=n.n()).done;)item=a.value,t+="\n        <tr>\n          <td onclick=\"select_this_empresa('".concat(item.empresa,"', '").concat(item.cnpj,"' ,'").concat(item.id_empresa,'\')" style="cursor: pointer">').concat(item.empresa,"</td>\n          <td onclick=\"select_this_empresa('").concat(item.empresa,"', '").concat(item.cnpj,"' ,'").concat(item.id_empresa,'\')" style="cursor: pointer">').concat(item.cnpj,"</td>\n        </tr>\n      ")}catch(e){n.e(e)}finally{n.f()}var o='\n      <tr>\n        <th scope="col">Enterprise</th>\n        <th scope="col">CNPJ</th>\n      </tr>\n      '+t+"\n    ";$("#empresa_search_tb").append(o)})).fail((function(e){$("#search_load").addClass("d-none"),console.log(e)}))}function search_cnpj_empresa(e){$("#nothing_found_div").addClass("d-none"),$("#search_load").removeClass("d-none"),$("#empresa_search_tb").empty();var a={cnpj:e};$.ajax({url:"https://dev.liveuniversity.com:2700/procura_cnpj_empresa_panda",method:"post",data:a}).then((function(e){$("#search_load").addClass("d-none"),e.length>0?$("#empresa_search_tb_div").removeClass("d-none"):$("#nothing_found_div").removeClass("d-none");var a,t="",n=_createForOfIteratorHelper(e);try{for(n.s();!(a=n.n()).done;)item=a.value,t+="\n        <tr>\n          <td onclick=\"select_this_empresa('".concat(item.empresa,"', '").concat(item.cnpj,"' ,'").concat(item.id_empresa,'\')" style="cursor: pointer">').concat(item.empresa,"</td>\n          <td onclick=\"select_this_empresa('").concat(item.empresa,"', '").concat(item.cnpj,"' ,'").concat(item.id_empresa,'\')" style="cursor: pointer">').concat(item.cnpj,"</td>\n        </tr>\n      ")}catch(e){n.e(e)}finally{n.f()}var o='\n      <tr>\n        <th scope="col">Enterprise</th>\n        <th scope="col">CNPJ</th>\n      </tr>\n      '+t+"\n    ";$("#empresa_search_tb").append(o)})).fail((function(e){$("#search_load").addClass("d-none"),console.log(e)}))}function select_this_empresa(e,a,t){console.log(e,a),$("#selected_enterprise_div").removeClass("d-none"),$("#selected_empresa_input").val("".concat(e," - ").concat(a)),$("#selected_empresa_input").attr("id_empresa",t)}function update_contato_info(e,a){var t=$("#".concat(e)).val();a||(a=0),"email"==e&&(t=$("#email-".concat(a)).val());var n={value:t,tipo:e,id_contato,id_val:a};if("telefone"==e){var o=(t=$("#telefone-".concat(a)).val()).split(" ")[0],r=t.split(" ")[1];n={ddd:o=o.replace(/[()]/g,""),prefixo:r.split("-")[0],sufixo:r.split("-")[1],tipo:e,id_contato,id_val:a}}console.log(n),$.ajax({url:"https://dev.liveuniversity.com:2700/update_info_contato_panda",method:"post",data:n}).then((function(e){console.log(e)})).fail((function(e){console.log(e)}))}function delete_parent(e,a,t){if(1!=$(".email_input_div").length&&($(e).parent().remove(),"id_email"!=t)){var n={id_contato,tipo:a,value:t};console.log(n),$.ajax({url:"https://dev.liveuniversity.com:2700/delete_info_contato_panda",method:"post",data:n}).then((function(e){console.log(e)})).fail((function(e){console.log(e)}))}}function add_new_email(){$("#email_span").after('\n      <div class="input-group input-group-sm mb-2 email_input_div">\n        <input value=\'\' id="email-id_email" type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" readonly>\n        <img onclick="change_btn_function_user(this)" class="hover-pointer" src="4fa02ba3eeb22ca444b3.svg" alt="">\n        <img onclick="change_btn_function_user(this), insert_new_email(this)" id="update_email_btn" class="d-none hover-pointer check" src="222a1c7ef846e3979556.svg" alt="">\n        <img onclick="delete_parent(this, \'email\', \'id_email\')" id="edit_email_btn" class="d-none hover-pointer trash" src="1129c53a10f3c7163570.svg" alt="">\n      </div>\n    ')}function add_new_phone(){$("#telefone_span").after('\n      <div class="input-group input-group-sm mb-2 telefone_input_div">\n        <input value=\'\' onkeypress="mask(this, mphone);" onblur="mask(this, mphone);" id="telefone-" type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" readonly>\n        <img onclick="change_btn_function_user(this)" class="hover-pointer" src="4fa02ba3eeb22ca444b3.svg" alt="">\n        <img onclick="change_btn_function_user(this), insert_new_phone(this)" id="update_telefone_btn" class="d-none hover-pointer check" src="222a1c7ef846e3979556.svg" alt="">\n        <img onclick="delete_parent(this, \'telefone\', \'íd_email\')" id="edit_telefone_btn" class="d-none hover-pointer trash" src="1129c53a10f3c7163570.svg" alt="">\n      </div>\n    ')}function insert_new_email(e){var a={value:$(e).siblings("input").val(),id_contato};console.log(a),$.ajax({url:"https://dev.liveuniversity.com:2700/insert_new_email_panda",method:"post",data:a}).then((function(a){var t=a[0].id_email;console.log(a),$(e).attr("onclick","change_btn_function_user(this), update_contato_info('email', ".concat(t,")")),$(e).siblings("#edit_email_btn").attr("onclick","delete_parent(this, 'email', ".concat(t,")")),$(e).siblings("input").attr("id","email-".concat(t))})).fail((function(e){console.log(e)}))}function insert_new_phone(e){var a=$(e).siblings("input").val(),t=a.split(" ")[0];t=t.replace(/[()]/g,"");var n=a.split(" ")[1];n=n.split("-")[0];var o=a.split(" ")[1];o=o.split("-")[1];var r={id_contato,ddd:t,pre:n,su:o};console.log(r),$.ajax({url:"https://dev.liveuniversity.com:2700/insert_new_phone_panda",method:"post",data:r}).then((function(a){var t=a[0].id_contato_telefone;console.log(a),$(e).attr("onclick","change_btn_function_user(this), update_contato_info('telefone', ".concat(t,")")),$(e).siblings("#edit_telefone_btn").attr("onclick","delete_parent(this, 'telefone', ".concat(t,")")),$(e).siblings("input").attr("id","telefone-".concat(t))})).fail((function(e){console.log(e)}))}Office.onReady((function(e){loadOn(),item=Office.context.mailbox.item,senderEmail=item.sender.emailAddress,senderName=item.sender.displayName,busca_interacao(senderEmail)})),$("#procura_empresa_val").keydown((function(e){13==(e.keyCode?e.keyCode:e.which)&&procura_empresa_path()}));