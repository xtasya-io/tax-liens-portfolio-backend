require("dotenv").config()
const { Location, User } = require("../models");

/**
 * Get Location by user id
 * @param {Number} userId
 * @returns {Promise<Location>}
 */
const getUserLocation = async (userId) => {
    // return User.findOne({ 
    //     where: { user: userId },
    //     attributes: ['location'],

    // })
    return User.getLocation({
        where: { user: userId }
    })
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
        return createNewLocationForUser(userId, locationData)
    }
}

module.exports = {
    getUserLocation,
    updateUserLocation
}