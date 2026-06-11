'use strict'

const cadastrarDoce = function(){
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

    let inputImg = document.createElement('input')
    inputImg.type = 'file'


    let img = document.createElement('img')
    img.src = './img/lupa.png'
    img.className = 'imagem-produto'

    let botao_adicionar = document.createElement('button')
    botao_adicionar.textContent = 'SALVAR'
    botao_adicionar.id = 'salvar-produto'
    
    let botao_voltar = document.createElement('button')
    botao_voltar.textContent = 'CANCELAR'
    botao_voltar.id = 'cancelar-produto'

    container_cadastro.append(tituloPagina,inputNome, containerCategoria, containerSabor, inputPreco, inputImg, botao_adicionar, botao_voltar)
    main.replaceChildren(container_cadastro)
}

const cadastrarCategoria = function(){
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
    botao_adicionar.textContent = 'SALVAR'
    botao_adicionar.id = 'salvar-produto'
    
    let botao_voltar = document.createElement('button')
    botao_voltar.textContent = 'CANCELAR'
    botao_voltar.id = 'cancelar-produto'

    container_cadastro.append(tituloPagina, inputNome ,botao_adicionar, botao_voltar)
    main.replaceChildren(container_cadastro)
}

const cadastrarSabor = function(){
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
    botao_adicionar.textContent = 'SALVAR'
    botao_adicionar.id = 'salvar-produto'
    
    let botao_voltar = document.createElement('button')
    botao_voltar.textContent = 'CANCELAR'
    botao_voltar.id = 'cancelar-produto'

    container_cadastro.append(tituloPagina, inputNome ,botao_adicionar, botao_voltar)
    main.replaceChildren(container_cadastro)
}



document.getElementById('adicionar-sabor').addEventListener('click', cadastrarSabor)

document.getElementById('adicionar-produto').addEventListener('click', cadastrarDoce)

document.getElementById('adicionar-categoria').addEventListener('click', cadastrarCategoria)