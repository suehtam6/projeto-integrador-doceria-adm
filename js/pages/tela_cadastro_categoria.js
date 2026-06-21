'use strict'

import { renderizarPagina } from "../main.js"
import { postCategoria } from "../methods.js"

export function cadastrarCategoria() {
    const style = document.getElementById('style')
    style.href = './css/categoria.css'
    let main = document.getElementById('main')

    let tituloPagina = document.createElement('h1')
    tituloPagina.textContent = 'Cadastro da categoria'
    tituloPagina.className = 'tituloPagina'

    let container_cadastro = document.createElement('div')
    container_cadastro.className = 'container-cadastro'

    let inputNome = document.createElement('input')
    inputNome.className = 'nome-produto'
    inputNome.id = 'nome-produto'
    inputNome.type = 'text'
    inputNome.placeholder = 'Escreva o nome da categoria'

    let botao_adicionar = document.createElement('button')
    botao_adicionar.textContent = 'CADASTRAR'
    botao_adicionar.id = 'salvar-categoria'
    botao_adicionar.className = 'padronizar-btn'
    botao_adicionar.onclick = () => cadastroCategoria()

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

const cadastroCategoria = async function () {
    try {
        let categoria = document.getElementById('nome-produto')

        let salvarCategoria = {
            categoria: categoria.value
        }

        let validarDados = validar(salvarCategoria)

        if (validarDados) {
            await postCategoria(salvarCategoria)
            alert('Categoria salva com sucesso!!')
            renderizarPagina('preview') // ✅ volta para preview após cadastrar
        }

    } catch (error) {
        console.log(error)
        alert('Erro: não foi possível cadastrar a categoria!!')
    }
}

const validar = function (categoria) {
    if (!categoria.categoria || categoria.categoria.trim() === '') {
        alert('O nome da categoria é obrigatório!')
        return false
    }
    return true
}