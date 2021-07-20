const { TaxLien, Category } = require("../models");
const repository = require("../repositories/base.repository");

module.exports = {
  /**
   * Get attributes from TaxLiens where filter
   * @param {object} filter
   * @param {Array<string>} attributes
   * @returns {Promise<{count: number, rows: TaxLien[]}>}
   */
  getTaxLiens: async (filter = {}, attributes = ["purchaseDate", "state", "county", "certificate", "interest", "investment"]) => {
    return TaxLien.findAndCountAll({
      where: filter,
      attributes,
      include: [{ model: Category, attributes: ["title", "code"] }]
    });
  },
  /**
   * Create a new Taxliens
   * @param {object}
   * @returns {Promise<TaxLien>}
   */
  createTaxLien: async ({ purchaseDate, state, county, certificate, interest, propertyType, investment, userId }) => {
    return repository.create(TaxLien, {
      purchaseDate: purchaseDate,
      state: state,
      county: county,
      certificate: certificate,
      interest: interest,
      investment: investment,
      category: propertyType,
      user: userId
    });
  },

  /**
   * Update TaxLiens
   * @param {string} taxLienId
   * @param {object} taxLienData
   * @returns {Promise<TaxLien>}
   */
  updateTaxLien: async (taxLienId, taxLienData) => {
    return repository.update(TaxLien, { id: taxLienId }, taxLienData);
  },
  /**
   * Delete a TaxLiens
   * @param {string} taxLienId
   * @returns {Promise<number>}
   */
  deleteTaxLien: async (taxLienId) => {
    return repository.delete(TaxLien, { id: taxLienId });
  },

  /**
   * Get one TaxLien by id
   * @param {string} taxLienId
   * @returns {Promise<TaxLien>}
   */
  getTaxLienById: async (taxLienId) => {
    return repository.findOne(TaxLien, { id: taxLienId })
  }
};
