// let yutaro = 'script.js'
let id_contato = ''
let cliente_email
let operador_email

Office.onReady((info) => {
    loadOn()
    item = Office.context.mailbox.item;

    if(item.internetMessageId){
        senderEmail = item.sender.emailAddress
        senderName = item.sender.displayName
        cliente_email = item.sender.emailAddress
        busca_interacao(senderEmail)
    }else{
        getAllRecipients()
    }

});


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
          cliente_email = asyncResult.value[0].emailAddress
          busca_interacao(asyncResult.value[0].emailAddress)
      }    
  })

  fromRecipients.getAsync(function (asyncResult) {
      if (asyncResult.status == Office.AsyncResultStatus.Failed){
          console.log(asyncResult.error.message);
      }
      else {
          console.log('Sender');
          console.log(asyncResult.value.emailAddress)
          operador_email = asyncResult.value.emailAddress
      }    
  })
}

function criar_contato_paths(){
  let key = $('#select_enterprise').val()

  $('#fill_warning').addClass('d-none')
  $('#search_warning').addClass('d-none')
  $('#search_warning_2').addClass('d-none')


  switch (key) {
    case '1':
      create_contato_pf()
    break;
  
    case '2':
      create_contato_empresa()
    break;

    case '3':
      create_contato_create_empresa()
    break;

  }
}

