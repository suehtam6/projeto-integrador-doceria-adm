'use strict'

import { renderizarPagina } from "../main.js"
import { getCategorias, getSabores, postDoce, getEstoques } from "../methods.js"
import { uploadParaCloudinary } from "../cloudinay.js"

function preview(input) {
    if (input.files && input.files[0]) {
        const url = URL.createObjectURL(input.files[0])
        document.getElementById('preview-image').src = url

        const pvImagem = document.getElementById('pv-imagem')
        if (pvImagem) pvImagem.src = url
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

function criarGrupoInput(rotulo, inputEl) {
    const group = document.createElement('div')
    group.className = 'input-group'

    const label = document.createElement('label')
    label.textContent = rotulo
    if (inputEl.id) label.htmlFor = inputEl.id

    group.append(label, inputEl)
    return group
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

function cadastrarDoce(listaCategoria, listaSabor, listaEstoque) {

    const style = document.getElementById('style')
    style.href = './css/doce.css'

    const main = document.getElementById('main')
    main.replaceChildren()

    const tituloPagina = document.createElement('h1')
    tituloPagina.textContent = 'Cadastro de produto'
    tituloPagina.className = 'tituloPagina'

    const container_cadastro = document.createElement('div')
    container_cadastro.className = 'container-cadastro'

    const layout = document.createElement('div')
    layout.className = 'cadastro-layout-wrapper'

    const divCadastroDoce = document.createElement('div')
    divCadastroDoce.className = 'cadastro-grid'
    
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

    const inputDescricao = document.createElement('textarea')
    inputDescricao.id = 'descricao-produto'
    inputDescricao.className = 'descricao'
    inputDescricao.placeholder = 'Conte o que torna esse doce especial...'

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

    listaCategoria.forEach(categoria => {
        const radio = document.createElement('input')
        radio.className = 'radio-categoria'
        radio.type = 'radio'
        radio.name = 'categoria-produto'
        radio.value = categoria.id
        radio.id = `categoria-${categoria.id}`
        radio.addEventListener('change', atualizarPreview)

        chipsCategoria.append(criarChip(radio, categoria.categoria))
    })
    grupoCategoria.append(labelCategoria, chipsCategoria)

    const grupoSabor = document.createElement('div')
    grupoSabor.className = 'input-group'
    const labelSabor = document.createElement('label')
    labelSabor.textContent = 'Sabores'
    const chipsSabor = document.createElement('div')
    chipsSabor.className = 'chip-group'

    listaSabor.forEach(sabor => {
        const checkbox = document.createElement('input')
        checkbox.className = 'checkbox-sabor'
        checkbox.type = 'checkbox'
        checkbox.value = sabor.id
        checkbox.id = `sabor-${sabor.id}`
        checkbox.addEventListener('change', atualizarPreview)

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

    const inputQuantidade = document.createElement('input')
    inputQuantidade.className = 'quantidade-produto'
    inputQuantidade.type = 'number'
    inputQuantidade.id = 'quantidade'
    inputQuantidade.placeholder = 'Ex: 20'

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
        radio_estoque.addEventListener('change', atualizarPreview)

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

    const estrelasAvaliacao = document.createElement('span')
    estrelasAvaliacao.id = 'estrelas-avaliacao'
    estrelasAvaliacao.className = 'estrelas-avaliacao'
    estrelasAvaliacao.textContent = '☆☆☆☆☆'

    linhaAvaliacao.append(inputAvaliacao, estrelasAvaliacao)
    containerAvaliacao.append(labelAvaliacao, linhaAvaliacao)

    inputAvaliacao.addEventListener('input', () => {
        atualizarEstrelas(inputAvaliacao, estrelasAvaliacao)
        atualizarPreview()
    })

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
    const spanDicaSeta = document.createElement('span')
    spanDicaSeta.className = 'dica-upload-icone'
    spanDicaSeta.textContent = '⬆'
    const spanDica = document.createElement('span')
    spanDica.textContent = 'Clique para enviar uma foto'
    spanDicaSeta.append(spanDica)
    dicaUpload.append(spanDicaSeta)
    

    const img = document.createElement('img')
    img.id = 'preview-image'
    img.className = 'preview-image'
    img.src = './img/upload.png'

    labelImage.append(dicaUpload)
    divContainer.append(img, labelImage, inputImage)

    cardImagem.append(tituloImagem, divContainer)

    divCadastroDoce.append(cardInfo, cardClassificacao, cardPreco, cardImagem)

    //Aqui vou criar o card aonde vai ficar atualizando de acordo com oque for sendo colocado de informações
    //pv-... eu coloquei para eu saber que estou falando sobre o preview, gostaria de comentar sobre isto caso alguém esteja vendo e fique em duvida
    const colunaLateral = document.createElement('div')
    colunaLateral.className = 'cadastro-sidebar'

    const cardPreview = document.createElement('div')
    cardPreview.className = 'cadastro-card preview-card'

    const tituloPreview = document.createElement('h2')
    tituloPreview.textContent = 'Pré-visualização'
    tituloPreview.className = 'cadastro-card-titulo'

    const subtituloPreview = document.createElement('p')
    subtituloPreview.className = 'preview-subtitulo'
    subtituloPreview.textContent = 'É assim que o produto vai aparecer na lista'

    const previewImagemWrapper = document.createElement('div')
    previewImagemWrapper.className = 'preview-card-imagem'
    const pvImagem = document.createElement('img')
    pvImagem.id = 'pv-imagem'
    pvImagem.src = './img/upload.png'
    previewImagemWrapper.append(pvImagem)

    const pvDescricao = document.createElement('h3')
    pvDescricao.id = 'pv-descricao'
    pvDescricao.className = 'preview-card-descricao'
    pvDescricao.textContent = 'Descrição'

    const pvCategoria = document.createElement('span')
    pvCategoria.id = 'pv-categoria'
    pvCategoria.className = 'preview-card-categoria'
    pvCategoria.textContent = 'Categoria'

    const pvNome = document.createElement('h3')
    pvNome.id = 'pv-nome'
    pvNome.className = 'preview-card-nome'
    pvNome.textContent = 'Nome do produto'

    const pvPreco = document.createElement('span')
    pvPreco.id = 'pv-preco'
    pvPreco.className = 'preview-card-preco'
    pvPreco.textContent = 'R$ 0,00'

    const pvSabores = document.createElement('div')
    pvSabores.id = 'pv-sabores'
    pvSabores.className = 'preview-card-sabores'

    const pvEstoque = document.createElement('span')
    pvEstoque.id = 'pv-estoque'
    pvEstoque.className = 'preview-card-estoque'
    pvEstoque.textContent = 'Sem status'

    cardPreview.append(
        tituloPreview,
        subtituloPreview,
        previewImagemWrapper,
        pvCategoria,
        pvNome,
        pvDescricao,
        pvPreco,
        pvSabores,
        pvEstoque
    )

    const caixaBTN = document.createElement('div')
    caixaBTN.className = 'caixa-btn'

    const botao_adicionar = document.createElement('button')
    botao_adicionar.textContent = 'CADASTRAR'
    botao_adicionar.id = 'salvar-categoria'
    botao_adicionar.className = 'padronizar-btn btn-primario'
    botao_adicionar.onclick = () => cadastroDoce()

    const botao_voltar = document.createElement('button')
    botao_voltar.textContent = 'CANCELAR'
    botao_voltar.id = 'cancelar-categoria'
    botao_voltar.className = 'padronizar-btn btn-secundario'
    botao_voltar.onclick = () => renderizarPagina('preview')

    caixaBTN.append(botao_voltar, botao_adicionar)

    colunaLateral.append(cardPreview)

    layout.append(divCadastroDoce, colunaLateral)
    container_cadastro.append(layout, caixaBTN)
    main.replaceChildren(tituloPagina, container_cadastro)

    // esse trecho é o que liga o formulário à função atualizarPreview
    // Eu andei dando uma pesquisada para entender como poderia fazer o card
    // ir atualizando automaticamente e isto foi a melhor maneira que eu encontrei
    // vou explicar agora o que eu  entendi sobre.
    // aqui eu crio uma variavel guardando um array com os inputs que vão ficar mudando
    // a cada vez que eu for digitando e salvando algo, assim o campo vai atualizando a 
    // cada clique que eu der no teclado
    const camposTexto = [inputNome, inputDescricao, inputPreco]

    camposTexto.forEach(el => {
        el.addEventListener('input', atualizarPreview)
    })
    
    atualizarPreview()

    return main
}

// Aqui vou mexer nas estrelas de acordo com a quantidade que for selecionada
function atualizarEstrelas(inputAvaliacao, spanEstrelas) {
    const nota = Number(inputAvaliacao.value) || 0
    const notaArredondada = Math.max(0, Math.min(5, Math.round(nota)))
    spanEstrelas.textContent = '★'.repeat(notaArredondada) + '☆'.repeat(5 - notaArredondada)
}

// AQUI NESTA PARTE EU VOU FAZER O MEU CARD MOSTRAR TODAS AS INFORMAÇÕES EM TEMPO REAL
// ASSIM EU POSSO VER COMO ELE VAI FICAR NA TELA DO CLIENTE
function atualizarPreview() {
    const pvNome = document.getElementById('pv-nome') //pv-... eu coloquei para eu saber que estou falando sobre o preview
    const pvPreco = document.getElementById('pv-preco')
    const pvCategoria = document.getElementById('pv-categoria')
    const pvSabores = document.getElementById('pv-sabores')
    const pvEstoque = document.getElementById('pv-estoque')
    const pvDescricao = document.getElementById('pv-descricao')

    
    if (!pvNome) return

    // Caso o nome ou a descrição estejam vazias, eu irei deixar mostrando apenas o que está
    // a direita da || como por exemplo o 'Nome do produto'
    const nome = document.getElementById('nome-produto')?.value.trim()
    pvNome.textContent = nome || 'Nome do produto'

    const descricao = document.getElementById('descricao-produto')?.value.trim()
    pvDescricao.textContent = descricao|| 'Descrição do produto'

    // Aqui eu vou trocar o ponto por virgula fazendo o preço bonitinho
    // Aqui basicamente vai ser a formatação do preço
    const preco = Number(document.getElementById('preco')?.value)
    pvPreco.textContent = preco > 0
        ? `R$ ${preco.toFixed(2).replace('.', ',')}`
        : 'R$ 0,00'

    // aqui estou verificando a categoria que foi clicada para colocar no card
    const categoriaMarcada = document.querySelector('.radio-categoria:checked')
    const labelCategoria = categoriaMarcada ? document.querySelector(`label[for="${categoriaMarcada.id}"]`) : null
    pvCategoria.textContent = labelCategoria ? labelCategoria.textContent : 'Categoria'

    // aqui estou verificando o sabor ou os sabores que forem clicados para adicionar no card
    const saboresMarcados = document.querySelectorAll('.checkbox-sabor:checked')
    pvSabores.replaceChildren()
    if (saboresMarcados.length === 0) {
        const vazio = document.createElement('span')
        vazio.className = 'preview-card-sabor-vazio'
        vazio.textContent = 'Nenhum sabor selecionado'
        pvSabores.append(vazio)
    } else {
        saboresMarcados.forEach(cb => {
            const label = document.querySelector(`label[for="${cb.id}"]`)
            const tag = document.createElement('span')
            tag.className = 'preview-card-sabor-tag'
            tag.textContent = label ? label.textContent : ''
            pvSabores.append(tag)
        })
    }
    
    // Aqui estou pegando mostrando se estã ou não com estoque
    const estoqueMarcado = document.querySelector('.radio-estoque:checked')
    const labelEstoque = estoqueMarcado ? document.querySelector(`label[for="${estoqueMarcado.id}"]`) : null
    if (labelEstoque) {
        pvEstoque.textContent = labelEstoque.textContent
        const semEstoque = labelEstoque.textContent.toLowerCase().includes('sem')
        pvEstoque.classList.toggle('preview-card-estoque--ok', !semEstoque)
        pvEstoque.classList.toggle('preview-card-estoque--vazio', semEstoque)
    } else {
        pvEstoque.textContent = 'Sem status'
        pvEstoque.classList.remove('preview-card-estoque--ok', 'preview-card-estoque--vazio')
    }
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
            alert('Doce salvo com sucesso!')
            renderizarPagina('preview')
        }

    } catch (error) {
        console.error(error)
        alert('Erro interno ao tentar cadastrar o produto.')
    }
}

const validar = function (novoDoce) {
    if (novoDoce.nome === undefined || novoDoce.nome.trim() === '') {
        alert('O nome do produto é obrigatório')
        return false
    }
    if (novoDoce.id_categoria === undefined) {
        alert('Selecione pelo menos uma categoria!')
        return false
    }
    if (novoDoce.sabor === undefined || novoDoce.sabor.length === 0) {
        alert('Selecione pelo menos um sabor!')
        return false
    }
    if (novoDoce.valor === undefined || isNaN(novoDoce.valor) || Number(novoDoce.valor) <= 0) {
        alert('Insira um preço válido e maior que zero!')
        return false
    }
    if (novoDoce.qtde === undefined || isNaN(novoDoce.qtde) || novoDoce.qtde < 0) {
        alert('Insira uma quantidade válida (maior ou igual a zero)!')
        return false
    }
    return true
}