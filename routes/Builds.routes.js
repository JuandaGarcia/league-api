const express = require('express')
const builds = express.Router()
const cors = require('cors')

const Build = require('../models/Build')
builds.use(cors())

builds.post('/', (req, res) => {
	const BuildData = {
		nombre: req.body.nombre,
		emailUsuario: req.body.emailUsuario,
		items: req.body.items,
	}

	Build.create(BuildData)
		.then((build) => {
			Build.find({
				emailUsuario: req.body.emailUsuario,
			})
				.then((builds) => {
					res.status(200).json(builds)
				})
				.catch((err) => {
					res.status(500).send('error: ' + err)
				})
		})
		.catch((err) => {
			res.status(500).send('error: ' + err)
		})
})

builds.get('/:email', (req, res) => {
	Build.find({
		emailUsuario: req.params.email,
	})
		.then((builds) => {
			res.status(200).json(builds)
		})
		.catch((err) => {
			res.status(500).send('error: ' + err)
		})
})

builds.put('/', (req, res) => {
	Build.update(
		{ _id: req.body.id },
		{
			$set: {
				nombre: req.body.nombre,
				items: req.body.items,
			},
		}
	)
		.then((build) => {
			Build.find({
				emailUsuario: req.body.emailUsuario,
			})
				.then((builds) => {
					res.status(200).json(builds)
				})
				.catch((err) => {
					res.status(500).send('error: ' + err)
				})
		})
		.catch((err) => {
			res.status(500).send('error: ' + err)
		})
})

builds.delete('/:id/:email', (req, res) => {
	Build.deleteOne({ _id: req.params.id })
		.then((build) => {
			Build.find({
				emailUsuario: req.params.email,
			})
				.then((builds) => {
					res.status(200).json(builds)
				})
				.catch((err) => {
					res.status(500).send('error: ' + err)
				})
		})
		.catch((err) => {
			res.status(500).send('error: ' + err)
		})
})

module.exports = builds