function busca_interacao(email) {
    $.ajax({
      url: 'https://dev.liveuniversity.com:2742/busca_interacao_email',
      method: 'post',
      data: {
        email: email
      }}).then((res) => {
        interacao = res
        id_contato = res[0].id_contato

        let visibility = res[0].contato_visibility
        let bounce = ''
        let cargo
        let telefone
        let area

        res[0].contato_visibility == null ? visibility = 'vazio' : visibility = res[0].contato_visibility
        res[0].voltou == 0 ? bounce = 'No-Bounce (0)' : bounce = 'Bounce (1)'
        res[0].Cargo == null? cargo = '' : cargo = res[0].Cargo
        res[0].telefone == null? telefone = '' : telefone = res[0].telefone

        $('#nome').val(res[0].Nome)
        $('#sobrenome').val(res[0].Sobrenome)
        $('#email').val(email)
        $('#id_contato').text(res[0].id_contato)
        $('#interacao').val(res[0].IDInteracao)
        $('#projeto').val(res[0].IDProjeto)
        $('#observacao').text(res[0].observacao)
        $('#status').val(res[0].status_processo)
        $('#operador').val(res[0].operador)
        $('#origem').val(res[0].origem_interacao)
        $('#telefone').val(telefone)
        $('#cargo').val(cargo)
        $('#projeto_nome').val(res[0].nome_projeto)

        $('#current_visibility').text(visibility)
        $('#current_bounce').text(bounce)

        let email_html = '' 
        for(mail of res[0].email_array){
          email_html += `
            <div class="input-group input-group-sm mb-2 email_input_div">
              <input value='${mail.email}' id="email-${mail.id_email}" type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" readonly>
              <img onclick="change_btn_function_user(this)" id="edit_email_btn" class="hover-pointer" src="4fa02ba3eeb22ca444b3.svg" alt="">
              <img onclick="change_btn_function_user(this), update_contato_info('email', ${mail.id_email})" id="update_email_btn" class="d-none hover-pointer check" src="222a1c7ef846e3979556.svg" alt="">
              <img onclick="delete_parent(this, 'email', ${mail.id_email})" id="edit_email_btn" class="d-none hover-pointer trash" src="1129c53a10f3c7163570.svg" alt="">
            </div>
          `
        }

        $('#email_span').after(email_html)

        let telefone_html = '' 
        for(phone of res[0].telefone_array){
          telefone_html += `
            <div class="input-group input-group-sm mb-2 telefone_input_div">
              <input value='(${phone.DDD.toString()}) ${phone.Prefixo.toString()}-${phone.Sufixo}' onkeypress="mask(this, mphone);" onblur="mask(this, mphone);" id="telefone-${phone.id_contato_telefone}" type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" readonly>
              <img onclick="change_btn_function_user(this)" id="edit_telefone_btn" class="hover-pointer" src="4fa02ba3eeb22ca444b3.svg" alt="">
              <img onclick="change_btn_function_user(this), update_contato_info('telefone', ${phone.id_contato_telefone})" id="update_telefone_btn" class="d-none hover-pointer check" src="222a1c7ef846e3979556.svg" alt="">
              <img onclick="delete_parent(this, 'telefone', ${phone.id_contato_telefone})" id="edit_telefone_btn" class="d-none hover-pointer trash" src="1129c53a10f3c7163570.svg" alt="">
            </div>
          `
        }

        $('#telefone_span').after(telefone_html)


        let area_html = ''
        for(area of res[0].area_array){
          area_html += `
          <div class='area_container'>
            <div class="input-group input-group-sm mb-2 area_input_div">
              <input value="${area.area}" id="area_input_${area.id_contato_area}" type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"readonly>
              <img onclick="change_btn_area_user(${area.id_contato_area})" class="hover-pointer" src="4fa02ba3eeb22ca444b3.svg" alt="">
            </div>

            <div id="area_dropdown_div_${area.id_contato_area}" class="dropdown mb-4 d-none area_drop_class">
                <button  class="btn btn-secondary dropdown-toggle bg-live" type="button" id="area_${area.id_contato_area}" data-toggle="dropdown" aria-expanded="false" style="width: 69vw;">
                  ${area.area}
                </button>
                <img onclick="change_btn_area_user(${area.id_contato_area}), update_contato_info('area', ${area.id_contato_area})" class="hover-pointer" src="222a1c7ef846e3979556.svg" alt="">
                <img onclick="delete_parent(this, 'area', ${area.id_contato_area})" class="hover-pointer trash" src="1129c53a10f3c7163570.svg" alt="">
                <div class="dropdown-menu" aria-labelledby="area">
                  <a class="dropdown-item area_item" onclick="change_area_dropdown(this, ${area.id_contato_area})" value="1">Administrativo</a>
                  <a class="dropdown-item area_item" onclick="change_area_dropdown(this, ${area.id_contato_area})" value="2">Compras ou Suprimentos</a>
                  <a class="dropdown-item area_item" onclick="change_area_dropdown(this, ${area.id_contato_area})" value="3">Comunicação</a>
                  <a class="dropdown-item area_item" onclick="change_area_dropdown(this, ${area.id_contato_area})" value="4">Fiscal, Contábil e Tributária</a>
                  <a class="dropdown-item area_item" onclick="change_area_dropdown(this, ${area.id_contato_area})" value="5">Logística</a>
                  <a class="dropdown-item area_item" onclick="change_area_dropdown(this, ${area.id_contato_area})" value="6">Marketing</a>
                  <a class="dropdown-item area_item" onclick="change_area_dropdown(this, ${area.id_contato_area})" value="7">Produção</a>
                  <a class="dropdown-item area_item" onclick="change_area_dropdown(this, ${area.id_contato_area})" value="8">Qualidade</a>
                  <a class="dropdown-item area_item" onclick="change_area_dropdown(this, ${area.id_contato_area})" value="9">RH</a>
                  <a class="dropdown-item area_item" onclick="change_area_dropdown(this, ${area.id_contato_area})" value="10">TI - Genérico</a>
                  <a class="dropdown-item area_item" onclick="change_area_dropdown(this, ${area.id_contato_area})" value="11">Vendas</a>
                  <a class="dropdown-item area_item" onclick="change_area_dropdown(this, ${area.id_contato_area})" value="13">Indefinido</a>
                  <a class="dropdown-item area_item" onclick="change_area_dropdown(this, ${area.id_contato_area})" value="15">Operacional Administrativo</a>
                  <a class="dropdown-item area_item" onclick="change_area_dropdown(this, ${area.id_contato_area})" value="16">Jurídico</a>
                  <a class="dropdown-item area_item" onclick="change_area_dropdown(this, ${area.id_contato_area})" value="18">Financeiro</a>
                  <a class="dropdown-item area_item" onclick="change_area_dropdown(this, ${area.id_contato_area})" value="20">Inteligência de Mercado</a>
                  <a class="dropdown-item area_item" onclick="change_area_dropdown(this, ${area.id_contato_area})" value="21">TI - Infra</a>
                  <a class="dropdown-item area_item" onclick="change_area_dropdown(this, ${area.id_contato_area})" value="22">TI - Governança</a>
                  <a class="dropdown-item area_item" onclick="change_area_dropdown(this, ${area.id_contato_area})" value="23">TI - Serviços</a>
                  <a class="dropdown-item area_item" onclick="change_area_dropdown(this, ${area.id_contato_area})" value="24">TI - Sistemas</a>
                  <a class="dropdown-item area_item" onclick="change_area_dropdown(this, ${area.id_contato_area})" value="25">TI - Suporte</a>
                  <a class="dropdown-item area_item" onclick="change_area_dropdown(this, ${area.id_contato_area})" value="26">Planejamento</a>
                  <a class="dropdown-item area_item" onclick="change_area_dropdown(this, ${area.id_contato_area})" value="27">RH - Dpto. Pessoal</a>
                  <a class="dropdown-item area_item" onclick="change_area_dropdown(this, ${area.id_contato_area})" value="28">Projetos</a>
                  <a class="dropdown-item area_item" onclick="change_area_dropdown(this, ${area.id_contato_area})" value="29">Importação Robos</a>
                </div>
              </div>
            </div>
          </div>
          `
        }
        $('#area_span').after(area_html)

        loadOff()
      }).fail((err)=>{
        loadOff()
        $('#search_modal').modal('show');
      })
}

