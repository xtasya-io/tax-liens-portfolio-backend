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
};
