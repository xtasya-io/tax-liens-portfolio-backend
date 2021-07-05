module.exports = {

    findAll: (model) => {
        return model.findAndCountAll()
    },

    find: (model, filter, attributes) => {
        return model.findAndCountAll(filter, attributes)
    },

    findOne: (model, filter, attributes) => {
        return model.findOne({ where: filter }, { attributes: [attributes] })
    },

    create: (model, data) => {
        return model.create(data)
    },

    update: (model, filter, data) => {
        return model.update(data, { where: filter })
    },

    delete: (model, filter) => {
        return model.destroy({ where: filter })
    },

    deleteMultiple: (model, filter) => {
        return model.destroy({ where: filter })
    }
}