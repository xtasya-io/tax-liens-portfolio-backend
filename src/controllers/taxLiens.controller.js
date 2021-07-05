const { taxLiensService } = require("../services");
const catchAsync = require("../utils/catchAsync");
const httpStatus = require("http-status");

module.exports = {
  getAllTaxLiens: catchAsync(async (req, res) => {
    let taxLiens = await taxLiensService.getTaxLiens();
    res.status(httpStatus.OK).send(taxLiens);
  }),
};
