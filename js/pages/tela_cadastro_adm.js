'use strict'

import { postADM } from '../methods.js'
import { renderizarPagina } from '../main.js'
import { criarLogin } from './tela_logar_adm.js'


export function cadastroADM(){

    const style = document.getElementById('style')
    style.href = './css/login.css'


    const main = document.getElementById('main')
    const header = document.getElementById('header')
    const body = document.getElementById('body')
    header.replaceChildren()
    main.replaceChildren()

    


    const div_padronizar_tela = document.createElement('div')
    div_padronizar_tela.className = 'padronizar-tela-login'

    const div_container_logar = document.createElement('div')
    div_container_logar.className = 'containerLogar'
    
    const div_guardar_logo = document.createElement('div')
    div_guardar_logo.className = 'guardarLogo'

    const imagemLogo = document.createElement('img')
    imagemLogo.src = './img/logo2.png'
    imagemLogo.alt = 'logo da empresa'

    div_guardar_logo.append(imagemLogo)


    const div_guardar_itens = document.createElement('div')
    div_guardar_itens.className = 'guardarItens'

    const h2_mensagem_bem_vindo = document.createElement('h2')
    h2_mensagem_bem_vindo.textContent = 'Seja bem vindo(a)!!'
    
    const button_entrar = document.createElement('button')
    button_entrar.className = 'btn-login'
    button_entrar.id = 'btn-logar'
    button_entrar.textContent = 'ENTRAR'
    button_entrar.onclick = () => criarLogin()

    div_guardar_itens.append(h2_mensagem_bem_vindo, button_entrar)
    div_container_logar.append(div_guardar_logo, div_guardar_itens)


    const div_container_cadastrar = document.createElement('div')
    div_container_cadastrar.className = 'containerCadastrar'

    const div_guardar_cadastro = document.createElement('div')
    div_guardar_cadastro.className = 'guardarCadastro'

    const h2_mensagem_cadastrar_conta = document.createElement('h2')
    h2_mensagem_cadastrar_conta.textContent = 'CRIE UMA CONTA'

    const inputNome = document.createElement('input')
    inputNome.type = 'text'
    inputNome.placeholder = 'Nome'
    inputNome.id = 'coletar-nome'

    const inputEmail = document.createElement('input')
    inputEmail.type = 'email'
    inputEmail.placeholder = 'E-mail'
    inputEmail.id = 'coletar-email'

    const inputSenha = document.createElement('input')
    inputSenha.type = 'password'
    inputSenha.placeholder = 'Senha'
    inputSenha.id = 'coletar-senha'

    const button_criar_conta = document.createElement('button')
    button_criar_conta.id = 'criarCadastro'
    button_criar_conta.className = 'btn-login'
    button_criar_conta.textContent = 'CRIAR'
    button_criar_conta.onclick = () => criarCadastro()

    div_guardar_cadastro.append(h2_mensagem_cadastrar_conta, inputNome, inputEmail, inputSenha, button_criar_conta)
    div_container_cadastrar.append(div_guardar_cadastro)

    div_padronizar_tela.append(div_container_logar, div_container_cadastrar)

    
    main.replaceChildren(div_padronizar_tela)

    return main

}


const criarCadastro = async function(){
    try {
        const inputNome = document.getElementById('coletar-nome').value
        const inputEmail = document.getElementById('coletar-email').value
        const inputSenha = document.getElementById('coletar-senha').value

        const salvarAdm = {
            "nome" : inputNome,
            "email": inputEmail,
            "senha": inputSenha
        }

        if(await postADM(salvarAdm)){
            renderizarPagina('preview')
        }

    } catch (error) {
        console.log(error)
        alert('ERRO AO CADASTRAR ADM')
    }
}