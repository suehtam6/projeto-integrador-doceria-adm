'use strict'

import { cadastrarCategoria } from "./pages/tela_cadastro_categoria.js"
import { cadastrarSabor } from "./pages/tela_cadastro_sabor.js"
import { cadastrarDoce } from "./pages/telas_cadastro_doce.js"
import { criarPreview } from "./pages/preview.js"

const paginas = {
    preview:{
        titulo: 'TELA PRINCIPAL',
        renderizar: criarPreview
    },
    categoria:{
        titulo: 'CRIAR CATEGORIAS',
        renderizar: cadastrarCategoria
    },
    sabor:{
        titulo: 'CRIAR SABOR',
        renderizar: cadastrarSabor
    },
    doce:{
        titulo: 'CRIAR DOCE',
        renderizar: cadastrarDoce
    }
}

export function renderizarPagina(nomePagina){
    const pagina = paginas[nomePagina].renderizar()
    document.getElementById('main').replaceChild(pagina)
}   


renderizarPagina('preview')

