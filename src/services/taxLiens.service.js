const { TaxLien } = require("../models");
const repository = require("../repositories/base.repository");

module.exports = {
  /**
   * Get attributes from TaxLiens where filter
   * @param {object} filter
   * @param {Array<string>} attributes
   * @returns {Promise<{count: number, rows: TaxLien[]}>}
   */
  getTaxLiens: async (filter = {}, attributes = []) => {
    return repository.find(
      TaxLien,
      { where: filter },
      { attributes: attributes }
    );
  },
  /**
   * Create a new Taxliens
   * @param {object}
   * @returns {Promise<TaxLien>}
   */
  createTaxLien: async (data) => {
    return repository.create(TaxLien, data);
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
