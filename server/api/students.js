'use strict'

const express = require('express')
const router = express.Router()
const db = require('../db')
const Student = db.model('student')
const Campus = db.model('campus')

module.exports = router

router.get('/', (req, res, next) => {
    Student.findAll({ where: req.query })
    .then(students => res.json(students))
    .catch(next)
})

// router.param('studentId', function (req, res, next, id) {
//     Student.findById(id)
//     .then(student => {
//       if (!student) {
//         const err = Error('student not found');
//         err.status = 404;
//         throw err
//       }
//       req.student = student;
//       next();
//       return null;
//     })
//     .catch(next);
//   });
  
// router.get('/:studentId', function (req, res) {
//     res.json(req.student);
// });

router.post('/', (req, res, next) => {
  Student.create(req.body)
  .then(newStudent => res.json(newStudent))
  .catch(next)
})

router.get('/:studentId', (req, res, next) => {
  Student.findById( req.params.studentId )
  .then(student => {
    if (student) res.json(student)
    else res.sendStatus(500)
  })
  .catch(next)
})

router.put('/:studentId', (req, res, next) => {
  Student.findById(req.body.id)
  .then(student => student.update(req.body))
  .then(updatedStudent => {
    res.json(updatedStudent)}
  )
  .catch(next)
})

router.delete('/:studentId', (req, res, next) => {
  Student.findById(req.params.studentId)
  .then(student => {
    const studentName = student.name
    student.destroy()
    return studentName
  })
  .then(studentName => {
    res.json(studentName)})
  .catch(next)
})


module.exports = router

