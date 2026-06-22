'use strict'

import { renderizarPagina } from "../main.js"

import { cadastroADM } from "./tela_cadastro_adm.js"
import { postLoginADM } from "../methods.js"

export function criarLogin(){

    const style = document.getElementById('style')
    style.href = './css/logar.css'

    const main = document.getElementById('main')
    const header = document.getElementById('header')
    header.replaceChildren()
    main.replaceChildren()

    const imagemLogo = document.createElement('img')
    imagemLogo.src = './img/logo.png'
    imagemLogo.alt = 'logo da empresa'

    header.append(imagemLogo)

    const div_container_logar = document.createElement('div')
    div_container_logar.className = 'container-logar'

    const h2_bem_vindo = document.createElement('h2')
    h2_bem_vindo.textContent = 'Seja bem vindo(a)!!'

    const div_guardar_input = document.createElement('div')
    div_guardar_input.className = 'guardar-input'

    const inputEmail = document.createElement('input')
    inputEmail.type = 'email'
    inputEmail.placeholder = 'E-mail'
    inputEmail.id = 'coletar-email'

    const inputSenha = document.createElement('input')
    inputSenha.type = 'password'
    inputSenha.placeholder = 'Senha'
    inputSenha.id = 'coletar-senha'

    div_guardar_input.append(inputEmail, inputSenha)


    const button_entrar = document.createElement('button')
    button_entrar.id = 'entrar'
    button_entrar.textContent = 'ENTRAR'
    button_entrar.onclick = () => realizarLogin()

    const div_cadastrar_adm = document.createElement('div')
    div_cadastrar_adm.className = 'guardar-btn'

    const h2_cadastro_adm = document.createElement('h2')
    h2_cadastro_adm.textContent = 'Não tem conta ainda?'

    

    const button_cadastrar_adm = document.createElement('button')
    button_cadastrar_adm.onclick = () => cadastroADM()
    button_cadastrar_adm.textContent = 'cadastre-se'

    div_cadastrar_adm.append(h2_cadastro_adm, button_cadastrar_adm)



    div_container_logar.append(h2_bem_vindo, div_guardar_input, button_entrar, div_cadastrar_adm)

    const div_rosquinha = document.createElement('div')
    div_rosquinha.className ='rosquinha'

    const imagemRosquinha = document.createElement('img')
    imagemRosquinha.src = './img/rosquinha.png'
    imagemRosquinha.alt = 'rosquinha'

    div_rosquinha.append(imagemRosquinha)

    main.replaceChildren(div_container_logar, div_rosquinha)

    return main


}


// Aqui eu crio a função para validar se o email e a senha batem com as que estão no banco
const realizarLogin = async function () {
    try {
        const email = document.getElementById('coletar-email').value
        const senha = document.getElementById('coletar-senha').value

        
        if (!email || !senha) {
            alert('Preencha e-mail e senha')
            return
        }

        const credenciais = { email, senha }

        const resultado = await postLoginADM(credenciais)

        if (resultado.status) {
            // Guarda o token pra usar nas próximas requisições autenticadas
            localStorage.setItem('token', resultado.response.user.token)
            localStorage.setItem('usuarioId', resultado.response.user.id)

            renderizarPagina('preview')
        } else {
            alert(resultado.message || 'E-mail ou senha inválidos')
        }

    } catch (error) {
        console.log(error)
        alert('ERRO AO FAZER LOGIN')
    }
}
 