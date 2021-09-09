const { taxLiensService } = require("../services");
const catchAsync = require("../utils/catchAsync");
const httpStatus = require("http-status");

const getTaxLiens = catchAsync(async (req, res) => {
  let taxLiens = await taxLiensService.getTaxLiens();
  res.status(httpStatus.OK).send(taxLiens);
})

const getTaxLienById = catchAsync(async (req, res) => {
  let taxLien = await taxLiensService.getTaxLienById(req.params.id)
  res.status(httpStatus.OK).send(taxLien);
})

const createTaxLien = catchAsync(async (req, res) => {
  let taxLien = await taxLiensService.createTaxLien(req.body);
  res.status(httpStatus.OK).send(taxLien.data);
})

const updateTaxLien = catchAsync(async (req, res) => {
  let taxLien = await taxLiensService.updateTaxLien(
    req.params.id,
    req.body
  );
  res.status(httpStatus.OK).send(taxLien);
})

const deleteTaxLien = catchAsync(async (req, res) => {
  let deleted = await taxLiensService.deleteTaxLien(req.params.id);
  if (deleted > 0) res.status(204).json({ message: "Deleted" });
})

const getTaxLiensByUser = catchAsync(async (req, res) => {
  let taxLiens = await taxLiensService.getTaxLiens(
    { user: req.params.id },
    // { exclude: ["userId", "createdAt", "updatedAt"] }
  )
  res.status(httpStatus.OK).json(taxLiens)
})

const markTaxlienAsActive = catchAsync(async (req, res) => {
  await taxLiensService.markTaxlienAsActive(req.params.id)
  res.status(httpStatus.ACCEPTED).end()
})

const markTaxlienAsOverdue = catchAsync(async (req, res) => {
  await taxLiensService.markTaxlienAsOverdue(req.params.id)
  res.status(httpStatus.ACCEPTED).end()
})

const getTaxLiensCharts = catchAsync(async (req, res) => {
  let result = taxLiensService.getTaxLiensCharts(req.params.id)
  res.status(httpStatus.OK).json(result)
})

module.exports = {
  getTaxLiens,
  getTaxLienById,
  createTaxLien,
  updateTaxLien,
  deleteTaxLien,
  getTaxLiensByUser,
  markTaxlienAsActive,
  markTaxlienAsOverdue,
  getTaxLiensCharts
}
