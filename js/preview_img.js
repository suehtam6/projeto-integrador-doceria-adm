'use strict'

import { uploadParaCloudinary } from './cloudinay.js'



async function enviarFoto() {
        const input = document.getElementById('preview-input')
        const linkPublico = await uploadParaCloudinary(input.files[0])
        console.log('Link público da imagem:', linkPublico)
}

// Mostrando no input a imagem que desejo salvar na tela, devo utilizar o " change " para fazer isto.
document.getElementById('preview-input')
        .addEventListener('change', preview)

// Salvando a imagem dentro do storage  
document.getElementById('upload-button')
        .addEventListener('click', enviarFoto)