const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const PORT = 3000
const cors = require('cors')

app.use(cors())

io.on('connection', (socket) => {
    console.log(`a user connected`)
    socket.on('slideIndex', (payload)=>{
        io.emit('slideIndex', payload)
    })
})

http.listen(PORT, () => {
    console.log(`listening on port`, PORT)
})