function create_contato_pf(){
  let nome = $('#create_contato_nome').val()
  let sobrenome = $('#create_contato_sobrenome').val()
  let email = $('#create_contato_email').val()
  let sexo = $('#create_contato_sexo').val()
  let area = $('#select_area').val()

  if(!nome || !sobrenome || !email || !sexo){
    $('#fill_warning').removeClass('d-none')
    return
  } else{
    $('#fill_warning').addClass('d-none')
  }

  let data = {
    nome:nome,
    sobrenome:sobrenome,
    email:email,
    sexo:sexo,
    area: area
  }

  $('#close_modal_search_btn').click()
  loadOn()
  modal_reset()

  $.ajax({
      url: 'https://dev.liveuniversity.com:2742/criar_contato',
      method: 'post',
      data: data
  }).then((res) => {
      loadOff()
      $('#resposta_criacao_contato').text(`ID Contato: ${res[0].id_contato}`)
      $('#user_criado_modal').modal('show')
      busca_interacao(res[0].email)
  }).fail((err)=>{
      loadOff()
      $('#create_contato_nome').val('')
      $('#create_contato_sobrenome').val('')
      $('#create_contato_email').val('')
      $('#create_contato_sexo').val('')
      $('#erro_criacao_modal').modal('show');
  })
}

function create_contato_empresa(){
  let nome = $('#create_contato_nome').val()
  let sobrenome = $('#create_contato_sobrenome').val()
  let email = $('#create_contato_email').val()
  let sexo = $('#create_contato_sexo').val()
  let empresa = $('#selected_empresa_input').attr('id_empresa')
  let area = $('#select_area').val()


  if(!nome || !sobrenome || !email || !sexo){
    $('#fill_warning').removeClass('d-none')
    return
  }else{
    $('#fill_warning').addClass('d-none')
  }

  if(!empresa){
    $('#search_warning_2').removeClass('d-none')
    return
  }else{
    $('#search_warning_2').addClass('d-none')
  }

  let data = {
    nome:nome,
    sobrenome:sobrenome,
    email:email,
    sexo:sexo,
    empresa:empresa,
    area: area
  }

  $('#close_modal_search_btn').click()
  loadOn()
  modal_reset()

  console.log(data);
  // return
  $.ajax({
      url: 'https://dev.liveuniversity.com:2742/criar_contato_empresa',
      method: 'post',
      data: data
  }).then((res) => {
      loadOff()
      $('#resposta_criacao_contato').text(`ID Contato: ${res[0].id_contato}`)
      $('#user_criado_modal').modal('show')
      busca_interacao(res[0].email)
  }).fail((err)=>{
      loadOff()
      $('#create_contato_nome').val('')
      $('#create_contato_sobrenome').val('')
      $('#create_contato_email').val('')
      $('#create_contato_sexo').val('')
      $('#erro_criacao_modal').modal('show');
  })
}

