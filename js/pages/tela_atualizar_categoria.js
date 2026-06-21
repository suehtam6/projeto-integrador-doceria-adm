'use strict'

import { renderizarPagina } from "../main.js"
import { postCategoria, putCategoria } from "../methods.js"


export function atualizarCategoria (categoria){
    const style = document.getElementById('style')
    style.href = './css/categoria.css'

    let main = document.getElementById('main')

    let tituloPagina = document.createElement('h1')
    tituloPagina.textContent = 'Atualizar categoria'
    tituloPagina.className = 'tituloPagina'

    let container_cadastro = document.createElement('div')
    container_cadastro.className = 'container-cadastro' 

    let inputNome = document.createElement('input')
    inputNome.className = 'nome-produto'
    inputNome.id = 'categoria'
    inputNome.type = 'text'
    inputNome.placeholder = 'Escreva o nome da categoria'
    inputNome.value = categoria.categoria

    let botao_adicionar = document.createElement('button')
    botao_adicionar.textContent = 'ATUALIZAR'
    botao_adicionar.id = 'salvar-categoria'
    botao_adicionar.className = 'padronizar-btn'
    botao_adicionar.onclick = () => salvarAtualizacaoCategoria(categoria.id)


    let botao_voltar = document.createElement('button')
    botao_voltar.textContent = 'CANCELAR'
    botao_voltar.id = 'cancelar-categoria'
    botao_voltar.className = 'padronizar-btn'
    botao_voltar.onclick = () => renderizarPagina('preview')

    let caixaBTN = document.createElement('div')
    caixaBTN.className = 'caixa-btn'
    caixaBTN.append(botao_adicionar, botao_voltar)

    container_cadastro.append(tituloPagina, inputNome ,caixaBTN)
    main.replaceChildren(container_cadastro)

    return main
}

const salvarAtualizacaoCategoria = async function(id) {
    try {
        let categoria = document.getElementById('categoria')

        let salvarCategoria = {
            categoria: categoria.value
        }
    
        let validarDados = await validar(salvarCategoria)
        
        if(validarDados){
            await putCategoria(id, salvarCategoria)
            alert('Categoria salva com sucesso!!')
            renderizarPagina('preview')
        }else{
            alert('Erro ao salvar a categoria. Verifique os dados e tente novamente.')
        }

    } catch (error) {
        console.log(error)
        alert('Erro não foi possivel cadastrar a categoria!!')
    }
}

const validar = async function (categoria) {
    if(categoria.categoria == undefined || categoria.categoria == null || !isNaN(categoria)){
        alert('ERRO AO VALIDAR A CATEGORIA')
        return false
    }
    return true

}

