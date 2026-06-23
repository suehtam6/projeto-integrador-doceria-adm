'use strict'

import { cadastrarCategoria } from "./pages/tela_cadastro_categoria.js"
import { cadastrarSabor } from "./pages/tela_cadastro_sabor.js"
import { iniciarCadastroDoce } from "./pages/telas_cadastro_doce.js"
import { iniciarPreview } from "./pages/preview.js"
import { cadastroADM } from "./pages/tela_cadastro_adm.js"
import { criarLogin } from "./pages/tela_logar_adm.js"

const paginas = {
    preview: {
        titulo: 'TELA PRINCIPAL',
        renderizar: iniciarPreview
    },
    categoria: {
        titulo: 'CRIAR CATEGORIAS',
        renderizar: cadastrarCategoria
    },
    sabor: {
        titulo: 'CRIAR SABOR',
        renderizar: cadastrarSabor
    },
    doce: {
        titulo: 'CRIAR DOCE',
        renderizar: iniciarCadastroDoce
    },
    cadastroADM: {
        titulo: 'CADASTRAR ADM',
        renderizar: cadastroADM
    },
    criarLogin: {
        titulo: 'LOGAR',
        renderizar: criarLogin
    }
}

export function renderizarPagina(cadastro) {
    paginas[cadastro].renderizar()
}

renderizarPagina('cadastroADM')