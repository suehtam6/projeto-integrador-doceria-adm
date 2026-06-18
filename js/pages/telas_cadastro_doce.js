'use strict'

import { renderizarPagina } from "../main.js"
import { getCategorias, getSabores, postDoce, getEstoques } from "../methods.js"
import { uploadParaCloudinary } from "../cloudinay.js"

function preview(input) {
    if (input.files && input.files[0]) {
        document.getElementById('preview-image').src = URL.createObjectURL(input.files[0])
    }
}

const carregarItens = async function () {
    try {
        const listaCategoria = await getCategorias()
        const listaSabor = await getSabores()
        const listaEstoque = await getEstoques()

        if (Array.isArray(listaCategoria) && Array.isArray(listaSabor) && Array.isArray(listaEstoque)) {
            cadastrarDoce(listaCategoria, listaSabor, listaEstoque)
        } else {
            alert("ERRO: Não foram encontrados dados para retornar!!")
        }
    } catch (error) {
        alert("ERRO: AO CARREGAR AS CATEGORIAS E SABORES!!")
    }
}

export function iniciarCadastroDoce() {
    carregarItens()
}

function cadastrarDoce(listaCategoria, listaSabor, listaEstoque) {
    const main = document.getElementById('main')
    main.replaceChildren()

    const tituloPagina = document.createElement('h1')
    tituloPagina.textContent = 'Cadastro de produto'
    tituloPagina.className = 'tituloPagina'

    const container_cadastro = document.createElement('div')
    container_cadastro.className = 'container-cadastro'

    const inputNome = document.createElement('input')
    inputNome.className = 'nome-produto'
    inputNome.id = 'nome-produto'
    inputNome.type = 'text'
    inputNome.placeholder = 'Escreva o nome do produto'

    const inputDescricao = document.createElement('input')
    inputDescricao.type = 'text'
    inputDescricao.placeholder = 'Descreva o produto'
    inputDescricao.id = 'descricao-produto'
    inputDescricao.className = 'descricao'

    // Categorias
    const containerCategoria = document.createElement('div')
    containerCategoria.className = 'container-categoria'

    const tituloCategoria = document.createElement('h2')
    tituloCategoria.textContent = 'Categorias'
    containerCategoria.append(tituloCategoria)

    const divCategoriasLista = document.createElement('div')
    divCategoriasLista.className = 'caixaCategoria'

    listaCategoria.forEach(categoria => {
        const caixaItem = document.createElement('div')

        const radio = document.createElement('input')
        radio.className = 'radio-categoria'
        radio.type = 'radio'
        radio.name = 'categoria-produto'
        radio.value = categoria.id
        radio.id = `categoria-${categoria.id}`

        const label = document.createElement('label')
        label.htmlFor = `categoria-${categoria.id}`
        label.textContent = categoria.categoria

        caixaItem.append(radio, label)
        divCategoriasLista.append(caixaItem)
    })
    containerCategoria.append(divCategoriasLista)

    // Sabores
    const containerSabor = document.createElement('div')
    containerSabor.className = 'container-sabor'

    const tituloSabor = document.createElement('h2')
    tituloSabor.textContent = 'Sabores'

    const divSaboresLista = document.createElement('div')
    divSaboresLista.className = 'caixaSabor'

    listaSabor.forEach(sabor => {
        const caixaItem = document.createElement('div')

        const checkbox = document.createElement('input')
        checkbox.className = 'checkbox-sabor'
        checkbox.type = 'checkbox'
        checkbox.value = sabor.id
        checkbox.id = `sabor-${sabor.id}`

        const label = document.createElement('label')
        label.htmlFor = `sabor-${sabor.id}`
        label.textContent = sabor.sabor

        caixaItem.append(checkbox, label)
        divSaboresLista.append(caixaItem)
    })
    containerSabor.append(tituloSabor, divSaboresLista)

    // Preço
    const inputPreco = document.createElement('input')
    inputPreco.className = 'preco-produto'
    inputPreco.type = 'number'
    inputPreco.id = 'preco'
    inputPreco.placeholder = 'Escreva o preço do produto'

   
    const inputQuantidade = document.createElement('input')
    inputQuantidade.className = 'quantidade-produto'
    inputQuantidade.type = 'number'
    inputQuantidade.id = 'quantidade'
    inputQuantidade.placeholder = 'Quantidade em estoque'
    inputQuantidade.min = '0'

    const containerAvaliacao = document.createElement('div')
    containerAvaliacao.className = 'container-avaliacao'

    const labelAvaliacao = document.createElement('label')
    labelAvaliacao.textContent = 'Avaliação (0.0 a 5.0): '
    labelAvaliacao.htmlFor = 'avaliacao'

    const inputAvaliacao = document.createElement('input')
    inputAvaliacao.id = 'avaliacao'
    inputAvaliacao.type = 'number'
    inputAvaliacao.className = 'input-avaliacao'
    inputAvaliacao.placeholder = 'Ex: 4.5'
    inputAvaliacao.min = '0'
    inputAvaliacao.max = '5'

    containerAvaliacao.append(labelAvaliacao, inputAvaliacao)

  
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
    img.src = './img/upload.png'

    divContainer.append(inputImage, labelImage, img)

    // Estoque
    const divEstoqueLista = document.createElement('div')
    divEstoqueLista.className = 'estoque'

    const tituloEstoque = document.createElement('h2')
    tituloEstoque.textContent = 'Estoque'

    const caixaEstoque = document.createElement('div')
    caixaEstoque.className = 'estoque-radio'

    listaEstoque.forEach(function (estoque) {
        const linhaRadio = document.createElement('div')

        const radio_estoque = document.createElement('input')
        radio_estoque.className = 'radio-estoque'
        radio_estoque.type = 'radio'
        radio_estoque.name = 'estoque'
        radio_estoque.value = estoque.id
        radio_estoque.id = `estoque-${estoque.id}`

        const labelEstoque = document.createElement('label')
        labelEstoque.htmlFor = `estoque-${estoque.id}`
        labelEstoque.textContent = estoque.status

        linhaRadio.append(radio_estoque, labelEstoque)
        caixaEstoque.append(linhaRadio)
    })

    divEstoqueLista.append(tituloEstoque, caixaEstoque)

  
    const botao_adicionar = document.createElement('button')
    botao_adicionar.textContent = 'CADASTRAR'
    botao_adicionar.id = 'salvar-categoria'
    botao_adicionar.className = 'padronizar-btn'
    botao_adicionar.onclick = () => cadastroDoce()

    const botao_voltar = document.createElement('button')
    botao_voltar.textContent = 'CANCELAR'
    botao_voltar.id = 'cancelar-categoria'
    botao_voltar.className = 'padronizar-btn'
    botao_voltar.onclick = () => renderizarPagina('preview')

    const caixaBTN = document.createElement('div')
    caixaBTN.className = 'caixa-btn'
    caixaBTN.append(botao_adicionar, botao_voltar)


    container_cadastro.append(
        tituloPagina,
        inputNome,
        inputDescricao,
        containerCategoria,
        containerSabor,
        inputPreco,
        inputQuantidade,     
        containerAvaliacao,  
        divContainer,
        divEstoqueLista,
        caixaBTN
    )
    main.replaceChildren(container_cadastro)
    return main
}

