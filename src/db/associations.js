const { User, TaxLien, Category, Location } = require("../models");

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

    // User to Location

    User.hasOne(Location, {
        foreignKey: 'location',
        constraints: false,
        allowNull: true,
        defaultValue: null
    })
    User.belongsTo(Location)

    // Taxlien to Location

    TaxLien.hasOne(Location, {
        foreignKey: 'location',
        constraints: false,
        allowNull: true,
        defaultValue: null
    })
    TaxLien.belongsTo(Location)


    console.log('Association made successfuly')

}