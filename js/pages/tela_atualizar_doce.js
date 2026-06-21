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


function criarGrupoInput(rotulo, inputEl) {
    const grupo = document.createElement('div')
    grupo.className = 'input-group'

    const label = document.createElement('label')
    label.textContent = rotulo
    if (inputEl.id) label.htmlFor = inputEl.id

    grupo.append(label, inputEl)
    return grupo
}

function criarChip(inputEl, textoLabel) {
    const chip = document.createElement('div')
    chip.className = 'chip-item'

    const label = document.createElement('label')
    label.htmlFor = inputEl.id
    label.className = 'chip-label'
    label.textContent = textoLabel

    chip.append(inputEl, label)
    return chip
}

function atualizarEstrelas(inputAvaliacao, spanEstrelas) {
    const nota = Number(inputAvaliacao.value) || 0
    const notaArredondada = Math.max(0, Math.min(5, Math.round(nota)))
    spanEstrelas.textContent = '★'.repeat(notaArredondada) + '☆'.repeat(5 - notaArredondada)
}

const renderizarTelaAtualizar = function (doce, listaCategoria, listaSabor, listaEstoque) {

    const style = document.getElementById('style')
    style.href = './css/doce.css'


    const main = document.getElementById('main')
    main.replaceChildren()

    const tituloPagina = document.createElement('h1')
    tituloPagina.textContent = 'Atualizar produto'
    tituloPagina.className = 'tituloPagina'

    const container_cadastro = document.createElement('div')
    container_cadastro.className = 'container-cadastro'


    const colunaForm = document.createElement('div')
    colunaForm.className = 'cadastro-grid'

    const cardInfo = document.createElement('div')
    cardInfo.className = 'cadastro-card'

    const tituloInfo = document.createElement('h2')
    tituloInfo.textContent = 'Informações básicas'
    tituloInfo.className = 'cadastro-card-titulo'

    const inputNome = document.createElement('input')
    inputNome.className = 'nome-produto'
    inputNome.id = 'nome-produto'
    inputNome.type = 'text'
    inputNome.placeholder = 'Ex: Sortido de Brigadeiro'
    inputNome.value = doce.nome || ''

    const inputDescricao = document.createElement('textarea')
    inputDescricao.id = 'descricao-produto'
    inputDescricao.className = 'descricao'
    inputDescricao.placeholder = 'Conte o que torna esse doce especial...'
    inputDescricao.value = doce.descricao || ''

    cardInfo.append(
        tituloInfo,
        criarGrupoInput('Nome do produto', inputNome),
        criarGrupoInput('Descrição', inputDescricao)
    )

    const cardClassificacao = document.createElement('div')
    cardClassificacao.className = 'cadastro-card'

    const tituloClassificacao = document.createElement('h2')
    tituloClassificacao.textContent = 'Categoria e sabores'
    tituloClassificacao.className = 'cadastro-card-titulo'

    const grupoCategoria = document.createElement('div')
    grupoCategoria.className = 'input-group'
    const labelCategoria = document.createElement('label')
    labelCategoria.textContent = 'Categoria'
    const chipsCategoria = document.createElement('div')
    chipsCategoria.className = 'chip-group'

    const categoriaAtualId = doce.categoria?.[0]?.id

    listaCategoria.forEach(categoria => {
        const radio = document.createElement('input')
        radio.className = 'radio-categoria'
        radio.type = 'radio'
        radio.name = 'categoria-produto'
        radio.value = categoria.id
        radio.id = `categoria-${categoria.id}`

        if (categoriaAtualId == categoria.id) {
            radio.checked = true
        }

        chipsCategoria.append(criarChip(radio, categoria.categoria))
    })
    grupoCategoria.append(labelCategoria, chipsCategoria)

    const grupoSabor = document.createElement('div')
    grupoSabor.className = 'input-group'
    const labelSabor = document.createElement('label')
    labelSabor.textContent = 'Sabores'
    const chipsSabor = document.createElement('div')
    chipsSabor.className = 'chip-group'

    const saboresAtuais = (doce.sabor?.doce_sabor || []).map(s => s.sabor)

    listaSabor.forEach(sabor => {
        const checkbox = document.createElement('input')
        checkbox.className = 'checkbox-sabor'
        checkbox.type = 'checkbox'
        checkbox.value = sabor.id
        checkbox.id = `sabor-${sabor.id}`

        if (saboresAtuais.includes(sabor.sabor)) {
            checkbox.checked = true
        }

        chipsSabor.append(criarChip(checkbox, sabor.sabor))
    })
    grupoSabor.append(labelSabor, chipsSabor)

    cardClassificacao.append(tituloClassificacao, grupoCategoria, grupoSabor)


    const cardPreco = document.createElement('div')
    cardPreco.className = 'cadastro-card'

    const tituloPreco = document.createElement('h2')
    tituloPreco.textContent = 'Preço e estoque'
    tituloPreco.className = 'cadastro-card-titulo'

    const linhaPreco = document.createElement('div')
    linhaPreco.className = 'linha-dupla'

    const inputPreco = document.createElement('input')
    inputPreco.className = 'preco-produto'
    inputPreco.type = 'number'
    inputPreco.id = 'preco'
    inputPreco.placeholder = '0,00'
    inputPreco.step = '0.01'
    inputPreco.value = doce.valor 

    const inputQuantidade = document.createElement('input')
    inputQuantidade.className = 'quantidade-produto'
    inputQuantidade.type = 'number'
    inputQuantidade.id = 'quantidade'
    inputQuantidade.placeholder = 'Ex: 20'
    inputQuantidade.value = doce.qtde 

    linhaPreco.append(
        criarGrupoInput('Preço (R$)', inputPreco),
        criarGrupoInput('Quantidade em estoque', inputQuantidade)
    )

    const grupoEstoque = document.createElement('div')
    grupoEstoque.className = 'input-group'
    const labelEstoqueGrupo = document.createElement('label')
    labelEstoqueGrupo.textContent = 'Status do estoque'
    const chipsEstoque = document.createElement('div')
    chipsEstoque.className = 'chip-group'

    listaEstoque.forEach(function (estoque) {
        const radio_estoque = document.createElement('input')
        radio_estoque.className = 'radio-estoque'
        radio_estoque.type = 'radio'
        radio_estoque.name = 'estoque'
        radio_estoque.value = estoque.id
        radio_estoque.id = `estoque-${estoque.id}`

        if (doce.status?.[0]?.id == estoque.id) {
            radio_estoque.checked = true
        }

        chipsEstoque.append(criarChip(radio_estoque, estoque.status))
    })
    grupoEstoque.append(labelEstoqueGrupo, chipsEstoque)

    const containerAvaliacao = document.createElement('div')
    containerAvaliacao.className = 'input-group input-group-avaliacao'

    const labelAvaliacao = document.createElement('label')
    labelAvaliacao.textContent = 'Avaliação (0.0 a 5.0)'
    labelAvaliacao.htmlFor = 'avaliacao'

    const linhaAvaliacao = document.createElement('div')
    linhaAvaliacao.className = 'linha-avaliacao'

    const inputAvaliacao = document.createElement('input')
    inputAvaliacao.id = 'avaliacao'
    inputAvaliacao.type = 'number'
    inputAvaliacao.className = 'input-avaliacao'
    inputAvaliacao.placeholder = 'Ex: 4.5'
    inputAvaliacao.value = doce.avaliacao

    const estrelasAvaliacao = document.createElement('span')
    estrelasAvaliacao.id = 'estrelas-avaliacao'
    estrelasAvaliacao.className = 'estrelas-avaliacao'

    linhaAvaliacao.append(inputAvaliacao, estrelasAvaliacao)
    containerAvaliacao.append(labelAvaliacao, linhaAvaliacao)

    inputAvaliacao.addEventListener('input', () => atualizarEstrelas(inputAvaliacao, estrelasAvaliacao))
    atualizarEstrelas(inputAvaliacao, estrelasAvaliacao)

    cardPreco.append(tituloPreco, linhaPreco, grupoEstoque, containerAvaliacao)


    const cardImagem = document.createElement('div')
    cardImagem.className = 'cadastro-card'

    const tituloImagem = document.createElement('h2')
    tituloImagem.textContent = 'Imagem do produto'
    tituloImagem.className = 'cadastro-card-titulo'

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

    const dicaUpload = document.createElement('div')
    dicaUpload.className = 'dica-upload'
    dicaUpload.innerHTML = '<span class="dica-upload-icone">⬆</span><span>Clique para trocar a foto</span>'

    const img = document.createElement('img')
    img.id = 'preview-image'
    img.className = 'preview-image'
    img.src = doce.imagem

    labelImage.append(dicaUpload)
    divContainer.append(img, labelImage, inputImage)

    cardImagem.append(tituloImagem, divContainer)

    colunaForm.append(cardInfo, cardClassificacao, cardPreco, cardImagem)

    const caixaBTN = document.createElement('div')
    caixaBTN.className = 'caixa-btn'

    const botao_atualizar = document.createElement('button')
    botao_atualizar.textContent = 'ATUALIZAR'
    botao_atualizar.id = 'salvar-categoria'
    botao_atualizar.className = 'padronizar-btn btn-primario'
    botao_atualizar.onclick = () => salvarAtualizacaoDoce(doce)

    const botao_voltar = document.createElement('button')
    botao_voltar.textContent = 'CANCELAR'
    botao_voltar.id = 'cancelar-categoria'
    botao_voltar.className = 'padronizar-btn btn-secundario'
    botao_voltar.onclick = () => renderizarPagina('preview')

    caixaBTN.append(botao_voltar, botao_atualizar)

    container_cadastro.append(colunaForm, caixaBTN)
    main.replaceChildren(tituloPagina, container_cadastro)

    return main
}

const salvarAtualizacaoDoce = async function (doce) {
    try {
        const inputNome = document.getElementById('nome-produto')
        const inputPreco = document.getElementById('preco')
        const inputQuantidade = document.getElementById('quantidade')
        const inputAvaliacao = document.getElementById('avaliacao')
        const inputImagem = document.getElementById('preview-input')
        const inputDescricao = document.getElementById('descricao-produto')

        let urlFoto = doce.imagem
        if (inputImagem.files && inputImagem.files[0]) {
            urlFoto = await uploadParaCloudinary(inputImagem.files[0])
        }

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
            await putDoce(doce.id, novoDoce)
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
    if (!doce.id_categoria) {
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