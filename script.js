let ul = document.querySelector('.espacoMensagens');
let nomeDoUsuario;
let nomeDoUsuarioObj;
let enviarNome;
let mandouNome = true;
let nomeDigitado;
let mensagemDigitada;

function nome(){
        //nomeDoUsuario = prompt('Qual o seu lindo nome?')
        nomeDigitado = document.querySelector('.campoNome');
        nomeDoUsuario = nomeDigitado.value;
        nomeDoUsuarioObj = {
        name: nomeDoUsuario
    }
    console.log(nomeDoUsuario)
    console.log(nomeDoUsuarioObj)
    enviarNomeComPost()
}

function enviarNomeComPost(){
    enviarNome = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', nomeDoUsuarioObj)
    enviarNome.then(sucesso);
    enviarNome.catch(erro);
}

function sucesso(){
    let divAlinhar = document.querySelector('.alinhar');
    divAlinhar.children[1].classList.add('esconde');
    divAlinhar.children[2].classList.add('esconde');
    divAlinhar.children[3].classList.add('aparece');
    divAlinhar.children[3].classList.remove('esconde');
    console.log('enviou!!!!');
    setTimeout(ativar,1500);
}
function erro(erro){
    if (erro.response.status === 400){
        alert('Esse nome já está em uso. Escolha outro!');
        window.location.reload()
    }
}
//nome();

function statusDoUsuario(){
    let enviarStatus = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', nomeDoUsuarioObj)
}



function mensagensDoServidor(){
    let mensagem = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    mensagem.then(pegarMensagem)
}
//mensagensDoServidor();

function pegarMensagem(conteudo){
    let elemento = conteudo.data;
    //console.log(elemento[0].type)
    mostraMensagem(elemento)
}

//type da mensagem for status, message ou private_message
function mostraMensagem(elemento){
    //console.log(elemento.length)
    for (let i = 0; i < elemento.length; i++){
        if (elemento[i].to == nomeDoUsuario && elemento[i].type === "private_message"){
            ul.innerHTML += `
        <li class="${elemento[i].type}"> <span class="time">(${elemento[i].time})</span> <span class="bold">${elemento[i].from}</span> reservadamente para <span class="bold">${elemento[i].to}:</span> ${elemento[i].text} </li>
        `
        } if (elemento[i].type !== "private_message"){
            ul.innerHTML += `
        <li class="${elemento[i].type}"> <span class="time">(${elemento[i].time})</span> <span class="bold">${elemento[i].from}</span> para <span class="bold">${elemento[i].to}:</span> ${elemento[i].text} </li>
        `
        }
        
    }
    let ultimaMensagem = ul.lastElementChild;
    ultimaMensagem.scrollIntoView();
}

function enviarMensagemDigitada(){
    mensagemDigitada = document.querySelector('.campo')
    let mensagemDigitadaObj = {
        from: nomeDoUsuario,
        to: "Todos", //ou pessoa para bônus
        text: mensagemDigitada.value,
        type: "message" // ou "private_message" para o bônus
    }
    mandarMsgServidor = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages',mensagemDigitadaObj)
    mandarMsgServidor.then(envioSucesso)
    mandarMsgServidor.catch(envioErro)
    mensagemDigitada.value = ""
}
//recarrega e mantem atualizado
function ativar(){
    let divConteudo = document.querySelector('.conteudo')
    let divLogin = document.querySelector('.login')
    divConteudo.classList.remove('esconde')
    divConteudo.classList.add('aparece')
    divLogin.classList.remove('aparece')
    divLogin.classList.add('esconde')
    setInterval(mensagensDoServidor,3000);
    setInterval(statusDoUsuario,5000);
}


function envioErro(){
    alert("Não foi possível enviar a mensagem")
    window.location.reload()
}
function envioSucesso(){
    console.log('mensagem enviada!!!')
    mensagensDoServidor()
}

//enter

/*

    document.addEventListener('keypress', function(evento){
        if(evento.key === "Enter"){
        let botao = document.querySelector('.envio');
        botao.click();
    });
    }

enterMensagem();

*/
