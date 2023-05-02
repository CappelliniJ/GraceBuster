const Sequelize = require("sequelize");
const db = require("../db");

const Movies = db.define('Movies', {
    Title: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: true,
        },
    },
    Genre: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: true,
        },
    },
    Director: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: true,
        },
    },
    LeadActor: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: true,
        },
    },
    Description: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: true,
        },
    },
    Price: {
        type: Sequelize.DECIMAL,
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: true,
        },
    },
    ImageUrl: {
        type: Sequelize.STRING,
        defaultValue: 'https://thechive.com/wp-content/uploads/2019/12/person-hilariously-photoshops-animals-onto-random-things-xx-photos-25.jpg?attachment_cache_bust=3136487&quality=85&strip=info&w=400',
    },
});

module.exports = Movies;