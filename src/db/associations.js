const { User, TaxLien, Category, Location } = require("../models");

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

    User.hasOne(Location, {
        as: "location"
    })
    TaxLien.belongsTo(Location)

    console.log("Association made successfuly")

}