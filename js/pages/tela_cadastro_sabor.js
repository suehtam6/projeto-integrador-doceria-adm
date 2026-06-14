'use strict'

import { renderizarPagina } from "../main.js"
import { postSabor } from "../methods.js"



export function cadastrarSabor() {
    let main = document.getElementById('main')

    let tituloPagina = document.createElement('h1')
    tituloPagina.textContent = 'Cadastro do sabor'
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
    botao_adicionar.id = 'salvar-categoria'
    botao_adicionar.className = 'padronizar-btn'
    botao_adicionar.onclick = () => cadastrarSabor()

    let botao_voltar = document.createElement('button')
    botao_voltar.textContent = 'CANCELAR'
    botao_voltar.id = 'cancelar-categoria'
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
        let sabores = document.getElementById('nome-produto')

        let salvarSabor = {
            sabor: sabores.value
        }

        let validarDados = validar(salvarSabor)

        if (validarDados) {
            await postSabor(salvarSabor)
            alert('sabor salvo com sucesso!')
        } else {
            alert('Erro ao salvar o sabor. Verifique os dados e tente novamente.')
        }


    } catch (error) {
        console.error(error)
        alert('Erro interno ao tentar cadastrar o sabor.')
    }



}

const validar = async function (sabor) {
    if (sabor.sabor == undefined || sabor.sabor == null || !isNaN(sabor)) {
        alert('Erro ao validar o sabor')
        return false
    }
    return true
}