function create_contato_create_empresa(){
  let nome = $('#create_contato_nome').val()
  let sobrenome = $('#create_contato_sobrenome').val()
  let email = $('#create_contato_email').val()
  let sexo = $('#create_contato_sexo').val()
  let empresa = $('#criar_empresa_nome').val()
  let cnpj = $('#criar_empresa_cnpj').val()
  let area = $('#select_area').val()


  if(!nome || !sobrenome || !email || !sexo || !empresa || !cnpj){
    $('#fill_warning').removeClass('d-none')
    return
  } else{
    $('#fill_warning').addClass('d-none')
  }

  let data = {
    nome: nome,
    sobrenome: sobrenome,
    sexo: sexo,
    email: email,
    empresa: empresa,
    cnpj: cnpj,
    area: area
  }
  
  console.log(data);

  $('#close_modal_search_btn').click()
  loadOn()
  modal_reset()

  $.ajax({
      url: 'https://dev.liveuniversity.com:2742/create_contato_create_empresa_panda',
      method: 'post',
      data: data
  }).then((res) => {
    console.log(res);
      loadOff()
      $('#resposta_criacao_contato').text(`ID Contato: ${res[0].id_contato}`)
      $('#user_criado_modal').modal('show')
      busca_interacao(res[0].email)
  }).fail((err)=>{
      loadOff()
      $('#create_contato_nome').val('')
      $('#create_contato_sobrenome').val('')
      $('#create_contato_email').val('')
      $('#create_contato_sexo').val('')
      $('#erro_criacao_modal').modal('show');
  })
}

function search_email(){
  let email = $('#search_email_input').val()

  if(!email)return

  if($('#add_email_search').is(':checked')){
    add_email_search()
  }

  loadOn()
  busca_interacao(email)
  $('#close_modal_search_btn').click()

  modal_reset()
}

function add_email_search(){
    console.log(cliente_email,  $('#search_email_input').val());

    data = {
      add: cliente_email,
      search: $('#search_email_input').val()
    }

    $.ajax({
        url: 'https://dev.liveuniversity.com:2742/add_email_search',
        method: 'post',
        data: data
    }).then((res) => {
        console.log(res);
    }).fail((err)=>{
        console.log(err);
    })
}

function show_visbility(item, id_visibility) {
  document.getElementById("current_visibility").innerHTML = item.innerHTML;
  let data = {
    id_contato,
    id_visibility
  }

  if(data.id_contato == null || data.id_visibility == null) return

  console.log(data);

  $.ajax({
    url: 'https://dev.liveuniversity.com:2742/alterar_visibilidade_panda',
    method: 'post',
    data: data
  }).then((res) => {
    console.log(res);
  }).fail((err)=>{
    console.log(err);
  })
}

function open_pedidos(){
  loadOn()
  $('.nav_items').each(function(e){
      $(this).removeClass('d-flex')
      $(this).addClass('d-none')
  })
  $('#historico_div').removeClass('d-none')

  let data = {
    id_contato
  }

  $.ajax({
    url: 'https://dev.liveuniversity.com:2742/get_historico_pedidos_panda',
    method: 'post',
    data: data
  }).then((res) => {
    $('#pedidos_table_head').empty()
    let row = ''
    for(item of res){
      row += `
        <tr>
          <th scope="row"><a style="color: purple" href="http://liveulabs.com/order_manager/${item.id_pedido}">${item.id_pedido}</a></th>
          <td>${item.pedido_status}</td>
          <td>${item.pedido_data}</td>
        </tr>
      `
    }

    let table = `
      <tr>
        <th scope="col">Order ID</th>
        <th scope="col">Order Status</th>
        <th scope="col">Order Date</th>
      </tr>
      `+ row +`
    `

    $('#pedidos_table_head').append(table)
    loadOff()
  }).fail((err)=>{
    console.log(err);
    loadOff()

  })
}
  
