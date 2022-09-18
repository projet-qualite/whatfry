module.exports = {
    'root': __dirname,
    'assets': __dirname+'/assets',
    'controllers': __dirname+'/controllers',
    'services': __dirname+'/services',
    'models': __dirname+'/utils/models',
    'express': require('express'),
    'uuid': require('uuid'),
    'crypto': require('pbkdf2'),
    'jwt': require('jsonwebtoken'),
    'fonctions': __dirname+'/utils/functions.js'
}
