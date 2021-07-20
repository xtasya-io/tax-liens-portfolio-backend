const { User, TaxLien, Category } = require("../models");

module.exports = () => {

    Category.hasMany(TaxLien, {
        foreignKey: 'category'
    })
    TaxLien.belongsTo(Category)

    User.hasMany(TaxLien, {
        foreignKey: "user"
    })
    TaxLien.belongsTo(User)

}