function show_bounce(item, bounce_status) {
  document.getElementById("current_bounce").innerHTML = item.innerHTML;

  let data = {
    id_contato,
    email: senderEmail,
    bounce_status
  }

  console.log(data);
  
  if(data.id_contato == null || data.bounce_status == null) return

  $.ajax({
    url: 'https://dev.liveuniversity.com:2742/alterar_bounce_email',
    method: 'post',
    data: data
  }).then((res) => {
    console.log(res);
  }).fail((err)=>{
    console.log(err);
  })
}


function select_enterprise(){
  $('#fill_warning').addClass('d-none')
  //1 = PF // 2 = Procurar empresa // 3 = Criar empresa
  let key = $('#select_enterprise').val()

  console.log(key);

  switch (key) {
    //pessoa fisica
    case '1':
      $('.enterprise_class').each(function(i){
        $(this).addClass('d-none')
      })
      
    break;
  

    //Procurar empresa
    case '2':
      $('.enterprise_class').each(function(i){
        $(this).addClass('d-none')
      })

      $('#procurar_empresa_div').removeClass('d-none')
      
    break;


    //Criar empresa
    case '3':
      $('.enterprise_class').each(function(i){
          $(this).addClass('d-none')
      })

      $('#criar_empresa_div').removeClass('d-none')

    break;
  }
}

function procura_empresa_path(){
  $('#fill_warning').addClass('d-none')
  $('#search_warning').addClass('d-none')
  $('#search_warning_2').addClass('d-none')

  if(!$('#procura_empresa_val').val()){
    $('#search_warning').removeClass('d-none')
    return
  }else{
    $('#search_warning').addClass('d-none')
  }

  let tipo = $('#procura_empresa_tipo').val()
  let val = $('#procura_empresa_val').val()

  if(tipo == 1){
    search_nome_empresa(val)
  }else{
    search_cnpj_empresa(val)
  }
}


function search_nome_empresa(val){
  $('#nothing_found_div').addClass('d-none')
  $('#search_load').removeClass('d-none')
  $('#empresa_search_tb').empty()
  let data = {
    empresa: val
  }

  $.ajax({
    url: 'https://dev.liveuniversity.com:2742/procura_nome_empresa_panda',
    method: 'post',
    data: data
  }).then((res) => {
    $('#search_load').addClass('d-none')
    if(res.length > 0){
      $('#empresa_search_tb_div').removeClass('d-none')
      $('#nothing_found_div').addClass('d-none')
    }else{
      $('#nothing_found_div').removeClass('d-none')
    }
    
    let row = ''

    for(item of res){
      row += `
        <tr>
          <td onclick="select_this_empresa('${item.empresa}', '${item.cnpj}' ,'${item.id_empresa}')" style="cursor: pointer">${item.empresa}</td>
          <td onclick="select_this_empresa('${item.empresa}', '${item.cnpj}' ,'${item.id_empresa}')" style="cursor: pointer">${item.cnpj}</td>
        </tr>
      `
    }

    let table = `
      <tr>
        <th scope="col">Enterprise</th>
        <th scope="col">CNPJ</th>
      </tr>
      `+ row +`
    `

    $('#empresa_search_tb').append(table)
  }).fail((err)=>{
    $('#search_load').addClass('d-none')
    console.log(err);
  })
}

