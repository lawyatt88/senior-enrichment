'use strict'

const express = require('express')
const router = express.Router()
const db = require('../db')
const Student = db.model('student')
const Campus = db.model('campus')

module.exports = router

router.get('/', (req, res, next) => {
    Campus.findAll({ where: req.query })
    .then(campuses => res.json(campuses))
    .catch(next)
})

router.post('/', (req, res, next) => {
    console.log('I AM HERE!', req.body)
    Campus.create(req.body)
    .then(campus => res.json(campus))
    .catch(next)
})

router.put('/:campusId', (req, res, next) => {
    Campus.findById(req.body.id)
    .then(campus => campus.update(req.body))
    .then(updatedCampus => res.json(updatedCampus))
    .catch(next)
})

router.delete('/:campusId', (req, res, next) => {
    console.log('i made it to the server!', req.params.campusId)
    Campus.findById(req.params.campusId)
    .then(campus => {
      const campusName = campus.name
      campus.destroy()
      return campusName
    })
    .then(campusName => {
      res.json(campusName)})
    .catch(next)
  })

module.exports = router
