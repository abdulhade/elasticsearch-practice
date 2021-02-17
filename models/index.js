const {Sequelize, Model, DataTypes} = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite',
    logging: false
});

class Book extends Model {}

Book.init({
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    rating: DataTypes.DECIMAL,
    voters: DataTypes.INTEGER,
    price: DataTypes.DECIMAL,
    currency: DataTypes.STRING,
    description: DataTypes.STRING,
    publisher: DataTypes.STRING,
    page_count: DataTypes.INTEGER,
    generes: DataTypes.STRING,
    ISBN: DataTypes.STRING,
    language: DataTypes.STRING,
    published_date: DataTypes.DATE
}, {sequelize, modelName: 'Book'});

(async () => await sequelize.sync())();

module.exports = {Book};