function search_cnpj_empresa(val){
  $('#nothing_found_div').addClass('d-none')
  $('#search_load').removeClass('d-none')
  $('#empresa_search_tb').empty()
  let data = {
    cnpj: val
  }

  $.ajax({
    url: 'https://dev.liveuniversity.com:2742/procura_cnpj_empresa_panda',
    method: 'post',
    data: data
  }).then((res) => {
    $('#search_load').addClass('d-none')
    if(res.length > 0){
      $('#empresa_search_tb_div').removeClass('d-none')
    }else{
      $('#nothing_found_div').removeClass('d-none')
    }
    
    let row = ''

    for(item of res){
      row += `
        <tr>
          <td onclick="select_this_empresa('${item.empresa}', '${item.cnpj}' ,'${item.id_empresa}')" style="cursor: pointer">${item.empresa}</td>
          <td onclick="select_this_empresa('${item.empresa}', '${item.cnpj}' ,'${item.id_empresa}')" style="cursor: pointer">${item.cnpj}</td>
        </tr>
      `
    }

    let table = `
      <tr>
        <th scope="col">Enterprise</th>
        <th scope="col">CNPJ</th>
      </tr>
      `+ row +`
    `

    $('#empresa_search_tb').append(table)
  }).fail((err)=>{
    $('#search_load').addClass('d-none')
    console.log(err);
  })
}

function select_this_empresa(empresa, cnpj ,id_empresa){
  console.log(empresa, cnpj);

  $('#selected_enterprise_div').removeClass('d-none')
  $('#selected_empresa_input').val(`${empresa} - ${cnpj}` )
  $('#selected_empresa_input').attr('id_empresa', id_empresa)
}

$('#procura_empresa_val').keydown(function(event){ 
  var keyCode = (event.keyCode ? event.keyCode : event.which);   
  if (keyCode == 13) {
      procura_empresa_path()
  }
});

function update_contato_info(tipo, id_val){
    let value = $(`#${tipo}`).val()

    if (!id_val){
      id_val = 0
    }
    
    if(tipo == 'email'){
      value = $(`#email-${id_val}`).val()
    }

    let data = {value, tipo, id_contato, id_val}

    if(tipo == 'telefone'){
      value =  $(`#telefone-${id_val}`).val()

      let ddd = value.split(' ')[0]
      let number = value.split(' ')[1]

      ddd = ddd.replace(/[()]/g, '')
      
      let prefixo = number.split('-')[0]
      let sufixo = number.split('-')[1]


      data = {ddd, prefixo, sufixo, tipo, id_contato, id_val}
    }

    if(tipo == 'area'){
      value = $(`#area_${id_val}`).attr('value')
      data.value = value
    }


    console.log(data);
    // return
    $.ajax({
      url: 'https://dev.liveuniversity.com:2742/update_info_contato_panda',
      method: 'post',
      data: data
    }).then((res) => {
      console.log(res);
    }).fail((err)=>{
      console.log(err);
    })
}

function delete_parent(element, tipo, value){
  if($('.email_input_div').length == 1 && tipo == 'email') return

  if($('.telefone_input_div').length == 1 && tipo == 'telefone') return

  if($('.area_input_div').length == 1 && tipo == 'area') return
  
  if(tipo == 'area'){
      $(`#area_input_${value}`).parent().remove()
      $(`#area_dropdown_div_${value}`).remove()
  }else{
      $(element).parent().remove()
  }
  
  

  if(value == 'id_email') return

  let data = {id_contato, tipo, value }
  console.log(data);
  // return
  $.ajax({
    url: 'https://dev.liveuniversity.com:2742/delete_info_contato_panda',
    method: 'post',
    data: data
  }).then((res) => {
    console.log(res);
  }).fail((err)=>{
    console.log(err);
  })
}

function add_new_email(){
   let email_html = `
      <div class="input-group input-group-sm mb-2 email_input_div">
        <input value='' id="email-id_email" type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" readonly>
        <img onclick="change_btn_function_user(this)" class="hover-pointer email_edit_click" src="4fa02ba3eeb22ca444b3.svg" alt="">
        <img onclick="change_btn_function_user(this), insert_new_email(this)" id="update_email_btn" class="d-none hover-pointer check" src="222a1c7ef846e3979556.svg" alt="">
        <img onclick="delete_parent(this, 'email', 'id_email')" id="edit_email_btn" class="d-none hover-pointer trash" src="1129c53a10f3c7163570.svg" alt="">
      </div>
    `

  $('#email_span').after(email_html)
  $('.email_edit_click').click()

}

