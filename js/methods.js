'use strict'

// const URL = 



const URLDOCE = 'http://localhost:3000/doces'

const URLSABOR = 'http://localhost:3000/sabores'

const URLCATEGORIA = 'http://localhost:3000/categorias'


// Exportando as funções da categoria para serem utilizadas em outros arquivos,
//  como por exemplo na tela de cadastro de doces, onde preciso pegar as categorias para mostrar para o usuário.    

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



