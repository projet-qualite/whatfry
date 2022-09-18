(async () => {

	const account = require('../models/account')
	await account.sync()

	const message = require('../models/message')
	account.belongsToMany(account,{
		through: {
			model: message,
			unique: false
		},
		foreignKey: "sender_id",
		otherKey: "receiver_id",
		as: 'messages',
	})
	account.belongsToMany(account,{
		through: {
			model: message,
			unique: false
		},
		foreignKey: "receiver_id",
		otherKey: "sender_id",
		as: 'messages_',
	})
	await message.sync()
})()