function add_new_phone(){
    let telefone_html = `
      <div class="input-group input-group-sm mb-2 telefone_input_div">
        <input value='' onkeypress="mask(this, mphone);" onblur="mask(this, mphone);" id="telefone-" type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" readonly>
        <img onclick="change_btn_function_user(this)" class="hover-pointer telefone_edit_click" src="4fa02ba3eeb22ca444b3.svg" alt="">
        <img onclick="change_btn_function_user(this), insert_new_phone(this)" id="update_telefone_btn" class="d-none hover-pointer check" src="222a1c7ef846e3979556.svg" alt="">
        <img onclick="delete_parent(this, 'telefone', 'íd_email')" id="edit_telefone_btn" class="d-none hover-pointer trash" src="1129c53a10f3c7163570.svg" alt="">
      </div>
    `

    $('#telefone_span').after(telefone_html)
    $('.telefone_edit_click').click()
}

function add_new_area(){
    let area_html = `
    <div class='area_container'>
        <div class="input-group input-group-sm mb-2 area_input_div d-none">
          <input value="1" id="area_input_" type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"readonly>
          <img onclick="change_btn_area_user()" class="hover-pointer" src="4fa02ba3eeb22ca444b3.svg" alt="">
        </div>

        <div id="area_dropdown_div_" class="dropdown mb-4 area_drop_class">
            <button value="1" class="btn btn-secondary dropdown-toggle bg-live" type="button" id="area_" data-toggle="dropdown" aria-expanded="false" style="width: 69vw;">Administrativo</button>
            <img onclick="change_btn_area_user(), insert_new_area(this)" class="hover-pointer" src="222a1c7ef846e3979556.svg" alt="">
            <img onclick="delete_parent(this, 'area', )" class="hover-pointer trash" src="1129c53a10f3c7163570.svg" alt="">
            <div class="dropdown-menu" aria-labelledby="area">
              <a class="dropdown-item area_item" onclick="change_area_dropdown(this)" value="1">Administrativo</a>
              <a class="dropdown-item area_item" onclick="change_area_dropdown(this)" value="2">Compras ou Suprimentos</a>
              <a class="dropdown-item area_item" onclick="change_area_dropdown(this)" value="3">Comunicação</a>
              <a class="dropdown-item area_item" onclick="change_area_dropdown(this)" value="4">Fiscal, Contábil e Tributária</a>
              <a class="dropdown-item area_item" onclick="change_area_dropdown(this)" value="5">Logística</a>
              <a class="dropdown-item area_item" onclick="change_area_dropdown(this)" value="6">Marketing</a>
              <a class="dropdown-item area_item" onclick="change_area_dropdown(this)" value="7">Produção</a>
              <a class="dropdown-item area_item" onclick="change_area_dropdown(this)" value="8">Qualidade</a>
              <a class="dropdown-item area_item" onclick="change_area_dropdown(this)" value="9">RH</a>
              <a class="dropdown-item area_item" onclick="change_area_dropdown(this)" value="10">TI - Genérico</a>
              <a class="dropdown-item area_item" onclick="change_area_dropdown(this)" value="11">Vendas</a>
              <a class="dropdown-item area_item" onclick="change_area_dropdown(this)" value="13">Indefinido</a>
              <a class="dropdown-item area_item" onclick="change_area_dropdown(this)" value="15">Operacional Administrativo</a>
              <a class="dropdown-item area_item" onclick="change_area_dropdown(this)" value="16">Jurídico</a>
              <a class="dropdown-item area_item" onclick="change_area_dropdown(this)" value="18">Financeiro</a>
              <a class="dropdown-item area_item" onclick="change_area_dropdown(this)" value="20">Inteligência de Mercado</a>
              <a class="dropdown-item area_item" onclick="change_area_dropdown(this)" value="21">TI - Infra</a>
              <a class="dropdown-item area_item" onclick="change_area_dropdown(this)" value="22">TI - Governança</a>
              <a class="dropdown-item area_item" onclick="change_area_dropdown(this)" value="23">TI - Serviços</a>
              <a class="dropdown-item area_item" onclick="change_area_dropdown(this)" value="24">TI - Sistemas</a>
              <a class="dropdown-item area_item" onclick="change_area_dropdown(this)" value="25">TI - Suporte</a>
              <a class="dropdown-item area_item" onclick="change_area_dropdown(this)" value="26">Planejamento</a>
              <a class="dropdown-item area_item" onclick="change_area_dropdown(this)" value="27">RH - Dpto. Pessoal</a>
              <a class="dropdown-item area_item" onclick="change_area_dropdown(this)" value="28">Projetos</a>
              <a class="dropdown-item area_item" onclick="change_area_dropdown(this)" value="29">Importação Robos</a>
            </div>
          </div>
        </div> 
    </div>
    `

    $('#area_span').after(area_html)
}

