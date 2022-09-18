const express = require('express')
const app = express()
const dotenv = require('dotenv')
const routes = require('./routes/index')
const cors = require('cors')
dotenv.config()

const server = require('http').Server(app)
const io = require('socket.io')(server, {
    cors:true,
    origins:["http://localhost:4200"],
   }
)
app.use(express.static('public'))
app.use(cors())
app.get('/', function (req, res) {
   res.sendFile('index.html', { root: __dirname })
})


io.on('connection', (socket) => {
    console.log(`connecté au client: ${socket.id}`)
})

routes(app, io)


server.listen(process.env.PORT, () => {
    console.log('Server started')
})
