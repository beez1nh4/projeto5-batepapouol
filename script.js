let nomeDoUsuario = prompt('Qual o seu lindo nome?')
let nomeDoUsuarioObj = {
    name: nomeDoUsuario
}
console.log(nomeDoUsuarioObj)
let enviarNome = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', nomeDoUsuarioObj)

function sucesso(){
    console.log('enviou!!!!');
}
function erro(){
    nomeDoUsuario = prompt('Esse nome já está em uso. Escolha outro:');
    nomeDoUsuarioObj = {
        name: nomeDoUsuario
    }
    //enviarNome = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', nomeDoUsuarioObj)
}

enviarNome.then(sucesso);
enviarNome.catch(erro);

function statusDoUsuario(){
    let enviarStatus = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', nomeDoUsuarioObj)
}

setInterval(statusDoUsuario,5000);

let mensagem = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');

//type da mensagem for status, message ou private_message