const { response } = require('express')
const express = require('express')
const router = express.Router()
const {
    models: { Movies },
} = require('../db')

router.get('/', async (request, response, next) => {
    try {
        const movies = await Movies.findAll()
        response.json(movies)
    } catch (err) {
        next(err)
    }
})

router.get('/:id', async (request, response, next) => {
    try {
        const movie = await Movies.findByPk(request.params.id)
        if (!movie) {
            response.sendStatus(404)
        } else {
            response.json(movie)
        }
    } catch (error) {
        next(error)
    }
})

module.exports = router
