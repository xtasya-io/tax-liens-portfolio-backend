require("dotenv").config()
const { Location } = require("../models");

/**
 * Get Location by user id
 * @param {Number} userId
 * @returns {Promise<Location>}
 */
const getUserLocation = async (userId) => {
    return Location.findOne({ user: userId })
}

/**
 * Create a new Location for user by id
 * @param {Number} userId
 * @param {object} locationData
 * @returns {Promise<Location>}
 */
const createNewLocationForUser = async (userId, locationData) => {
    locationData = Object.assign({
        ...locationData,
        user: userId
    })
    return Location.create(locationData)
}

/**
 * Update Location by user id
 * @param {Number} userId
 * @param {object} locationDtaa
 * @returns {Promise<Location>}
 */
const updateUserLocation = async (userId, locationData) => {

    let location = await getUserLocation(userId)

    if (location) {

        // Updating the location if exist
        return Location.update({
            locationData,
            where: { id: location.id }
        })

    } else {
        // Creating a new location if it doesn't exist
        return Location.createNewLocationForUser(userId, locationData)
    }
}

module.exports = {
    getUserLocation,
    updateUserLocation
}