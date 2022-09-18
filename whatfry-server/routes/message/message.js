const config = require('../../config')

const MessageController = require(config['controllers']+'/message-controller')
const expressRouter = config.express.Router()
const bodyParser = require('body-parser');
const customError = require('../middlewares')

var jsonParser = bodyParser.json()


expressRouter.post('/sendmessage', 
    jsonParser, 
    customError.verifyToken(config.jwt),
    MessageController.insert
)
expressRouter.get('/', 
    jsonParser, 
    customError.verifyToken(config.jwt),
    MessageController.getAll
)
expressRouter.put('/update',jsonParser,MessageController.update)
expressRouter.delete('/delete',jsonParser, MessageController.delete)


module.exports = expressRouter
