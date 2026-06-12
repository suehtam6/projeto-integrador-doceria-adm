'use strict'

import { renderizarPagina } from "../main.js"

// Aqui vou linkar a foto quando receber ela e utilizar no cloudinay
function preview (input){
    document.getElementById('preview-image')
    .src = URL.createObjectURL(input.files[0])
}


export function cadastrarDoce (){
    let main = document.getElementById('main')

    let tituloPagina = document.createElement('h1')
    tituloPagina.textContent = 'Cadastro de produto'
    tituloPagina.className = 'tituloPagina'

    let container_cadastro = document.createElement('div')
    container_cadastro.className = 'container-cadastro' 

    let inputNome = document.createElement('input')
    inputNome.className = 'nome-produto'
    inputNome.id = 'nome-produto'
    inputNome.type = 'text'
    inputNome.placeholder = 'Escreva o nome do produto'

    let checkboxCategoria = document.createElement('input')
    checkboxCategoria.className = 'checkbox'
    checkboxCategoria.type = 'checkbox'

    let labelCategoria = document.createElement('label')
    labelCategoria.textContent = 'Bolo'

    
    let containerCategoria = document.createElement('div')
    containerCategoria.className = 'container-categoria'
    
    let tituloCategoria = document.createElement('h2')
    tituloCategoria.textContent = 'Categorias'
    
    let divCategoria = document.createElement('div')
    divCategoria.className = 'caixaCategoria'

    divCategoria.append(checkboxCategoria, labelCategoria)
    containerCategoria.append(tituloCategoria, divCategoria)

    
    let checkboxSabor = document.createElement('input')
    checkboxSabor.className = 'checkbox'
    checkboxSabor.type = 'checkbox'
    
    let labelSabor = document.createElement('label')
    labelSabor.textContent = 'Chocolate'
    
    let containerSabor = document.createElement('div')
    containerSabor.className = 'container-sabor'
    
    let tituloSabor = document.createElement('h2')
    tituloSabor.textContent = 'Sabores'
    tituloSabor.className = 'container-sabor'
    
    let divSabor = document.createElement('div')
    divSabor.className = 'caixaSabor'
    divSabor.append(checkboxSabor, labelSabor)

    containerSabor.append(tituloSabor, divSabor)

    let inputPreco = document.createElement('input')
    inputPreco.className = 'preco-produto'
    inputPreco.type = 'number'
    inputPreco.id = 'preco'
    inputPreco.placeholder = 'Escreva o preço do produto'

    // Criando o conteudo da imagem para cadastrar 
    const divContainer = document.createElement('div')
    divContainer.classList.add('preview-container')
   
    const input = document.createElement('input')
    input.id = 'preview-input'
    input.className = 'preview-input'
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = () => preview(input)
   
    const label = document.createElement('label')
    label.className = 'preview-label'
    label.htmlFor = 'preview-input'
   
       
    const img = document.createElement('img')
    img.id = 'preview-image'
    img.className = 'preview-image'
    img.src = './img/upload-icon.svg'
   
    divContainer.append(input, label, img)


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

    container_cadastro.append(tituloPagina,inputNome, containerCategoria, containerSabor, inputPreco, divContainer, caixaBTN)
    main.replaceChildren(container_cadastro)

    return main
}
