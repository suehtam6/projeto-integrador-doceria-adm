'use strict'

import { renderizarPagina } from "../main.js"

// Função aonde vou mostrar a tela principal
export function criarPreview(){
    const main = document.getElementById('main')
    main.replaceChildren()
    

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
    span_doce_cadastrado.textContent = '🍭15' // Vou mudar este espaço quando a API ficar pronta
    card_informacao_doce.append(h3_doce_cadastrado, span_doce_cadastrado)

    // Aqui vou deixar armazenado a quantidade de categorias cadastradas
    const card_informacao_categoria = document.createElement('div')
    card_informacao_categoria.className = 'card-informacao-doce'
    const h3_categoria_cadastrado = document.createElement('h3')
    h3_categoria_cadastrado.textContent = 'Categorias cadastradas'
    const span_categoria_cadastrado = document.createElement('span')
    span_categoria_cadastrado.className = 'qtde-categoria'
    span_categoria_cadastrado.id = 'qtde-categoria'
    span_categoria_cadastrado.textContent = '🧁8' // Vou mudar este espaço quando a API ficar pronta
    card_informacao_categoria.append(h3_categoria_cadastrado, span_categoria_cadastrado)


    // Aqui vou deixar armazenado a quantidade de sabores cadastradas
    const card_informacao_sabor = document.createElement('div')
    card_informacao_sabor.className = 'card-informacao-sabor'
    const h3_sabor_cadastrado = document.createElement('h3')
    h3_sabor_cadastrado.textContent = 'Sabor cadastrados'
    const span_sabor_cadastrado = document.createElement('span')
    span_sabor_cadastrado.className = 'qtde-sabor'
    span_sabor_cadastrado.id = 'qtde-sabor'
    span_sabor_cadastrado.textContent = '🍫10' // Vou mudar este espaço quando a API ficar pronta
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
    const trItens = document.createElement('tr')

    // Aqui é aonde ficara os dados sobre a imagem dos doces
    const tdImagem = document.createElement('td')
    tdImagem.className = 'imagem-doce'
    const divImagemTd = document.createElement('div')
    divImagemTd.className = 'placeholder-img'
    tdImagem.append(divImagemTd)

    // Aqui é aonde ficara os dados sobre o nome do doce
    const tdProduto = document.createElement('td')
    tdProduto.className = 'nome-produto'
    tdProduto.textContent = 'Bolo de chocolate'

    // Aqui é aonde ficara os dados sobre a categoria
    const tdCategoria = document.createElement('td')
    tdCategoria.className = 'categoria-td'
    tdCategoria.textContent = 'Bolo'

    // Aqui é aonde ficara os dados sobre o preço
    const tdPreco = document.createElement('td')
    tdPreco.className = 'preco'
    tdPreco.textContent = 'R$ 10,00'

    // Aqui vai ficar os botões de atualizar e deletar
    const tdBTN = document.createElement('td')
    tdBTN.className = 'btn'
    const button_atualizar = document.createElement('button')
    button_atualizar.id = 'editar-doce'
    const imagem_botao_atualizar = document.createElement('img')
    imagem_botao_atualizar.src = './img/lapis.png'
    imagem_botao_atualizar.alt = 'editar'

    button_atualizar.append(imagem_botao_atualizar)

    const button_deletar = document.createElement('button')
    button_deletar.id = 'deletar-doce'

    const imagem_botao_deletar = document.createElement('img')
    imagem_botao_deletar.src = './img/lixo.png'
    imagem_botao_deletar.alt = 'deletar'

    button_deletar.append(imagem_botao_deletar)
    tdBTN.append(button_atualizar, button_deletar)

    trItens.append(tdImagem, tdProduto, tdCategoria, tdPreco, tdBTN)
    tbody.append(trItens)
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

    const li_gerenciar_categoria = document.createElement('li')
    const span_gerenciar_categoria = document.createElement('span')
    span_gerenciar_categoria.textContent = 'Bolo' 

    const div_guardar_botoes = document.createElement('div')
    div_guardar_botoes.className = 'acoes-mini'

    const button_atualizar_categoria = document.createElement('button')
    const imagem_botao_atualizar_categoria = document.createElement('img')
    imagem_botao_atualizar_categoria.src = './img/lapis.png'; imagem_botao_atualizar_categoria.alt = 'editar'
    button_atualizar_categoria.append(imagem_botao_atualizar_categoria)

    const button_deletar_categora = document.createElement('button')
    const imagem_botao_deletar_categoria = document.createElement('img')
    imagem_botao_deletar_categoria.src = './img/lixo.png'; imagem_botao_deletar_categoria.alt = 'deletar'
    button_deletar_categora.append(imagem_botao_deletar_categoria)


    div_guardar_botoes.append(button_atualizar_categoria, button_deletar_categora)
    li_gerenciar_categoria.append(span_gerenciar_categoria, div_guardar_botoes)
    ul_gerenciar_categoria.append(li_gerenciar_categoria)
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

    const li_gerenciar_sabor = document.createElement('li')
    const span_gerenciar_sabor = document.createElement('span')
    span_gerenciar_sabor.textContent = 'Chocolate' //Mudar quando a api estiver pronta

    const div_guardar_botoes_sabor = document.createElement('div')
    div_guardar_botoes_sabor.className = 'acoes-mini'

    const button_atualizar_sabor = document.createElement('button')
    const imagem_botao_atualizar_sabor = document.createElement('img')
    imagem_botao_atualizar_sabor.src = './img/lapis.png'; imagem_botao_atualizar_sabor.alt = 'editar'
    button_atualizar_sabor.append(imagem_botao_atualizar_sabor)

    const button_deletar_sabor = document.createElement('button')
    const imagem_botao_deletar_sabor = document.createElement('img')
    imagem_botao_deletar_sabor.src = './img/lixo.png'; imagem_botao_deletar_sabor.alt = 'deletar'
    button_deletar_sabor.append(imagem_botao_deletar_sabor)

    div_guardar_botoes_sabor.append(button_atualizar_sabor, button_deletar_sabor)
    li_gerenciar_sabor.append(span_gerenciar_sabor, div_guardar_botoes_sabor)
    ul_gerenciar_sabor.append(li_gerenciar_sabor)
    div_card_gerenciar_sabor.append(h3_gerenciar_sabor, button_adicionar_sabor, ul_gerenciar_sabor)


    div_barra_lateral.append(div_card_gerenciar_categoria, div_card_gerenciar_sabor)

    div_layout.append(div_guardar_tabela, div_barra_lateral)
    

    main.append(container_cards, divPesquisa, div_layout)

    return main
}