const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BuildSchema = new Schema({
	nombre: {
		type: String,
		required: true,
	},
	emailUsuario: {
		type: String,
		required: true,
	},
	items: [],
})

module.exports = Build = mongoose.model('build', BuildSchema)
