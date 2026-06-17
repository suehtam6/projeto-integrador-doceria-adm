'use strict'

import { cadastrarCategoria } from "./pages/tela_cadastro_categoria.js"
import { cadastrarSabor } from "./pages/tela_cadastro_sabor.js"
import { cadastrarDoce } from "./pages/telas_cadastro_doce.js"
import { criarPreview } from "./pages/preview.js"
import { cadastroADM } from "./pages/tela_cadastro_adm.js"
import { criarLogin } from "./pages/tela_logar_adm.js"

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
    },
    cadastroADM:{
        titulo: 'CADASTRAR ADM',
        renderizar: cadastroADM
    },
    criarLogin:{
        titulo: 'LOGAR',
        renderizar: criarLogin
    }
}

export function renderizarPagina(cadastro){
    const pagina = paginas[cadastro].renderizar()
    document.getElementById('main').replaceChild(pagina)
}   


renderizarPagina('criarLogin')

