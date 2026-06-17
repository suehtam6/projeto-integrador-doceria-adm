'use strict'

import { renderizarPagina } from "../main.js"
import { postSabor } from "../methods.js"

export function cadastrarSabor() {
    let main = document.getElementById('main')

    let tituloPagina = document.createElement('h1')
    tituloPagina.textContent = 'Cadastro do Sabor'
    tituloPagina.className = 'tituloPagina'

    let container_cadastro = document.createElement('div')
    container_cadastro.className = 'container-cadastro'

    let inputNome = document.createElement('input')
    inputNome.className = 'nome-produto'
    inputNome.id = 'nome-produto'
    inputNome.type = 'text'
    inputNome.placeholder = 'Escreva o nome do sabor'

    let botao_adicionar = document.createElement('button')
    botao_adicionar.textContent = 'CADASTRAR'
    botao_adicionar.id = 'salvar-sabor'
    botao_adicionar.className = 'padronizar-btn'
    botao_adicionar.onclick = () => cadastroSabor()

    let botao_voltar = document.createElement('button')
    botao_voltar.textContent = 'CANCELAR'
    botao_voltar.id = 'cancelar-sabor'
    botao_voltar.className = 'padronizar-btn'
    botao_voltar.onclick = () => renderizarPagina('preview')

    let caixaBTN = document.createElement('div')
    caixaBTN.className = 'caixa-btn'
    caixaBTN.append(botao_adicionar, botao_voltar)

    container_cadastro.append(tituloPagina, inputNome, caixaBTN)
    main.replaceChildren(container_cadastro)
    return main
}

const cadastroSabor = async function () {
    try {
        let sabor = document.getElementById('nome-produto')

        let salvarSabor = {
            sabor: sabor.value
        }

        let validarDados = validar(salvarSabor)

        if (validarDados) {
            await postSabor(salvarSabor)
            alert('Sabor salvo com sucesso!!')
            renderizarPagina('preview') // ✅ volta para preview após cadastrar
        }

    } catch (error) {
        console.log(error)
        alert('Erro: não foi possível cadastrar o sabor!!')
    }
}

const validar = function (sabor) {
    if (!sabor.sabor || sabor.sabor.trim() === '') {
        alert('O nome do sabor é obrigatório!')
        return false
    }
    return true
}