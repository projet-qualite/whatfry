const { Sequelize, DataTypes, Model } = require('sequelize')
const dotenv = require('dotenv')
dotenv.config()


const sequelize = new Sequelize(
    process.env.DATABASE_NAME, process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {
        host: 'localhost',
        dialect: 'mysql'
})

exports.sequelize = sequelize
exports.DataTypes = DataTypes
exports.Model = Model
