'use strict'

import { renderizarPagina } from "../main.js"
import { criarPreview } from "./preview.js"
    import { cadastroADM } from "./tela_cadastro_adm.js"


export function criarLogin(){
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
    button_entrar.onclick = () => renderizarPagina('preview')

    const div_cadastrar_adm = document.createElement('div')
    div_cadastrar_adm.className = 'guardar-btn'

    const h2_cadastro_adm = document.createElement('h2')
    h2_cadastro_adm.textContent = 'Não tem conta ainda?'

    

    const button_cadastrar_adm = document.createElement('button')
    button_cadastrar_adm.onclick = () => renderizarPagina('cadastroADM')
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


const validarCadastro = function(){
    
}