function insert_new_email(e){
    let data = {value: $(e).siblings('input').val(),id_contato}
    console.log(data);
    // return
    $.ajax({
      url: 'https://dev.liveuniversity.com:2742/insert_new_email_panda',
      method: 'post',
      data: data
    }).then((res) => {
      let id_email = res[0].id_email
      console.log(res);

      $(e).attr('onclick', `change_btn_function_user(this), update_contato_info('email', ${id_email})`)
      $(e).siblings('#edit_email_btn').attr('onclick', `delete_parent(this, 'email', ${id_email})`)
      $(e).siblings('input').attr('id', `email-${id_email}`)
    }).fail((err)=>{
      console.log(err);
    })
}

function insert_new_phone(e){
  let telefone =  $(e).siblings('input').val()
  let ddd = telefone.split(' ')[0]
  ddd = ddd.replace(/[()]/g, '')

  let pre = telefone.split(' ')[1]
  pre = pre.split('-')[0]

  let su = telefone.split(' ')[1]
  su = su.split('-')[1]

  let data = {id_contato, ddd, pre, su}
  console.log(data);

  $.ajax({
    url: 'https://dev.liveuniversity.com:2742/insert_new_phone_panda',
    method: 'post',
    data: data
  }).then((res) => {
    let id_phone = res[0].id_contato_telefone
    console.log(res);

    $(e).attr('onclick', `change_btn_function_user(this), update_contato_info('telefone', ${id_phone})`)
    $(e).siblings('#edit_telefone_btn').attr('onclick', `delete_parent(this, 'telefone', ${id_phone})`)
    $(e).siblings('input').attr('id', `telefone-${id_phone}`)
  }).fail((err)=>{
    console.log(err);
  })
}


function insert_new_area(elm){
  let value = $(elm).siblings('button').attr('value')
  let text = $(elm).siblings('button').text()
  let data = {id_contato, value}

  $.ajax({
    url: 'https://dev.liveuniversity.com:2742/insert_new_area_panda',
    method: 'post',
    data: data
  }).then((res) => {
    let drop_items = $(elm).siblings('.dropdown-menu').children('a')
    $(drop_items).attr('onclick', `change_area_dropdown(this, ${res[0].id_contato_area})`)

    let button = $(elm).siblings('button')
    $(button).attr('id', `area_${res[0].id_contato_area}`)

    let dropdown = $(elm).parent()
    $(dropdown).attr('id', `area_dropdown_div_${res[0].id_contato_area}`)
    $(dropdown).addClass('d-none')

    let input = $(dropdown).siblings('.input-group').children('input')
    $(input).val(text)
    $(input).attr('id', `area_input_${res[0].id_contato_area}`)
    $(input).parent().removeClass('d-none')

    let edit_btn = $(input).siblings('img')
    $(edit_btn).attr('onclick', `change_btn_area_user(${res[0].id_contato_area})`)

    $(elm).attr('onclick', `change_btn_area_user(${res[0].id_contato_area}), update_contato_info('area', ${res[0].id_contato_area})`)
    let delete_btn = $(elm).siblings('img')
    $(delete_btn).attr('onclick', `delete_parent(this, 'area', ${res[0].id_contato_area})`)
  }).fail((err)=>{
    console.log(err);
  })
}