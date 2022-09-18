
const config = require('../config')
const model = require(config.models+'/message')
const accountModel = require(config.models+'/account')
const Controller = require(config.controllers+'/controller')
const ServiceClass = require(config.services+'/message-service')
const messageService = new ServiceClass(model);
const { Op } = require("sequelize");

const f = require(config.fonctions)

accountModel.belongsToMany(accountModel,{
    through: {
        model: model,
        unique: false
    },
    foreignKey: "sender_id",
    otherKey: "receiver_id",
    as: 'messages',
})
accountModel.belongsToMany(accountModel,{
    through: {
        model: model,
        unique: false
    },
    foreignKey: "receiver_id",
    otherKey: "sender_id",
    as: 'messages_',
})
  
class MessageController extends Controller {
  
    constructor(service) {
        super(service);
    }  

   

    async insert(req, res) {
       
        let sender = await accountModel.findOne({
            where: {
                email: res.locals.user.email
            }
        })

        let receiver = await accountModel.findByPk(req.body.identifier)


        if (!sender || !receiver) {
            return res.status(404).send("not found");
        }


        
        let response = await model.create({
            identifier: config.uuid.v4(),
            text: req.body.text,
            sender_id: sender.identifier,
            receiver_id: receiver.identifier
        }) 
        

        let acc = await model.findAll({
            raw: true,
            order: [
                ['createdAt', 'ASC']
            ],
            where: {
                [Op.or]: [
                    { sender_id: receiver.identifier },
                    { receiver_id: receiver.identifier }
                ]
            }
        })


        let accounts =  acc.map((a) => {
            return a
        });

        let conversations = new Map()
        let user_id = (receiver.identifier === accounts[0].sender_id) ? 
                        accounts[0].receiver_id : 
                        accounts[0].sender_id

        let user_ = await accountModel.findByPk(user_id)
        conversations.set(accounts[0].sender_id+'-'+accounts[0].receiver_id, {
            user: user_,
            messages: [f.parseMessage(accounts[0], receiver.identifier)]
        } )

        for(let i = 1; i < accounts.length; i++){
            const key1 = accounts[i].sender_id+'-'+accounts[i].receiver_id
            const key2 = accounts[i].receiver_id+'-'+accounts[i].sender_id

            if(conversations.has(key1)){
                let m = conversations.get(key1).messages
                m.push(f.parseMessage(accounts[i], receiver.identifier))
                const c = {
                    user: conversations.get(key1).user,
                    messages: m
                }
                conversations.set(key1, c)
            }else if(conversations.has(key2)){
                let m = conversations.get(key2).messages
                m.push(f.parseMessage(accounts[i], receiver.identifier))
                const c = {
                    user: conversations.get(key2).user,
                    messages: m
                }
                conversations.set(key2, c)
            }else{
                let user_id = (receiver.identifier === accounts[i].sender_id) ? 
                        accounts[i].receiver_id : 
                        accounts[i].sender_id
                let user_ = await accountModel.findByPk(user_id)
                conversations.set(key1, {
                    user: user_,
                    messages: [f.parseMessage(accounts[i], receiver.identifier)]
                })
            }
        }
        res.locals.io.emit(receiver.identifier, Array.from(conversations.values()))

        if (response.error) return res.status(response.statusCode).send(response);

        return res.status(201).send(response);
    } 

    async getAll(req, res){
        if(typeof res.locals.user !== 'undefined' && typeof res.locals.user.email !== 'undefined'){
            let user = await accountModel.findOne({
                where: {
                    email: res.locals.user.email
                }
            })
    
            let acc = await model.findAll({
                raw: true,
                order: [
                    ['createdAt', 'ASC']
                ],
                where: {
                    [Op.or]: [
                        { sender_id: user.identifier },
                        { receiver_id: user.identifier }
                    ]
                }
            })
    
    
            let accounts =  acc.map((a) => {
                return a
            });

            if(accounts.length === 0){
                return res.status(200).send([]);
            }
    
            let conversations = new Map()
            let user_id = (user.identifier === accounts[0].sender_id) ? 
                            accounts[0].receiver_id : 
                            accounts[0].sender_id
    
            let user_ = await accountModel.findByPk(user_id)
            conversations.set(accounts[0].sender_id+'-'+accounts[0].receiver_id, {
                user: user_,
                messages: [f.parseMessage(accounts[0], user.identifier)]
            } )
    
            for(let i = 1; i < accounts.length; i++){
                const key1 = accounts[i].sender_id+'-'+accounts[i].receiver_id
                const key2 = accounts[i].receiver_id+'-'+accounts[i].sender_id
    
                if(conversations.has(key1)){
                    let m = conversations.get(key1).messages
                    m.push(f.parseMessage(accounts[i], user.identifier))
                    const c = {
                        user: conversations.get(key1).user,
                        messages: m
                    }
                    conversations.set(key1, c)
                }else if(conversations.has(key2)){
                    let m = conversations.get(key2).messages
                    m.push(f.parseMessage(accounts[i], user.identifier))
                    const c = {
                        user: conversations.get(key2).user,
                        messages: m
                    }
                    conversations.set(key2, c)
                }else{
                    let user_id = (user.identifier === accounts[i].sender_id) ? 
                            accounts[i].receiver_id : 
                            accounts[i].sender_id
                    let user_ = await accountModel.findByPk(user_id)
                    conversations.set(key1, {
                        user: user_,
                        messages: [f.parseMessage(accounts[i], user.identifier)]
                    })
                }
            }
            res.locals.io.emit(user.identifier, Array.from(conversations.values()))
            return res.status(200).send(Array.from(conversations.values()));
        }

        return res.status(403).send();

        
    }
}
  
module.exports = new MessageController(messageService);

