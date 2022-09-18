
const db = require('../database/db')
const sequelize = db.sequelize

class Account extends db.Model {}

Account.init({
    identifier: {
        type: db.DataTypes.UUID,
        primaryKey: true
    },

    lastname: {
        type: db.DataTypes.STRING,
        allowNull: false
    },

    firstname: {
        type: db.DataTypes.STRING,
        allowNull: false
    },

    email: {
        type: db.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },

    password: {
        type: db.DataTypes.STRING,
        allowNull: false,
        validate: {
            len: 8
        }
    },

    photo: {
        type: db.DataTypes.STRING,
        allowNull: false,
        defaultValue: "default.png"
    },

   
}, {
    sequelize,
    modelName: 'account'
})

module.exports = Account

