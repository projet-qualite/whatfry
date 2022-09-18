
const db = require('../database/db')
const sequelize = db.sequelize

class Message extends db.Model {}

Message.init({
    identifier: {
        type: db.DataTypes.UUID,
        primaryKey: true
    },
    date: {
        type: db.DataTypes.DATE,
        defaultValue: db.DataTypes.NOW
    },
    text: {
        type: db.DataTypes.STRING,
        allowNull: false
    }
   
}, {
    sequelize,
    modelName: 'message'
})

module.exports = Message

