
const config = require('../config')
const model = require(config.models+'/account')
const Controller = require(config.controllers+'/controller')
const ServiceClass = require(config.services+'/account-service')
const accountService = new ServiceClass(model);
const { Op } = require("sequelize");
  
class AccountController extends Controller {
  
    constructor(service) {
        super(service);
    }  

    async getAll(req, res){
      let response = await model.findAll({
        attributes: ['identifier', 'firstname', 'lastname', 'photo'],
        where: {
          email: {
            [Op.not]: res.locals.user.email,
          }
        }
      })
      console.log(response.error)
      if (response.error) return res.status(response.statusCode).send(response);

      return res.status(200).send(response);
    }

    async insert(req, res) {

        req.body.identifier = config.uuid.v4();
        req.body.password = config.crypto.pbkdf2Sync(req.body.password, 'salt', 1, 32, 'sha512').toString('hex')
    
        let response = await this.service.insert(req.body);
        if (response.error) return res.status(response.statusCode).send(response);
    
        return res.status(201).send(response);
    
      }

    async login(req, res) {
        let account = await model.findOne({
          where: {
            email: req.body.email,
            password: config.crypto.pbkdf2Sync(req.body.password, 'salt', 1, 32, 'sha512').toString('hex')
          }
        })
        if (!account) {
          return res.status(403).send({code: '1'});
        }
    
        const token = config.jwt.sign({ email: account.email }, process.env.TOKEN_SECRET, { expiresIn: '1296000s' });
        return res.status(200).json({ token, identifier: account.identifier })
    }

    async getUser(req, res){
      let account = await model.findOne({
        attributes: ['identifier', 'firstname', 'lastname', 'photo'],
        where: {
          email: res.locals.user.email,
        }
      })
      if (!account) {
        return res.status(404).json({ "msg": 'not found' });
      }
      return res.status(200).json(account)
    }
}
  
module.exports = new AccountController(accountService);

