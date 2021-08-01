const { User, TaxLien, Category } = require("../models");

module.exports = () => {

    // User to Category

    Category.hasMany(TaxLien)
    TaxLien.belongsTo(Category, {
        foreignKey: 'category'
    })

    // User to TaxLien

    User.hasMany(TaxLien)
    TaxLien.belongsTo(User, {
        foreignKey: 'user'
    })

    console.log('Association made successfuly')

}