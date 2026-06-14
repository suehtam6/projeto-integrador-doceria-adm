'use strict'

import { renderizarPagina } from "../main.js"
// import { uploadParaCloudinary } from "../preview_img.js"
import { getCategorias, getSabores, getDoces, postDoce } from "../methods.js"
import { categorias, sabores } from "../doce_teste.js"


function preview(input) {
    if (input.files && input.files[0]) {
        document.getElementById('preview-image').src = URL.createObjectURL(input.files[0])
    }
}

// Caso alguém for utilizar ou ler esté codígo, aqui é aonde eu vou pegar as listar de categorias e
//  doces para utilizar no projeto e criar os checkbox
// const carregarItens = async function () {
//     try {
//         let listaSabor = await getSabores()
//         let listaCategoria = await getCategorias()

//         if (Array.isArray(listaCategoria) && Array.isArray(listaSabor)) {

//             cadastrarDoce(listaCategoria, listaSabor)
//         } else {
//             alert("ERRO: Não foram encontrados dados para retornar!!")
//         }
//     } catch (error) {
//         alert("ERRO: AO CARREGAR AS CATEGORIAS E SABORES!!")
//     }
// }


// Aqui eu vou cadastrar os doces
export async function cadastrarDoce() {
    let main = document.getElementById('main')
    main.replaceChildren()

    let tituloPagina = document.createElement('h1')
    tituloPagina.textContent = 'Cadastro de produto'
    tituloPagina.className = 'tituloPagina'

    let container_cadastro = document.createElement('div')
    container_cadastro.className = 'container-cadastro'

    let inputNome = document.createElement('input')
    inputNome.className = 'nome-produto'
    inputNome.id = 'nome-produto'
    inputNome.type = 'text'
    inputNome.placeholder = 'Escreva o nome do produto'


    let containerCategoria = document.createElement('div')
    containerCategoria.className = 'container-categoria'

    let tituloCategoria = document.createElement('h2')
    tituloCategoria.textContent = 'Categorias'
    containerCategoria.append(tituloCategoria)

    let divCategoriasLista = document.createElement('div')
    divCategoriasLista.className = 'caixaCategoria'

    // Aqui eu vou estar varrendo a lista das categorias
    categorias.forEach(categoria => {
        let caixaItem = document.createElement('div')
        caixaItem.className = 'item-radio'

        let radio = document.createElement('input')
        radio.className = 'radio-categoria'
        radio.type = 'radio'
        radio.name = 'categoria-produto'
        radio.value = categoria.id
        radio.id = `cat-${categoria.id}`    // motivo de eu utilizar o `cat` aqui é por que o html daria erro se recebesse apenas o
        //  id, pois teria o id 1 da categoria e o id 1 do sabor, e poderia acabar dando erro
        // Fora que fica mais facil para juntar com a label, quando eu estiver utilizando o htmlFor

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

    // Varrendo a lista de sabores para criar os checkbox e uma coisa que eu não acabei falando etapa acima, mas caso você não saiba,
    //  Eu posso criar ambas as funções escrevendo checkbox sem mais nenhuma palavra para diferenciar, pois elas estão sendo criadas como let e
    //   elas se iniciam e finalizam neste bloco
    sabores.forEach(sabor => {
        let caixaItem = document.createElement('div')
        caixaItem.className = 'item-checkbox'

        let checkbox = document.createElement('input')
        checkbox.className = 'checkbox-sabor'
        checkbox.type = 'checkbox'
        checkbox.value = sabor.id
        checkbox.id = `sab-${sabor.id}` // Mesmo motivo da categoria, a diferença que nesta etapa eu utilizei o 'sab'

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
    img.src = './img/logo.png'

    divContainer.append(inputImage, labelImage, img)


    let botao_adicionar = document.createElement('button')
    botao_adicionar.textContent = 'CADASTRAR'
    botao_adicionar.id = 'salvar-categoria'
    botao_adicionar.className = 'padronizar-btn'
    botao_adicionar.onclick = () => cadastroDoce()

    let botao_voltar = document.createElement('button')
    botao_voltar.textContent = 'CANCELAR'
    botao_voltar.id = 'cancelar-categoria'
    botao_voltar.className = 'padronizar-btn'
    botao_voltar.onclick = () => renderizarPagina('preview')

    let caixaBTN = document.createElement('div')
    caixaBTN.className = 'caixa-btn'
    caixaBTN.append(botao_adicionar, botao_voltar)

    container_cadastro.append(tituloPagina, inputNome, containerCategoria, containerSabor, inputPreco, divContainer, caixaBTN)
    main.replaceChildren(container_cadastro)

    return main
}


const cadastroDoce = async function () {
    try {
        let inputNome = document.getElementById('nome-produto')
        let inputPreco = document.getElementById('preco')
        let inputImagem = document.getElementById('preview-input')


        // Captura todos os checkboxes de categoria marcados (:checked) e extrai os valores
        // Captura apenas o único botão radio que estiver marcado (:checked)
        // Assim sempre será enviado uma unica categoria
        let categoriaMarcada = document.querySelector('.radio-categoria:checked')

        // Aqui eu verifico se o usuario clicou em alguma categoria, caso ele não tenha clicado em nenhuma
        // o codigo irá salvar como null e a validação vai pegar e barrar e vai mostrar o alert de que o doce não foi possivel cadastrar por causa da categoria
        let categoriaSelecionada = categoriaMarcada ? categoriaMarcada.value : null


        // Captura todos os checkboxes de sabor marcados (:checked) e extrai os valores
        // Para funcionar os checkbox de multiplas escolhas, pois cada doce pode ter mais do que um sabor, e sem isto não ira
        // Pois ele captura todos os campos que o usuario apertou
        let saboresMarcados = document.querySelectorAll('.checkbox-sabor:checked')
        let listaSaboresSelecionados = Array.from(saboresMarcados).map(cb => cb.value)

        let novoDoce = {
            nome: inputNome.value,
            categoria: categoriaSelecionada,
            sabores: listaSaboresSelecionados,
            preco: inputPreco.value,
            imagem: inputImagem.files[0]
        }

        let dadosValidos = validar(novoDoce)

        if (dadosValidos) {
            await postDoce(novoDoce)
            alert('Doce salvo com sucesso!')
        } else {
            alert('Erro ao salvar o doce. Verifique os dados e tente novamente.')
        }

    } catch (error) {
        console.error(error)
        alert('Erro interno ao tentar cadastrar o produto.')
    }
}


const validar = function (novoDoce) {
    if (novoDoce.nome == undefined || !novoDoce.nome || novoDoce.nome.trim() === '' || novoDoce.nome == null) {
        alert('O nome do produto é obrigatório')
        return false
    }
    else if (novoDoce.categoria == undefined || !novoDoce.categoria) {
        alert('Selecione pelo menos uma categoria!')
        return false
    }
    else if (novoDoce.sabor == undefined || !novoDoce.sabores || novoDoce.sabores.length === 0) {
        alert('Selecione pelo menos um sabor!')
        return false
    }
    else (novoDoce.preco == undefined || !novoDoce.preco || isNaN(novoDoce.preco) || Number(novoDoce.preco) <= 0);{
        alert('Insira um preço válido e maior que zero!')
        return false
    }

    return true
}

// carregarItens()