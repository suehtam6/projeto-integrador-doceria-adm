'use strict'

const cadastrarDoce = function(){
    let main = document.getElementById('main')

    let container_cadastro = document.createElement('div')
    container_cadastro.className = 'container-cadastro' 

    let inputNome = document.createElement('input')
    inputNome.className = 'nome-produto'
    inputNome.type = 'text'
    inputNome.placeholder = 'Escreva o nome do produto'

    let checkboxCategoria = document.createElement('input')
    checkboxCategoria.className = 'checkbox'
    checkboxCategoria.type = 'checkbox'
    checkboxCategoria.value = 1

    let checkboxSabor = document.createElement('input')
    checkboxSabor.className = 'checkbox'
    checkboxSabor.type = 'checkbox'
    checkboxSabor.value = 1

    main.replaceChild(container_cadastro)
}

document.getElementById('adicionar-produto').addEventListener('click', cadastrarDoce())