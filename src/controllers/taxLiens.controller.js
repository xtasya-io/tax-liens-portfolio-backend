const { taxLiensService } = require("../services");
const catchAsync = require("../utils/catchAsync");
const httpStatus = require("http-status");
const { TaxLien } = require("../models");

module.exports = {
  getAllTaxLiens: catchAsync(async (req, res) => {
    let taxLiens = await taxLiensService.getTaxLiens();
    res.status(httpStatus.OK).send(taxLiens);
  }),

  getTaxLienById: catchAsync(async (req, res) => {
    let taxLien = await taxLiensService.getTaxLienById(req.params.id);
    console.log(taxLien)
    res.status(httpStatus.OK).send(taxLien)
  }),

  createTaxLien: catchAsync(async (req, res) => {
    let taxLien = await taxLiensService.createTaxLien(req.body);
    if (taxLien) res.status(httpStatus.OK).send(taxLien.data);
  }),

  updateTaxLien: catchAsync(async (req, res) => {
    let taxLien = await taxLiensService.updateTaxLien(
      req.params.id,
      req.body
    );
    if (taxLien) res.status(httpStatus.OK).send(taxLien);
  }),

  deleteTaxLien: catchAsync(async (req, res) => {
    let deleted = await taxLiensService.deleteTaxLien(req.params.id);
    if (deleted > 0) res.status(204).json({ message: "Deleted" });
  }),
};
