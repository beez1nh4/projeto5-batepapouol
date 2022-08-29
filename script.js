let ul = document.querySelector('.espacoMensagens');
let nomeDoUsuario;
let nomeDoUsuarioObj;
let enviarNome;
let mandouNome = true;

function nome(){
        nomeDoUsuario = prompt('Qual o seu lindo nome?')
        nomeDoUsuarioObj = {
        name: nomeDoUsuario
    }
    enviarNome = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', nomeDoUsuarioObj)
    enviarNome.then(sucesso);
    enviarNome.catch(erro);
}
    
function sucesso(){
    console.log('enviou!!!!');
}
function erro(erro){
    if (erro.response.status === 400){
        alert('Esse nome já está em uso. Escolha outro!');
        window.location.reload()
    }
}

nome();

function statusDoUsuario(){
    let enviarStatus = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', nomeDoUsuarioObj)
}

setInterval(statusDoUsuario,5000);

function mensagensDoServidor(){
    let mensagem = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    mensagem.then(pegarMensagem)
}
mensagensDoServidor();

function pegarMensagem(conteudo){
    let elemento = conteudo.data;
    //console.log(elemento[0].type)
    mostraMensagem(elemento)
}

//type da mensagem for status, message ou private_message
function mostraMensagem(elemento){
    //console.log(elemento.length)
    for (let i = 0; i < elemento.length; i++){
        ul.innerHTML += `
        <li class="${elemento[i].type}"> <span class="time">(${elemento[i].time})</span> <span class="bold">${elemento[i].from}</span> para <span class="bold">${elemento[i].to}:</span> ${elemento[i].text} </li>
        `
    }
    let ultimaMensagem = ul.lastElementChild;
    ultimaMensagem.scrollIntoView();
}

function enviarMensagemDigitada(){
    let mensagemDigitada = document.querySelector('.campo')
    let mensagemDigitadaObj = {
        from: nomeDoUsuario,
        to: "Todos", //ou pessoa para bônus
        text: mensagemDigitada.value,
        type: "message" // ou "private_message" para o bônus
    }
    mandarMsgServidor = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages',mensagemDigitadaObj)
    mandarMsgServidor.then(envioSucesso)
    mandarMsgServidor.catch(envioErro)
}


function envioErro(){
    alert("Não foi possível enviar a mensagem")
    window.location.reload()
}
function envioSucesso(){
    console.log('mensagem enviada!!!')
    mensagensDoServidor()
}