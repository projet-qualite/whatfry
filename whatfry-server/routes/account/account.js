const config = require('../../config')

const AccountController = require(config['controllers']+'/account-controller')
const expressRouter = config.express.Router()
const bodyParser = require('body-parser');
const customError = require('../middlewares')
 
var jsonParser = bodyParser.json()


expressRouter.post('/create', jsonParser, AccountController.insert)
expressRouter.get('/', customError.verifyToken(config.jwt), AccountController.getAll)
expressRouter.get('/user', customError.verifyToken(config.jwt),AccountController.getUser)
expressRouter.post('/login', jsonParser, AccountController.login)
expressRouter.put('/update',jsonParser,AccountController.update)
expressRouter.delete('/delete',jsonParser, AccountController.delete)


module.exports = expressRouter
