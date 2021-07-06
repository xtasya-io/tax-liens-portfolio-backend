const { taxLiensService } = require("../services");
const catchAsync = require("../utils/catchAsync");
const httpStatus = require("http-status");

module.exports = {
  getTaxLiens: catchAsync(async (req, res) => {
    console.log("HEELOOOOO");
    let taxLiens = await taxLiensService.getTaxLiens();
    console.log(taxLiens);
    res.status(httpStatus.OK).send(taxLiens);
  }),

  createTaxLien: catchAsync(async (req, res) => {
    let taxLien = await taxLiensService.createTaxLien(req.body);
    if (taxLien) res.status(httpStatus.OK).send(taxLien.data);
  }),

  updateTaxLien: catchAsync(async (req, res) => {
    let taxLien = await taxLiensService.updateTaxLien(
      req.params.taxLienId,
      req.body
    );
    if (taxLien) res.status(httpStatus.OK).send(taxLien);
  }),

  deleteTaxLien: catchAsync(async (req, res) => {
    let deleted = await taxLiensService.deleteTaxLien(req.params.taxLienId);
    if (deleted > 0) res.status(httpStatus.OK).json({ message: "Deleted" });
  }),
};
