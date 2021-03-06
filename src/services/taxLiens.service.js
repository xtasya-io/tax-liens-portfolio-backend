const { TaxLien, Category } = require("../models");
const repository = require("../repositories/base.repository");

module.exports = {
  /**
   * Get attributes from TaxLiens where filter
   * @param {object} filter
   * @param {Array<string>} attributes
   * @returns {Promise<{count: number, rows: TaxLien[]}>}
   */
  getTaxLiens: async (
    filter = {},
    attributes = ["id", "purchaseDate", "state", "county", "certificate", "interest", "investment", "status"]
  ) => {
    let taxliens = await TaxLien.findAll({
      where: filter,
      attributes,
      include: [{ model: Category, attributes: ["title", "code"] }]
    })
    return taxliens
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
  },

  /**
   * Mark TaxLien as active
   * @param {string} taxLienId
   * @returns {Promise<TaxLien>}
   */
  markTaxlienAsActive: async (taxLienId) => {
    return TaxLien.update({ status: "active" }, { where: { id: taxLienId } })
  },

  /**
   * Mark TaxLien as overdue
   * @param {string} taxLienId
   * @returns {Promise<TaxLien>}
   */
  markTaxlienAsOverdue: async (taxLienId) => {
    return TaxLien.update({ status: "overdue" }, { where: { id: taxLienId } })
  },

  /**
   * Get taxliens charts
   * @param {string} userId
   * @returns {Promise<TaxLien>}
   */
  getTaxLiensCharts: async (userId) => {

    let response = {}
    response.total = await TaxLien.count({ where: { user: userId } })

    const today = new Date()
    const thisYear = today.getFullYear()
    const thisMonth = today.getMonth()


    let startDate = new Date(`${thisMonth}-1-${thisYear}`)
    let endDate = today;
    response.taxLiens = await TaxLien.findAll({
      where: {
        purchaseDate: {
          between: [startDate, endDate]
        }
      }
    })

    return response
  }

};
