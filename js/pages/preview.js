'use strict'

import { renderizarPagina } from "../main.js"
import { deleteDoce, getCategorias, getSabores, getDoces, deleteCategoria, deleteSabor } from "../methods.js"
import { atualizarDoce } from './tela_atualizar_doce.js'
import { atualizarCategoria } from "./tela_atualizar_categoria.js";
import { atualizarSabor } from "./tela_atualizar_sabor.js";

const carregarItens = async function () {
    try {
        const listaDoce = await getDoces()
        const listaSabor = await getSabores()
        const listaCategoria = await getCategorias()

        criarPreview(listaCategoria, listaSabor, listaDoce)

    } catch (error) {
        alert("ERRO: AO CARREGAR AS CATEGORIAS E SABORES!!")
    }
}

export function iniciarPreview() {
    carregarItens()
}

const renderizarLinhasTabela = function (listaDoces, tbody) {
    tbody.replaceChildren();

    listaDoces.forEach(itemDoce => {
        const trItens = document.createElement('tr')
        trItens.className = 'itens'

        const tdImagem = document.createElement('td')
        tdImagem.className = 'imagem-doce'
        const ImagemTd = document.createElement('img')
        ImagemTd.className = 'imagem-tabela'
        ImagemTd.src = itemDoce.imagem
        ImagemTd.alt = itemDoce.nome
        tdImagem.append(ImagemTd)

        const tdProduto = document.createElement('td')
        tdProduto.className = 'nome-doce'
        tdProduto.textContent = itemDoce.nome

        const tdCategoria = document.createElement('td')
        tdCategoria.className = 'categoria-td'
        tdCategoria.textContent = itemDoce.categoria?.[0]?.categoria ?? 'Sem categoria'

        const tdSabores = document.createElement('td')
        tdSabores.className = 'sabores-td'

        const listaSaboresDoce = itemDoce.sabor?.doce_sabor ?? []

        if (listaSaboresDoce.length === 0) {
            const semSabor = document.createElement('span')
            semSabor.className = 'sem-sabor'
            semSabor.textContent = 'Sem sabor'
            tdSabores.append(semSabor)
        } else {
            listaSaboresDoce.forEach(itemSabor => {
                const tagSabor = document.createElement('span')
                tagSabor.className = 'tag-sabor'
                tagSabor.textContent = itemSabor.sabor
                tdSabores.append(tagSabor)
            })
        }

        const tdPreco = document.createElement('td')
        tdPreco.className = 'preco'
        tdPreco.textContent = `R$ ${itemDoce.valor}`

        const tdBTN = document.createElement('td')
        tdBTN.className = 'acoes-tabela'

        const div_acao_tabela_atualizar = document.createElement('div')
        div_acao_tabela_atualizar.className = 'btn-acao'
        const button_atualizar = document.createElement('button')
        button_atualizar.id = `editar-doce-${itemDoce.id}`
        button_atualizar.onclick = () => atualizarDoce(itemDoce)
        const imagem_botao_atualizar = document.createElement('img')
        imagem_botao_atualizar.src = './img/lapis.png'
        imagem_botao_atualizar.alt = 'editar'
        button_atualizar.append(imagem_botao_atualizar)
        div_acao_tabela_atualizar.append(button_atualizar)

        const div_acao_tabela_deletar = document.createElement('div')
        div_acao_tabela_deletar.className = 'btn-acao'
        const button_deletar = document.createElement('button')
        button_deletar.id = `deletar-doce-${itemDoce.id}`
        button_deletar.onclick = async () => {
            if (confirm(`Tem certeza que deseja deletar o doce "${itemDoce.nome}"?`)) {
                await deleteDoce(itemDoce.id)
                await carregarItens()
            }
        }
        const imagem_botao_deletar = document.createElement('img')
        imagem_botao_deletar.src = './img/lixo.png'
        imagem_botao_deletar.alt = 'deletar'
        button_deletar.append(imagem_botao_deletar)
        div_acao_tabela_deletar.append(button_deletar)

        tdBTN.append(div_acao_tabela_atualizar, div_acao_tabela_deletar)
        trItens.append(tdImagem, tdProduto, tdCategoria, tdSabores, tdPreco, tdBTN)
        tbody.append(trItens)
    })
}

