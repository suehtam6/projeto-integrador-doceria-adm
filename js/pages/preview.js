'use strict'

import { renderizarPagina } from "../main.js"
import { deleteDoce, getCategorias, getSabores, getDoces, deleteCategoria, deleteSabor } from "../methods.js"
// import { doces, categorias, sabores } from '../doce_teste.js';
import { atualizarDoce} from './tela_atualizar_doce.js'
import { atualizarCategoria } from "./tela_atualizar_categoria.js";
import { atualizarSabor } from "./tela_atualizar_sabor.js";

const carregarItens = async function () {
    try {
        const listaDoce = await getDoces()
        const listaSabor = await getSabores()
        const listaCategoria = await getCategorias()

        if (Array.isArray(listaCategoria) && Array.isArray(listaSabor) && Array.isArray(listaDoce)) {

            criarPreview(listaCategoria, listaSabor, listaDoce)
        } else {
            alert("ERRO: Não foram encontrados dados para retornar!!")
        }
    } catch (error) {
        alert("ERRO: AO CARREGAR AS CATEGORIAS E SABORES!!")
    }
}


const renderizarLinhasTabela = function(listaDeDoces, tbody) {
    tbody.replaceChildren();

    listaDeDoces.forEach(itemDoce => {
        const trItens = document.createElement('tr')
        trItens.className = 'itens'

        const tdImagem = document.createElement('td')
        tdImagem.className = 'imagem-doce'
        const ImagemTd = document.createElement('img')
        ImagemTd.className = 'imagem-tabela'
        ImagemTd.src = itemDoce.imagem
        ImagemTd.alt = itemDoce.nome
        tdImagem.append(ImagemTd)

        // Coluna do Nome do Doce
        const tdProduto = document.createElement('td')
        tdProduto.className = 'nome-doce'
        tdProduto.textContent = itemDoce.nome

        // Coluna da Categoria
        const tdCategoria = document.createElement('td')
        tdCategoria.className = 'categoria-td'
        tdCategoria.textContent = itemDoce.categoria

        // Coluna do Preço (Formatado para Real R$)
        const tdPreco = document.createElement('td')
        tdPreco.className = 'preco'
        tdPreco.textContent = itemDoce.preco

        // Coluna de Ações (Editar / Deletar)
        const tdBTN = document.createElement('td')
        tdBTN.className = 'acoes-tabela'

        // Botão Editar
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

        // Botão Deletar
        const div_acao_tabela_deletar = document.createElement('div')
        div_acao_tabela_deletar.className = 'btn-acao'
        const button_deletar = document.createElement('button')
        button_deletar.id = `deletar-doce-${itemDoce.id}`
        button_deletar.onclick = async () => {
            if (confirm(`Tem certeza que deseja deletar o doce "${itemDoce.nome}"?`)) {
                await deleteDoce(itemDoce.id)
            }
        }
        const imagem_botao_deletar = document.createElement('img')
        imagem_botao_deletar.src = './img/lixo.png'
        imagem_botao_deletar.alt = 'deletar'
        button_deletar.append(imagem_botao_deletar)
        div_acao_tabela_deletar.append(button_deletar)

        tdBTN.append(div_acao_tabela_atualizar, div_acao_tabela_deletar)

        // Monta a linha completa e adiciona no corpo da tabela
        trItens.append(tdImagem, tdProduto, tdCategoria, tdPreco, tdBTN)
        tbody.append(trItens)
    })
}

