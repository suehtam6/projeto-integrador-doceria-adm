'use strict'

import { renderizarPagina } from "../main.js"
// IMPORTANTE: Certifique-se de ter essas funções exportadas no seu methods.js
import { deleteDoce, deleteCategoria, deleteSabor } from "../methods.js"

// 1. CORREÇÃO: A função agora recebe as listas (Arrays) completas da API
export function criarPreview(listaDoces, listaCategorias, listaSabores) {
    const main = document.getElementById('main')
    main.replaceChildren() 

    const container_cards = document.createElement('div')
    container_cards.className = 'container-principal'

    // --- CARD CONTADOR: DOCES ---
    const card_informacao_doce = document.createElement('div')
    card_informacao_doce.className = 'card-informacao-doce'
    const h3_doce_cadastrado = document.createElement('h3')
    h3_doce_cadastrado.textContent = 'Produtos cadastrados'
    const span_doce_cadastrado = document.createElement('span')
    span_doce_cadastrado.className = 'qtde-cadastrada'
    span_doce_cadastrado.id = 'qtde-cadastrada'
    // CORREÇÃO: Mostra o total real baseado no tamanho do array
    span_doce_cadastrado.textContent = `🍭 ${listaDoces.length}` 
    card_informacao_doce.append(h3_doce_cadastrado, span_doce_cadastrado)

    // --- CARD CONTADOR: CATEGORIAS ---
    const card_informacao_categoria = document.createElement('div')
    card_informacao_categoria.className = 'card-informacao-doce'
    const h3_categoria_cadastrado = document.createElement('h3')
    h3_categoria_cadastrado.textContent = 'Categorias cadastradas'
    const span_categoria_cadastrado = document.createElement('span')
    span_categoria_cadastrado.className = 'qtde-categoria'
    span_categoria_cadastrado.id = 'qtde-categoria'
    // CORREÇÃO: Mostra o total real baseado no tamanho do array
    span_categoria_cadastrado.textContent = `🧁 ${listaCategorias.length}` 
    card_informacao_categoria.append(h3_categoria_cadastrado, span_categoria_cadastrado)

    // --- CARD CONTADOR: SABORES ---
    const card_informacao_sabor = document.createElement('div')
    card_informacao_sabor.className = 'card-informacao-sabor'
    const h3_sabor_cadastrado = document.createElement('h3')
    h3_sabor_cadastrado.textContent = 'Sabores cadastrados'
    const span_sabor_cadastrado = document.createElement('span')
    span_sabor_cadastrado.className = 'qtde-sabor'
    span_sabor_cadastrado.id = 'qtde-sabor'
    // CORREÇÃO: Mostra o total real baseado no tamanho do array
    span_sabor_cadastrado.textContent = `🍫 ${listaSabores.length}` 
    card_informacao_sabor.append(h3_sabor_cadastrado, span_sabor_cadastrado)

    container_cards.append(card_informacao_doce, card_informacao_categoria, card_informacao_sabor)

    // --- CAMPO DE PESQUISA ---
    const divPesquisa = document.createElement('div')
    divPesquisa.className = 'pesquisa'
    const inputPesquisa = document.createElement('input')
    inputPesquisa.className = 'doce-pesquisado'
    inputPesquisa.id = 'doce-pesquisado'
    inputPesquisa.type = 'search'
    inputPesquisa.placeholder = 'Pesquisar produto'
    divPesquisa.append(inputPesquisa)

    // --- ESTRUTURA DO LAYOUT ---
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
    thImagem.scope = 'col'; thImagem.textContent = 'Imagem'
    const thProduto = document.createElement('th')
    thProduto.scope = 'col'; thProduto.textContent = 'Produto'
    const thCategoria = document.createElement('th')
    thCategoria.scope = 'col'; thCategoria.textContent = 'Categoria'
    const thPreco = document.createElement('th')
    thPreco.scope = 'col'; thPreco.textContent = 'Preço'
    const thAcoes = document.createElement('th')
    thAcoes.scope = 'col'; thAcoes.textContent = 'Ações'

    tr.append(thImagem, thProduto, thCategoria, thPreco, thAcoes)
    thead.append(tr)

    const tbody = document.createElement('tbody')

    // 2. CORREÇÃO: Loop para gerar uma linha da tabela para CADA doce vindo da API
    listaDoces.forEach(doce => {
        const trItens = document.createElement('tr')
        trItens.className = 'itens'

        const tdImagem = document.createElement('td')
        tdImagem.className = 'imagem-doce'
        const ImagemTd = document.createElement('img')
        ImagemTd.className = 'imagem-tabela' 
        ImagemTd.src = doce.imagem || './img/bolo.webp' // Usa a imagem da API ou uma padrão
        ImagemTd.alt = doce.nome
        tdImagem.append(ImagemTd)

        const tdProduto = document.createElement('td')
        tdProduto.className = 'nome-doce'
        tdProduto.textContent = doce.nome 

        const tdCategoria = document.createElement('td')
        tdCategoria.className = 'categoria-td'
        tdCategoria.textContent = doce.categoria // Nome da categoria vinda do relacionamento na API

        const tdPreco = document.createElement('td')
        tdPreco.className = 'preco'
        tdPreco.textContent = `R$ ${Number(doce.preco).toFixed(2).replace('.', ',')}` 

        const tdBTN = document.createElement('td')
        tdBTN.className = 'acoes-tabela'

        const div_acao_tabela_atualizar = document.createElement('div')
        div_acao_tabela_atualizar.className = 'btn-acao'
        const button_atualizar = document.createElement('button')
        button_atualizar.id = `editar-doce-${doce.id}`
        // Aqui você pode linkar para abrir a tela de edição passando o doce.id
        button_atualizar.onclick = () => console.log('Editar doce', doce.id)

        const imagem_botao_atualizar = document.createElement('img')
        imagem_botao_atualizar.src = './img/lapis.png'
        imagem_botao_atualizar.alt = 'editar'
        button_atualizar.append(imagem_botao_atualizar)
        div_acao_tabela_atualizar.append(button_atualizar)

        const div_acao_tabela_deletar = document.createElement('div')
        div_acao_tabela_deletar.className = 'btn-acao'
        const button_deletar = document.createElement('button')
        button_deletar.id = `deletar-doce-${doce.id}`
        button_deletar.onclick = async () => {
            if(confirm(`Tem certeza que deseja deletar o doce "${doce.nome}"?`)) {
                await deleteDoce(doce.id)
                // Idealmente aqui você recarrega a função criarPreview puxando os dados atualizados
                trItens.remove() // Remove a linha da tela imediatamente
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

    // --- BARRA LATERAL (GERENCIAMENTOS) ---
    const div_barra_lateral = document.createElement('div')
    div_barra_lateral.className = 'barra-lateral'

    // --- GERENCIAR CATEGORIA ---
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

    // 3. CORREÇÃO: Loop para renderizar todas as categorias da API na lista lateral
    listaCategorias.forEach(cat => {
        const li = document.createElement('li')
        const span = document.createElement('span')
        span.textContent = cat.nome 

        const div_guardar_botoes = document.createElement('div')
        div_guardar_botoes.className = 'acoes-mini'

        const button_atualizar_cat = document.createElement('button')
        const img_atualizar = document.createElement('img')
        img_atualizar.src = './img/lapis.png'
        button_atualizar_cat.append(img_atualizar)

        const button_deletar_cat = document.createElement('button')
        button_deletar_cat.onclick = async () => {
            if(confirm(`Tem certeza que deseja deletar a categoria "${cat.nome}"?`)) {
                await deleteCategoria(cat.id) // Chamando a função correta
                li.remove() 
            }
        }
        const img_deletar = document.createElement('img')
        img_deletar.src = './img/lixo.png'
        button_deletar_cat.append(img_deletar)

        div_guardar_botoes.append(button_atualizar_cat, button_deletar_cat)
        li.append(span, div_guardar_botoes)
        ul_gerenciar_categoria.append(li)
    })

    div_card_gerenciar_categoria.append(h3_gerenciar_categoria, button_adicionar_categoria, ul_gerenciar_categoria)

    // --- GERENCIAR SABOR ---
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

    // 4. CORREÇÃO: Loop para renderizar todos os sabores da API na lista lateral
    listaSabores.forEach(sab => {
        const li = document.createElement('li')
        const span = document.createElement('span')
        span.textContent = sab.nome 

        const div_guardar_botoes_sabor = document.createElement('div')
        div_guardar_botoes_sabor.className = 'acoes-mini'

        const button_atualizar_sab = document.createElement('button')
        const img_atualizar = document.createElement('img')
        img_atualizar.src = './img/lapis.png'
        button_atualizar_sab.append(img_atualizar)

        const button_deletar_sab = document.createElement('button')
        button_deletar_sab.onclick = async () => {
            if(confirm(`Tem certeza que deseja deletar o sabor "${sab.nome}"?`)) {
                await deleteSabor(sab.id) // Chamando a função correta
                li.remove()
            }
        }
        const img_deletar = document.createElement('img')
        img_deletar.src = './img/lixo.png'
        button_deletar_sab.append(img_deletar)

        div_guardar_botoes_sabor.append(button_atualizar_sab, button_deletar_sab)
        li.append(span, div_guardar_botoes_sabor)
        ul_gerenciar_sabor.append(li)
    })

    div_card_gerenciar_sabor.append(h3_gerenciar_sabor, button_adicionar_sabor, ul_gerenciar_sabor)

    // --- MONTAGEM FINAL DA TELA ---
    div_barra_lateral.append(div_card_gerenciar_categoria, div_card_gerenciar_sabor)
    div_layout.append(div_guardar_tabela, div_barra_lateral)
    main.append(container_cards, divPesquisa, div_layout)

    return main
}