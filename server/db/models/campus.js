'use strict'

const db = require('../index')
const Sequelize = db.Sequelize

const Campus = db.define('campus', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    imgUrl: {
        type: Sequelize.STRING,
        defaultValue: 'https://d3i6fh83elv35t.cloudfront.net/static/2017/09/GettyImages-827631664-1024x695.jpg'
    },
    description: {
        type: Sequelize.TEXT
    }
})

module.exports = Campus