// Função aonde vou mostrar a tela principal
export function criarPreview(listaCategoria, listaSabor, listaDoce) {


    const header = document.getElementById('header')
    const main = document.getElementById('main')
    main.replaceChildren()
    header.replaceChildren()

    const imagemLogo = document.createElement('img')
    imagemLogo.src = './img/logo.png'

    header.append(imagemLogo)

    const container_cards = document.createElement('div')
    container_cards.className = 'container-principal'


    // Aqui vou deixar armazenado a quantidade de doces cadastrados
    const card_informacao_doce = document.createElement('div')
    card_informacao_doce.className = 'card-informacao-doce'
    const h3_doce_cadastrado = document.createElement('h3')
    h3_doce_cadastrado.textContent = 'Produtos cadastrados'
    const span_doce_cadastrado = document.createElement('span')
    span_doce_cadastrado.className = 'qtde-cadastrada'
    span_doce_cadastrado.id = 'qtde-cadastrada'
    span_doce_cadastrado.textContent = `🍭${listaDoce.length}` // Vou mudar este espaço quando a API ficar pronta
    card_informacao_doce.append(h3_doce_cadastrado, span_doce_cadastrado)

    // Aqui vou deixar armazenado a quantidade de categorias cadastradas
    const card_informacao_categoria = document.createElement('div')
    card_informacao_categoria.className = 'card-informacao-doce'
    const h3_categoria_cadastrado = document.createElement('h3')
    h3_categoria_cadastrado.textContent = 'Categorias cadastradas'
    const span_categoria_cadastrado = document.createElement('span')
    span_categoria_cadastrado.className = 'qtde-categoria'
    span_categoria_cadastrado.id = 'qtde-categoria'
    span_categoria_cadastrado.textContent = `🧁${listaCategoria.length}` // Vou mudar este espaço quando a API ficar pronta
    card_informacao_categoria.append(h3_categoria_cadastrado, span_categoria_cadastrado)


    // Aqui vou deixar armazenado a quantidade de sabores cadastradas
    const card_informacao_sabor = document.createElement('div')
    card_informacao_sabor.className = 'card-informacao-sabor'
    const h3_sabor_cadastrado = document.createElement('h3')
    h3_sabor_cadastrado.textContent = 'Sabor cadastrados'
    const span_sabor_cadastrado = document.createElement('span')
    span_sabor_cadastrado.className = 'qtde-sabor'
    span_sabor_cadastrado.id = 'qtde-sabor'
    span_sabor_cadastrado.textContent = `🍫${listaSabor.length}` // Vou mudar este espaço quando a API ficar pronta
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

    // O evento 'input' captura tanto a digitação quanto o clique no "X" de limpar
    inputPesquisa.oninput = () => {
        // Pega o valor, remove espaços extras e joga para minúsculo
        const valorPesquisa = inputPesquisa.value.toLowerCase().trim();

        // Se o adm limpou o input, 'valorPesquisa' será "" (string vazia)
        // No JavaScript, .includes("") sempre vai acabar retornando true.
        const docesFiltrados = doces.filter(listaDoce => // aqui eu estou filtrando pelo doce e deixando em letra minuscula
            listaDoce.nome.toLowerCase().includes(valorPesquisa)
        );

        // Atualiza a tabela: mostra só o pesquisado ou TODOS se estiver vazio
        renderizarLinhasTabela(docesFiltrados, tbody);
    };


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
    button_adicionar_produto.onclick = () => renderizarPagina('doce') // Aqui vou deixar linkado para a pagina de doce quando for acionado
    div_topo_tabela.append(h3_titulo_tabela, button_adicionar_produto)

    const div_tabela_itens = document.createElement('div')
    div_tabela_itens.className = 'tabela-itens'

    const table = document.createElement('table')
    table.className = 'descricao-tabela'

    // Aqui é aonde ficara os nomes de cada coluna da tabela
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


    const thPreco = document.createElement('th')
    thPreco.scope = 'col'
    thPreco.textContent = 'Preço'


    const thAcoes = document.createElement('th')
    thAcoes.scope = 'col'
    thAcoes.textContent = 'Ações'

    tr.append(thImagem, thProduto, thCategoria, thPreco, thAcoes)
    thead.append(tr)

    // Aqui é aonde vai estar os itens das tabelas
    const tbody = document.createElement('tbody')

    listaDoce.forEach(function (itemDoce) {
        const trItens = document.createElement('tr')
        trItens.className = 'itens'

        // Aqui é aonde ficara os dados sobre a imagem dos doces
        const tdImagem = document.createElement('td')
        tdImagem.className = 'imagem-doce'

        const ImagemTd = document.createElement('img')
        ImagemTd.className = 'imagem-tabela'
        ImagemTd.src = itemDoce.imagem // Mudar depois quando a API estiver pronta para mostrar a imagem do doce cadastrado
        ImagemTd.alt = `imagem do doce ${itemDoce.imagem}`
        tdImagem.append(ImagemTd)

        // Aqui é aonde ficara os dados sobre o nome do doce
        const tdProduto = document.createElement('td')
        tdProduto.className = 'nome-doce'
        tdProduto.textContent = itemDoce.nome // Mudar depois quando a API estiver pronta para mostrar o nome do doce cadastrado

        // Aqui é aonde ficara os dados sobre a categoria
        const tdCategoria = document.createElement('td')
        tdCategoria.className = 'categoria-td'
        tdCategoria.textContent = itemDoce.categoria // Mudar depois quando a API estiver pronta para mostrar a categoria do doce cadastrado

        // Aqui é aonde ficara os dados sobre o preço
        const tdPreco = document.createElement('td')
        tdPreco.className = 'preco'
        tdPreco.textContent = `R$ ${itemDoce.preco}` // Mudar depois quando a API estiver pronta para mostrar o preço do doce cadastrado

        // Aqui vai ficar os botões de atualizar e deletar
        const tdBTN = document.createElement('td')
        tdBTN.className = 'acoes-tabela'

        const div_acao_tabela_atualizar = document.createElement('div')
        div_acao_tabela_atualizar.className = 'btn-acao'

        const button_atualizar = document.createElement('button')
        button_atualizar.id = 'editar-doce'
        button_atualizar.onclick = () => atualizarDoce(itemDoce)


        const imagem_botao_atualizar = document.createElement('img')
        imagem_botao_atualizar.src = './img/lapis.png'
        imagem_botao_atualizar.alt = 'editar'

        div_acao_tabela_atualizar.append(button_atualizar)

        button_atualizar.append(imagem_botao_atualizar)


        const div_acao_tabela_deletar = document.createElement('div')
        div_acao_tabela_deletar.className = 'btn-acao'


        const button_deletar = document.createElement('button')
        button_deletar.id = 'deletar-doce'
        button_deletar.onclick = async () => {
            if (confirm("Tem certeza que deseja deletar este doce?")) {
                await deleteDoce(itemDoce.id)
                main.replaceChildren()
            }
        }

        const imagem_botao_deletar = document.createElement('img')
        imagem_botao_deletar.src = './img/lixo.png'
        imagem_botao_deletar.alt = 'deletar'

        button_deletar.append(imagem_botao_deletar)


        div_acao_tabela_deletar.append(button_deletar)
        tdBTN.append(div_acao_tabela_atualizar, div_acao_tabela_deletar)

        trItens.append(tdImagem, tdProduto, tdCategoria, tdPreco, tdBTN)
        tbody.append(trItens)

    })



    table.append(thead, tbody)
    div_tabela_itens.append(table)

    div_guardar_tabela.append(div_topo_tabela, div_tabela_itens)

    // Aqui vou guardar o gerenciamento da categoria e do sabor

    const div_barra_lateral = document.createElement('div')
    div_barra_lateral.className = 'barra-lateral'

    // Fazendo o gerenciamento da categoria

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
        span_gerenciar_categoria.textContent = itemCategoria.nome // MUDAR DPS PARA A API QUE ESTA SENDO DESENVOLVIDA

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
                await deleteCategoria(itemCategoria.id) // MUDAR DPS PARA A API QUE ESTA SENDO DESENVOLVIDA
                main.replaceChildren()
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

    // fazendo o gerenciamento de doces

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

    listaSabor.map(function(itemSabor){
        const li_gerenciar_sabor = document.createElement('li')
        li_gerenciar_sabor.className = 'item-lista'

        const span_gerenciar_sabor = document.createElement('span')
        span_gerenciar_sabor.textContent = itemSabor.nome //Mudar quando a api estiver pronta
    
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
                main.replaceChildren()
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
    
    


    return main
}


carregarItens