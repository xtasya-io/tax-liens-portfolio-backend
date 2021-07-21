const { User, TaxLien, Category } = require("../models");

module.exports = () => {

    Category.hasMany(TaxLien, {
        as: 'category'
    })
    TaxLien.belongsTo(Category, {
        foreignKey: "category"
    })

    User.hasMany(TaxLien, {
        as: "user"
    })
    TaxLien.belongsTo(User)

    console.log("Association made successfuly")

}