'use strict'



const URLDOCE       = 'https://backend-honeyducks-1.onrender.com/v1/honeyducks/doceria/doce'

const URLSABOR      = 'https://backend-honeyducks-1.onrender.com/v1/honeyducks/doceria/sabor'

const URLCATEGORIA  = 'https://backend-honeyducks-1.onrender.com/v1/honeyducks/doceria/categoria'

const URLESTOQUE    = 'https://backend-honeyducks-1.onrender.com/v1/honeyducks/doceria/status'

const URLADM        = 'https://backend-honeyducks-1.onrender.com/v1/honeyducks/doceria/usuario'


// Exportando as funções da categoria para serem utilizadas em outros arquivos,
//  como por exemplo na tela de cadastro de doces, onde preciso pegar as categorias para mostrar para o usuário.    

//Metodos para utilizar na categorias
export async function getCategorias() {
    const response = await fetch(`${URLCATEGORIA}`)
    return response.json()
}

export async function getCategoria(id) {

    const response = await fetch(`${URLCATEGORIA}/${id}`)
    return response.json()
}

export async function postCategoria(categoria) {

    //Configurações para utilizar no fetch junto com a URL
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(categoria)
    }

    const response = await fetch(`${URLCATEGORIA}`, options)
    return response.json()
}

export async function deleteCategoria(id) {

    const options = {
        method: "DELETE"
    }

    const response = await fetch(`${URLCATEGORIA}/${id}`, options)
    return response.json()
}

export async function putCategoria(id, categoria) {

    //Configurações para utilizar o PUT
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(categoria) // Aqui estou convertendo o meu objeto em uma string para enviar para a API

    }

    const response = await fetch(`${URLCATEGORIA}/${id}`, options)
    return response.json()

}

// Exportando as funções do sabor para serem utilizadas em outros arquivos,
//  como por exemplo na tela de cadastro de doces, onde preciso pegar os sabores para mostrar para o usuário.

//Metodos para utilizar no sabor
export async function getSabores() {
    const response = await fetch(`${URLSABOR}`)
    return response.json()
}

export async function getSabor(id) {

    const response = await fetch(`${URLSABOR}/${id}`)
    return response.json()
}

export async function postSabor(sabor) {

    //Configurações para utilizar no fetch junto com a URL
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(sabor)
    }

    const response = await fetch(`${URLSABOR}`, options)
    return response.json()
}

export async function deleteSabor(id) {

    const options = {
        method: "DELETE"
    }   

    const response = await fetch(`${URLSABOR}/${id}`, options)
    return response.json()
}           

export async function putSabor(id, sabor) {

    //Configurações para utilizar o PUT
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(sabor) // Aqui estou convertendo o meu objeto em uma string para enviar para a API

    }

    const response = await fetch(`${URLSABOR}/${id}`, options)
    return response.json()  
}

// Exportando as funções do doce para serem utilizadas em outros arquivos,
//  como por exemplo na tela de cadastro de doces, onde preciso pegar os doces para mostrar para o usuário.

// Metodos para usar no doce
export async function getDoces() {
    const response = await fetch(`${URLDOCE}`)
    return response.json()
}   

export async function getDoce(id) {

    const response = await fetch(`${URLDOCE}/${id}`)
    return response.json()
}

export async function postDoce(doce) {

    //Configurações para utilizar no fetch junto com a URL
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(doce)
    }

    const response = await fetch(`${URLDOCE}`, options)
    return response.json()
}

export async function deleteDoce(id) {

    const options = {
        method: "DELETE"
    }

    const response = await fetch(`${URLDOCE}/${id}`, options)
    return response.json()
}

export async function putDoce(id, doce) {

    //Configurações para utilizar o PUT
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(doce) // Aqui estou convertendo o meu objeto em uma string para enviar para a API

    }

    const response = await fetch(`${URLDOCE}/${id}`, options)
    return response.json()  
}

// Metodos para usar no estoque

export async function getEstoques() {
    const response = await fetch(`${URLESTOQUE}`)
    return response.json()
}   

export async function getEstoque(id) {

    const response = await fetch(`${URLESTOQUE}/${id}`)
    return response.json()
}

export async function postEstoque(estoque) {

    //Configurações para utilizar no fetch junto com a URL
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(estoque)
    }

    const response = await fetch(`${URLESTOQUE}`, options)
    return response.json()
}

export async function deleteEstoque(id) {

    const options = {
        method: "DELETE"
    }

    const response = await fetch(`${URLESTOQUE}/${id}`, options)
    return response.json()
}

export async function putEstoque(id, estoque) {

    //Configurações para utilizar o PUT
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(estoque) // Aqui estou convertendo o meu objeto em uma string para enviar para a API

    }

    const response = await fetch(`${URLESTOQUE}/${id}`, options)
    return response.json()  
}

// Metodos para usar no ADM

export async function getADMs() {
    const response = await fetch(`${URLADM}`)
    return response.json()
}   

export async function getADM(id) {

    const response = await fetch(`${URLADM}/${id}`)
    return response.json()
}

export async function postADM(adm) {

    //Configurações para utilizar no fetch junto com a URL
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(adm)
    }

    const response = await fetch(`${URLADM}`, options)
    return response.json()
}

export async function deleteADM(id) {

    const options = {
        method: "DELETE"
    }

    const response = await fetch(`${URLADM}/${id}`, options)
    return response.json()
}

export async function putADM(id, adm) {

    //Configurações para utilizar o PUT
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(adm) // Aqui estou convertendo o meu objeto em uma string para enviar para a API

    }

    const response = await fetch(`${URLADM}/${id}`, options)
    return response.json()  
}

