const accountRouter = require('./account/account')
const messageRouter = require('./message/message')
const fileUpload = require('express-fileupload')
 

const routes = (app, io) => {
    app.use(fileUpload())
	app.use("/account", accountRouter)
	app.use(
		"/message",
		(req, res, next)=>{
			res.locals.io = io
			next()
		},
	 	messageRouter
	)
}

module.exports = routes
