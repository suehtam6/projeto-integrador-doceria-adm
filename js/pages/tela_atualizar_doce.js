'use strict'


import { renderizarPagina } from "../main.js"
import { getCategorias, getSabores, putDoce } from "../methods.js" // Supondo que você tenha o putDoce no seu methods
import { categorias, sabores } from "../doce_teste.js"

function preview(input) {
    if (input.files && input.files[0]) {
        document.getElementById('preview-image').src = URL.createObjectURL(input.files[0])
    }
}

// Nova função para renderizar a tela de edição preenchida
export async function atualizarDoce(doce) {
    let main = document.getElementById('main')
    main.replaceChildren()

    let tituloPagina = document.createElement('h1')
    tituloPagina.textContent = 'Atualizar produto' // Título alterado
    tituloPagina.className = 'tituloPagina'

    let container_cadastro = document.createElement('div')
    container_cadastro.className = 'container-cadastro'

    let inputNome = document.createElement('input')
    inputNome.className = 'nome-produto'
    inputNome.id = 'nome-produto'
    inputNome.type = 'text'
    inputNome.placeholder = 'Escreva o nome do produto'
    inputNome.value = doce.nome // Preenche o nome antigo

    let containerCategoria = document.createElement('div')
    containerCategoria.className = 'container-categoria'

    let tituloCategoria = document.createElement('h2')
    tituloCategoria.textContent = 'Categorias'
    containerCategoria.append(tituloCategoria)

    let divCategoriasLista = document.createElement('div')
    divCategoriasLista.className = 'caixaCategoria'

    categorias.forEach(categoria => {
        let caixaItem = document.createElement('div')
        caixaItem.className = 'item-radio'

        let radio = document.createElement('input')
        radio.className = 'radio-categoria'
        radio.type = 'radio'
        radio.name = 'categoria-produto'
        radio.value = categoria.id
        radio.id = `cat-${categoria.id}`
        
        // Verifica se é a categoria atual do doce e marca o radio
        if (doce.categoria == categoria.id) {
            radio.checked = true
        }

        let label = document.createElement('label')
        label.htmlFor = `cat-${categoria.id}`
        label.textContent = categoria.nome

        caixaItem.append(radio, label)
        divCategoriasLista.append(caixaItem)
    })
    containerCategoria.append(divCategoriasLista)

    let containerSabor = document.createElement('div')
    containerSabor.className = 'container-sabor'

    let tituloSabor = document.createElement('h2')
    tituloSabor.textContent = 'Sabores'

    let divSaboresLista = document.createElement('div')
    divSaboresLista.className = 'caixaSabor'

    sabores.forEach(sabor => {
        let caixaItem = document.createElement('div')
        caixaItem.className = 'item-checkbox'

        let checkbox = document.createElement('input')
        checkbox.className = 'checkbox-sabor'
        checkbox.type = 'checkbox'
        checkbox.value = sabor.id
        checkbox.id = `sab-${sabor.id}`

        let label = document.createElement('label')
        label.htmlFor = `sab-${sabor.id}`
        label.textContent = sabor.nome

        caixaItem.append(checkbox, label)
        divSaboresLista.append(caixaItem)
    })
    containerSabor.append(tituloSabor, divSaboresLista)

    let inputPreco = document.createElement('input')
    inputPreco.className = 'preco-produto'
    inputPreco.type = 'number'
    inputPreco.id = 'preco'
    inputPreco.placeholder = 'Escreva o preço do produto'
    inputPreco.value = doce.preco // Preenche o preço antigo

    const divContainer = document.createElement('div')
    divContainer.classList.add('preview-container')

    const inputImage = document.createElement('input')
    inputImage.id = 'preview-input'
    inputImage.className = 'preview-input'
    inputImage.type = 'file'
    inputImage.accept = 'image/*'
    inputImage.onchange = () => preview(inputImage)

    const labelImage = document.createElement('label')
    labelImage.className = 'preview-label'
    labelImage.htmlFor = 'preview-input'

    const img = document.createElement('img')
    img.id = 'preview-image'
    img.className = 'preview-image'
    // Se o doce já tiver uma imagem salva, mostra ela. Senão, mostra a logo padrão.
    img.src = doce.imagem || './img/upload.png' 

    divContainer.append(inputImage, labelImage, img)

    const div_btn_estoque = document.createElement('div')
    div_btn_estoque.className = 'div-estoque'
    

    const button_com_estoque = document.createElement('button')
    button_com_estoque.className = 'btn-com-estoque'
    button_com_estoque.textContent = 'Com Estoque'


    const button_sem_estoque = document.createElement('button')
    button_sem_estoque.className = 'btn-sem-estoque'
    button_sem_estoque.textContent = 'Sem Estoque'

    div_btn_estoque.append(button_com_estoque, button_sem_estoque)


    let botao_atualizar = document.createElement('button')
    botao_atualizar.textContent = 'ATUALIZAR' // Texto alterado
    botao_atualizar.id = 'salvar-categoria'
    botao_atualizar.className = 'padronizar-btn'
    // Passa o ID do doce atual para a função que vai salvar
    botao_atualizar.onclick = () => salvarAtualizacaoDoce(doce.id) 

    let botao_voltar = document.createElement('button')
    botao_voltar.textContent = 'CANCELAR'
    botao_voltar.id = 'cancelar-categoria'
    botao_voltar.className = 'padronizar-btn'
    botao_voltar.onclick = () => renderizarPagina('preview')

    let caixaBTN = document.createElement('div')
    caixaBTN.className = 'caixa-btn'
    caixaBTN.append(botao_atualizar, botao_voltar)

    container_cadastro.append(tituloPagina, inputNome, containerCategoria, containerSabor, inputPreco, divContainer, div_btn_estoque, caixaBTN)
    main.replaceChildren(container_cadastro)

    return main
}

