'use strict'

import { renderizarPagina } from "../main.js"
import { getCategorias, getSabores, getEstoques, putDoce } from "../methods.js"
import { uploadParaCloudinary } from "../cloudinay.js"

function preview(input) {
    if (input.files && input.files[0]) {
        document.getElementById('preview-image').src = URL.createObjectURL(input.files[0])
    }
}

export async function atualizarDoce(doce) {
    try {
        const listaCategoria = await getCategorias()
        const listaSabor = await getSabores()
        const listaEstoque = await getEstoques()

        if (!Array.isArray(listaCategoria) || !Array.isArray(listaSabor) || !Array.isArray(listaEstoque)) {
            alert("ERRO: Não foram encontrados dados para retornar!!")
            return
        }

        renderizarTelaAtualizar(doce, listaCategoria, listaSabor, listaEstoque)

    } catch (error) {
        alert("ERRO: AO CARREGAR AS CATEGORIAS E SABORES!!")
    }
}

const renderizarTelaAtualizar = async function(doce, listaCategoria, listaSabor, listaEstoque) {
    
    const main = document.getElementById('main')
    main.replaceChildren()

    const tituloPagina = document.createElement('h1')
    tituloPagina.textContent = 'Atualizar produto'
    tituloPagina.className = 'tituloPagina'

    const container_cadastro = document.createElement('div')
    container_cadastro.className = 'container-cadastro'


    const inputNome = document.createElement('input')
    inputNome.className = 'nome-produto'
    inputNome.id = 'nome-produto'
    inputNome.type = 'text'
    inputNome.placeholder = 'Escreva o nome do produto'
    inputNome.value = doce.nome 


    const inputDescricao = document.createElement('input')
    inputDescricao.type = 'text'
    inputDescricao.placeholder = 'Descreva o produto'
    inputDescricao.id = 'descricao-produto'
    inputDescricao.className = 'descricao'
    inputDescricao.value = doce.descricao || '' 

    
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

        if (doce.categoria[0].id == categoria.id) {
            radio.checked = true
        }

        const label = document.createElement('label')
        label.htmlFor = `categoria-${categoria.id}`
        label.textContent = categoria.categoria

        caixaItem.append(radio, label)
        divCategoriasLista.append(caixaItem)
    })
    containerCategoria.append(divCategoriasLista)

    
    const containerSabor = document.createElement('div')
    containerSabor.className = 'container-sabor'

    const tituloSabor = document.createElement('h2')
    tituloSabor.textContent = 'Sabores'

    const divSaboresLista = document.createElement('div')
    divSaboresLista.className = 'caixaSabor'

    const saboresAtuais = (doce.sabores || []).map(s => s.id)

    listaSabor.forEach(sabor => {
        const caixaItem = document.createElement('div')

        const checkbox = document.createElement('input')
        checkbox.className = 'checkbox-sabor'
        checkbox.type = 'checkbox'
        checkbox.value = sabor.id
        checkbox.id = `sabor-${sabor.id}`
        checkbox.querySelectorAll('.checkbox-sabor:checked')

        if (saboresAtuais.includes(sabor.id)) {
            checkbox.checked = true
        }

        const label = document.createElement('label')
        label.htmlFor = `sabor-${sabor.id}`
        label.textContent = sabor.sabor

        caixaItem.append(checkbox, label)
        divSaboresLista.append(caixaItem)
    })
    containerSabor.append(tituloSabor, divSaboresLista)

    const inputPreco = document.createElement('input')
    inputPreco.className = 'preco-produto'
    inputPreco.type = 'number'
    inputPreco.id = 'preco'
    inputPreco.placeholder = 'Escreva o preço do produto'
    inputPreco.value = doce.valor


    const inputQuantidade = document.createElement('input')
    inputQuantidade.className = 'quantidade-produto'
    inputQuantidade.type = 'number'
    inputQuantidade.id = 'quantidade'
    inputQuantidade.placeholder = 'Quantidade em estoque'

    const containerAvaliacao = document.createElement('div')
    containerAvaliacao.className = 'container-avaliacao'

    const labelAvaliacao = document.createElement('label')
    labelAvaliacao.textContent = 'Avaliação: '
    labelAvaliacao.htmlFor = 'avaliacao'

    const inputAvaliacao = document.createElement('input')
    inputAvaliacao.id = 'avaliacao'
    inputAvaliacao.type = 'number'
    inputAvaliacao.className = 'input-avaliacao'
    inputAvaliacao.placeholder = 'Ex: 4.5'

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
    img.src = doce.imagem || './img/upload.png'

    divContainer.append(inputImage, labelImage, img)

 
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

  
        if (doce.estoque?.[0]?.id == estoque.id) {
            radio_estoque.checked = true
        }

        const labelEstoque = document.createElement('label')
        labelEstoque.htmlFor = `estoque-${estoque.id}`
        labelEstoque.textContent = estoque.status

        linhaRadio.append(radio_estoque, labelEstoque)
        caixaEstoque.append(linhaRadio)
    })

    divEstoqueLista.append(tituloEstoque, caixaEstoque)


    const botao_atualizar = document.createElement('button')
    botao_atualizar.textContent = 'ATUALIZAR'
    botao_atualizar.id = 'salvar-categoria'
    botao_atualizar.className = 'padronizar-btn'
    botao_atualizar.onclick = () => salvarAtualizacaoDoce(doce.id)

    const botao_voltar = document.createElement('button')
    botao_voltar.textContent = 'CANCELAR'
    botao_voltar.id = 'cancelar-categoria'
    botao_voltar.className = 'padronizar-btn'
    botao_voltar.onclick = () => renderizarPagina('preview')

    const caixaBTN = document.createElement('div')
    caixaBTN.className = 'caixa-btn'
    caixaBTN.append(botao_atualizar, botao_voltar)

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
}

const salvarAtualizacaoDoce = async function (id) {
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

        const dadosValidos = await validar(novoDoce)

        if (dadosValidos) {
            await putDoce(id, novoDoce)
            alert('Doce atualizado com sucesso!')
            renderizarPagina('preview')
        }

    } catch (error) {
        console.error(error)
        alert('Erro interno ao tentar atualizar o produto.')
    }
}

const validar = async function (doce) {
    if (!doce.nome || doce.nome.trim() === '') {
        alert('O nome do produto é obrigatório')
        return false
    }
    if (!doce.categoria) {
        alert('Selecione pelo menos uma categoria!')
        return false
    }
    if (!doce.sabor || doce.sabor.length === 0) {
        alert('Selecione pelo menos um sabor!')
        return false
    }
    if (!doce.valor || isNaN(doce.valor) || Number(doce.valor) <= 0) {
        alert('Insira um preço válido e maior que zero!')
        return false
    }
    return true
}