const { Admin, User, TaxLien, Category } = require("../models");

module.exports = () => {

    Category.hasMany(TaxLien, {
        foreignKey: 'categoryId'
    })

    TaxLien.belongsTo(Category)

    User.hasMany(TaxLien, {
        foreignKey: "userId"
    })

    TaxLien.belongsTo(User)

}