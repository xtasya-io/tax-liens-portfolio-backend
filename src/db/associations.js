const { User, TaxLien, Category, Payment } = require("../models");

module.exports = () => {

    // TaxLien to Category

    Category.hasMany(TaxLien)
    TaxLien.belongsTo(Category, {
        foreignKey: 'category'
    })

    // User to TaxLien

    User.hasMany(TaxLien)
    TaxLien.belongsTo(User, {
        foreignKey: 'user'
    })

    // User to Payment

    User.hasOne(Payment)
    Payment.belongsTo(User, {
        foreignKey: 'user'
    })

    console.log('Association made successfuly')

}