function criarPreview(listaCategoria, listaSabor, listaDoce) {

    const style = document.getElementById('style')
    style.href = './css/preview.css'

    const header = document.getElementById('header')
    const main = document.getElementById('main')
    main.replaceChildren()
    header.replaceChildren()

    const imagemLogo = document.createElement('img')
    imagemLogo.src = './img/logo.png'
    header.append(imagemLogo)

    const container_cards = document.createElement('div')
    container_cards.className = 'container-principal'

    const card_informacao_doce = document.createElement('div')
    card_informacao_doce.className = 'card-informacao-doce'
    const h3_doce_cadastrado = document.createElement('h3')
    h3_doce_cadastrado.textContent = 'Produtos cadastrados'
    const span_doce_cadastrado = document.createElement('span')
    span_doce_cadastrado.className = 'qtde-cadastrada'
    span_doce_cadastrado.id = 'qtde-cadastrada'
    span_doce_cadastrado.textContent = `🍭${listaDoce.length}`
    card_informacao_doce.append(h3_doce_cadastrado, span_doce_cadastrado)

    const card_informacao_categoria = document.createElement('div')
    card_informacao_categoria.className = 'card-informacao-doce'
    const h3_categoria_cadastrado = document.createElement('h3')
    h3_categoria_cadastrado.textContent = 'Categorias cadastradas'
    const span_categoria_cadastrado = document.createElement('span')
    span_categoria_cadastrado.className = 'qtde-categoria'
    span_categoria_cadastrado.id = 'qtde-categoria'
    span_categoria_cadastrado.textContent = `🧁${listaCategoria.length}`
    card_informacao_categoria.append(h3_categoria_cadastrado, span_categoria_cadastrado)

    const card_informacao_sabor = document.createElement('div')
    card_informacao_sabor.className = 'card-informacao-sabor'
    const h3_sabor_cadastrado = document.createElement('h3')
    h3_sabor_cadastrado.textContent = 'Sabor cadastrados'
    const span_sabor_cadastrado = document.createElement('span')
    span_sabor_cadastrado.className = 'qtde-sabor'
    span_sabor_cadastrado.id = 'qtde-sabor'
    span_sabor_cadastrado.textContent = `🍫${listaSabor.length}`
    card_informacao_sabor.append(h3_sabor_cadastrado, span_sabor_cadastrado)

    container_cards.append(card_informacao_doce, card_informacao_categoria, card_informacao_sabor)

    const divPesquisa = document.createElement('div')
    divPesquisa.className = 'pesquisa'

    const inputPesquisa = document.createElement('input')
    inputPesquisa.className = 'doce-pesquisado'
    inputPesquisa.id = 'doce-pesquisado'
    inputPesquisa.type = 'search'
    inputPesquisa.placeholder = 'Pesquisar produto'
    divPesquisa.append(inputPesquisa)

    const div_layout = document.createElement('div')
    div_layout.className = 'conteudo-layout'

    const div_guardar_tabela = document.createElement('div')
    div_guardar_tabela.className = 'tabela-produtos'

    const div_topo_tabela = document.createElement('div')
    div_topo_tabela.className = 'topo-tabela'

    const h3_titulo_tabela = document.createElement('h3')
    h3_titulo_tabela.textContent = 'Produtos cadastrados'

    const button_adicionar_produto = document.createElement('button')
    button_adicionar_produto.className = 'adicionar-produto'
    button_adicionar_produto.id = 'adicionar-produto'
    button_adicionar_produto.textContent = '+ Adicionar Produto'
    button_adicionar_produto.onclick = () => renderizarPagina('doce')
    div_topo_tabela.append(h3_titulo_tabela, button_adicionar_produto)

    const div_tabela_itens = document.createElement('div')
    div_tabela_itens.className = 'tabela-itens'

    const table = document.createElement('table')
    table.className = 'descricao-tabela'

    const thead = document.createElement('thead')
    const tr = document.createElement('tr')

    const thImagem = document.createElement('th')
    thImagem.scope = 'col'
    thImagem.textContent = 'Imagem'

    const thProduto = document.createElement('th')
    thProduto.scope = 'col'
    thProduto.textContent = 'Produto'

    const thCategoria = document.createElement('th')
    thCategoria.scope = 'col'
    thCategoria.textContent = 'Categoria'

    const thSabores = document.createElement('th')
    thSabores.scope = 'col'
    thSabores.textContent = 'Sabores'

    const thPreco = document.createElement('th')
    thPreco.scope = 'col'
    thPreco.textContent = 'Preço'

    const thAcoes = document.createElement('th')
    thAcoes.scope = 'col'
    thAcoes.textContent = 'Ações'

    tr.append(thImagem, thProduto, thCategoria, thSabores, thPreco, thAcoes)
    thead.append(tr)

    const tbody = document.createElement('tbody')

    renderizarLinhasTabela(listaDoce, tbody)

    inputPesquisa.oninput = () => {
        const valorPesquisa = inputPesquisa.value.toLowerCase().trim()
        const docesFiltrados = listaDoce.filter(item =>
            item.nome.toLowerCase().includes(valorPesquisa)
        )
        renderizarLinhasTabela(docesFiltrados, tbody)
    }

    table.append(thead, tbody)
    div_tabela_itens.append(table)
    div_guardar_tabela.append(div_topo_tabela, div_tabela_itens)

    const div_barra_lateral = document.createElement('div')
    div_barra_lateral.className = 'barra-lateral'

    const div_card_gerenciar_categoria = document.createElement('div')
    div_card_gerenciar_categoria.className = 'card-gerenciar-categoria'
    div_card_gerenciar_categoria.id = 'card-categoria'

    const h3_gerenciar_categoria = document.createElement('h3')
    h3_gerenciar_categoria.textContent = 'Gerenciar Categoria'

    const button_adicionar_categoria = document.createElement('button')
    button_adicionar_categoria.className = 'btn-adicionar-mini'
    button_adicionar_categoria.id = 'adicionar-categoria'
    button_adicionar_categoria.textContent = '+ Adicionar Categoria'
    button_adicionar_categoria.onclick = () => renderizarPagina('categoria')

    const ul_gerenciar_categoria = document.createElement('ul')
    ul_gerenciar_categoria.className = 'lista-gerenciar'

    listaCategoria.forEach(function (itemCategoria) {
        const li_gerenciar_categoria = document.createElement('li')
        li_gerenciar_categoria.className = 'item-lista'

        const span_gerenciar_categoria = document.createElement('span')
        span_gerenciar_categoria.textContent = itemCategoria.categoria

        const div_guardar_botoes = document.createElement('div')
        div_guardar_botoes.className = 'acoes-mini'

        const button_atualizar_categoria = document.createElement('button')
        const imagem_botao_atualizar_categoria = document.createElement('img')
        imagem_botao_atualizar_categoria.src = './img/lapis.png'
        imagem_botao_atualizar_categoria.alt = 'editar'
        button_atualizar_categoria.append(imagem_botao_atualizar_categoria)
        button_atualizar_categoria.onclick = () => atualizarCategoria(itemCategoria)

        const button_deletar_categora = document.createElement('button')
        button_deletar_categora.onclick = async () => {
            if (confirm("Tem certeza que deseja deletar esta categoria?")) {
                await deleteCategoria(itemCategoria.id)
                await carregarItens()
            }
        }
        const imagem_botao_deletar_categoria = document.createElement('img')
        imagem_botao_deletar_categoria.src = './img/lixo.png'
        imagem_botao_deletar_categoria.alt = 'deletar'
        button_deletar_categora.append(imagem_botao_deletar_categoria)

        div_guardar_botoes.append(button_atualizar_categoria, button_deletar_categora)
        li_gerenciar_categoria.append(span_gerenciar_categoria, div_guardar_botoes)
        ul_gerenciar_categoria.append(li_gerenciar_categoria)
    })

    div_card_gerenciar_categoria.append(h3_gerenciar_categoria, button_adicionar_categoria, ul_gerenciar_categoria)

    const div_card_gerenciar_sabor = document.createElement('div')
    div_card_gerenciar_sabor.className = 'card-gerenciar-sabor'
    div_card_gerenciar_sabor.id = 'card-sabor'

    const h3_gerenciar_sabor = document.createElement('h3')
    h3_gerenciar_sabor.textContent = 'Gerenciar Sabor'

    const button_adicionar_sabor = document.createElement('button')
    button_adicionar_sabor.className = 'btn-adicionar-mini'
    button_adicionar_sabor.id = 'adicionar-sabor'
    button_adicionar_sabor.textContent = '+ Adicionar sabor'
    button_adicionar_sabor.onclick = () => renderizarPagina('sabor')

    const ul_gerenciar_sabor = document.createElement('ul')
    ul_gerenciar_sabor.className = 'lista-gerenciar'

    listaSabor.forEach(function (itemSabor) {
        const li_gerenciar_sabor = document.createElement('li')
        li_gerenciar_sabor.className = 'item-lista'

        const span_gerenciar_sabor = document.createElement('span')
        span_gerenciar_sabor.textContent = itemSabor.sabor

        const div_guardar_botoes_sabor = document.createElement('div')
        div_guardar_botoes_sabor.className = 'acoes-mini'

        const button_atualizar_sabor = document.createElement('button')
        const imagem_botao_atualizar_sabor = document.createElement('img')
        imagem_botao_atualizar_sabor.src = './img/lapis.png'
        imagem_botao_atualizar_sabor.alt = 'editar'
        button_atualizar_sabor.append(imagem_botao_atualizar_sabor)
        button_atualizar_sabor.onclick = () => atualizarSabor(itemSabor)

        const button_deletar_sabor = document.createElement('button')
        button_deletar_sabor.onclick = async () => {
            if (confirm("Tem certeza que deseja deletar este sabor?")) {
                await deleteSabor(itemSabor.id)
                await carregarItens()
            }
        }
        const imagem_botao_deletar_sabor = document.createElement('img')
        imagem_botao_deletar_sabor.src = './img/lixo.png'
        imagem_botao_deletar_sabor.alt = 'deletar'
        button_deletar_sabor.append(imagem_botao_deletar_sabor)

        div_guardar_botoes_sabor.append(button_atualizar_sabor, button_deletar_sabor)
        li_gerenciar_sabor.append(span_gerenciar_sabor, div_guardar_botoes_sabor)
        ul_gerenciar_sabor.append(li_gerenciar_sabor)
    })

    div_card_gerenciar_sabor.append(h3_gerenciar_sabor, button_adicionar_sabor, ul_gerenciar_sabor)

    div_barra_lateral.append(div_card_gerenciar_categoria, div_card_gerenciar_sabor)
    div_layout.append(div_guardar_tabela, div_barra_lateral)
    main.append(container_cards, divPesquisa, div_layout)
}