const cadastroDoce = async function () {
    try {
        const inputNome = document.getElementById('nome-produto')
        const inputPreco = document.getElementById('preco')
        const inputQuantidade = document.getElementById('quantidade') 
        const inputAvaliacao = document.getElementById('avaliacao')
        const inputImagem = document.getElementById('preview-input')
        const inputDescricao = document.getElementById('descricao-produto')

        const urlFoto = await uploadParaCloudinary(inputImagem.files[0])

        const categoriaMarcada = document.querySelector('.radio-categoria:checked')
        const categoriaSelecionada = categoriaMarcada ? categoriaMarcada.value : null

        const estoqueMarcado = document.querySelector('.radio-estoque:checked')
        const estoqueSelecionado = estoqueMarcado ? estoqueMarcado.value : null

        const saboresMarcados = document.querySelectorAll('.checkbox-sabor:checked')
        const listaSaboresSelecionados = Array.from(saboresMarcados).map(cb => cb.value)

        const novoDoce = {
            nome: inputNome.value,
            valor: Number(inputPreco.value), 
            imagem: urlFoto,
            qtde: Number(inputQuantidade.value),         
            descricao: inputDescricao.value,
            avaliacao: Number(inputAvaliacao.value),
            id_categoria: Number(categoriaSelecionada),
            id_status: Number(estoqueSelecionado),
            sabor: listaSaboresSelecionados.map(id => ({ id: Number(id) }))
        }

        const dadosValidos = validar(novoDoce)

        if (dadosValidos) {
            await postDoce(novoDoce)
            alert('Doce saved com sucesso!')
            renderizarPagina('preview')
        }

    } catch (error) {
        console.error(error)
        alert('Erro interno ao tentar cadastrar o produto.')
    }
}

const validar = function (novoDoce) {
    if (!novoDoce.nome || novoDoce.nome.trim() === '') {
        alert('O nome do produto é obrigatório')
        return false
    }
    if (!novoDoce.id_categoria) {
        alert('Selecione pelo menos uma categoria!')
        return false
    }
    if (!novoDoce.sabor || novoDoce.sabor.length === 0) {
        alert('Selecione pelo menos um sabor!')
        return false
    }
    if (!novoDoce.valor || isNaN(novoDoce.valor) || Number(novoDoce.valor) <= 0) {
        alert('Insira um preço válido e maior que zero!')
        return false
    }
    // ✨ NOVO: Validação de quantidade (não pode ser vazia ou menor que zero)
    if (novoDoce.qtde === undefined || isNaN(novoDoce.qtde) || novoDoce.qtde < 0) {
        alert('Insira uma quantidade válida (maior ou igual a zero)!')
        return false
    }
    return true
}