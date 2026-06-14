'use strict'

import { renderizarPagina } from "../main.js"
import { postCategoria } from "../methods.js"


export function cadastrarCategoria (){
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

const cadastroCategoria = async function() {
    try {
        let categoria = document.getElementById('nome-produto')
    
        let salvarCategoria = {
            categoria: categoria.value
        }
    
        let validarDados = await validar(salvarCategoria)
        
        if(validarDados){
            await postCategoria(salvarCategoria)
            alert('Categoria salva com sucesso!!')
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
        alert('ERRO AO VALIAR A CATEGORIA')
        return false
    }
    return true

}