// Função responsável por coletar os novos dados e disparar o PUT para a API
const salvarAtualizacaoDoce = async function (id) {
    try {
        let inputNome = document.getElementById('nome-produto')
        let inputPreco = document.getElementById('preco')
        let inputImagem = document.getElementById('preview-input')

        let categoriaMarcada = document.querySelector('.radio-categoria:checked')
        let categoriaSelecionada = categoriaMarcada ? categoriaMarcada.value : null

        let saboresMarcados = document.querySelectorAll('.checkbox-sabor:checked')
        let listaSaboresSelecionados = Array.from(saboresMarcados).map(cb => cb.value)

        let doceAtualizado = {
            nome: inputNome.value,
            categoria: categoriaSelecionada,
            sabores: listaSaboresSelecionados,
            preco: inputPreco.value,
            imagem: inputImagem.files[0] || null // Caso ele não troque de imagem, mantém vazio ou trata no backend
        }

        let dadosValidos = validar(doceAtualizado)

        if (dadosValidos) {
            // Aqui chama a função PUT passando o ID e o objeto atualizado
            await putDoce(id, doceAtualizado)
            alert('Doce atualizado com sucesso!')
            renderizarPagina('preview') // Redireciona após o sucesso
        } else {
            alert('Erro ao atualizar o doce. Verifique os dados e tente novamente.')
        }

    } catch (error) {
        console.error(error)
        alert('Erro interno ao tentar atualizar o produto.')
    }
}

// Função de validação corrigida (sem o bug do ponto e vírgula no final)
const validar = function (novoDoce) {
    if (!novoDoce.nome || novoDoce.nome.trim() === '') {
        alert('O nome do produto é obrigatório')
        return false
    }
    else if (!novoDoce.categoria) {
        alert('Selecione pelo menos uma categoria!')
        return false
    }
    else if (!novoDoce.sabores || novoDoce.sabores.length === 0) {
        alert('Selecione pelo menos um sabor!')
        return false
    }
    else if (!novoDoce.preco || isNaN(novoDoce.preco) || Number(novoDoce.preco) <= 0) {
        alert('Insira um preço válido e maior que zero!')
        return false
    }

    return true
}