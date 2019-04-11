"use strict"

const socket = io()
const $messageForm = document.querySelector("#message_form")
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
const $messages = document.querySelector('#messages')

// Templates
const messageTemplate = document.querySelector('#message-template').innerHTML

$messageForm.addEventListener('submit', (e) => {
    e.preventDefault()

    

    const message = e.target.elements.message.value

    socket.emit("sendMessage", message)
    $messageFormInput.value = ""
    $messageFormInput.focus()
})

socket.on('message', (message) => {
    console.log(message)
    const html = Mustache.render(messageTemplate, { message })
    $messages.insertAdjacentHTML('beforeend', html)
})

document.querySelector('#send_location').addEventListener('click', () => {
    if (!navigator.geolocation) {
        return
    }

    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    })
})