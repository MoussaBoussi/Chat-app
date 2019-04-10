"use strict"

const socket = io()

document.querySelector("#message_form").addEventListener('submit', (e) => {
    e.preventDefault()

    const message = e.target.elements.message.value

    socket.emit("sendMessage", message)
})

socket.on('message', (message) => {
    console.log(message)
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