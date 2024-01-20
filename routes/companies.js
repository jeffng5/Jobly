"use strict";

/** Routes for companies. */

const jsonschema = require("jsonschema");
const express = require("express");
const { ensureCorrectUserOrAdmin, ensureLoggedIn, ensureAdmin, authenticateJWT } = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const Company = require("../models/company");

const companyNewSchema = require("../schemas/companyNew.json");
const companyUpdateSchema = require("../schemas/companyUpdate.json");

const router = new express.Router();


/** POST / { company } =>  { company }
 *
 * company should be { handle, name, description, numEmployees, logoUrl }
 *
 * Returns { handle, name, description, numEmployees, logoUrl }
 *
 * Authorization required: login
 */

router.post("/", async function (req, res, next) {
  console.log(res.locals.user)
  // try {
  //   const validator = jsonschema.validate(req.body, companyNewSchema);
  //   if (!validator.valid) {
  //     const errs = validator.errors.map(e => e.stack);
  //     throw new BadRequestError(errs);
  //   }
    
    const company = await Company.create(req.body);
    return res.status(201).json({ company });
  //  catch (err) {
  //   return next(err);
  })
// });

/** GET /  =>
 *   { companies: [ { handle, name, description, numEmployees, logoUrl }, ...] }
 *
 * Can filter on provided search filters:
 * - minEmployees
 * - maxEmployees
 * - nameLike (will find case-insensitive, partial matches)
 *
 * Authorization required: none
 */


/** GET /[handle]  =>  { company }
 *
 *  Company is { handle, name, description, numEmployees, logoUrl, jobs }
 *   where jobs is [{ id, title, salary, equity }, ...]
 *
 * Authorization required: none
 */

router.get("/:handle", async function (req, res, next) {
  
  try {
    const company = await Company.get(req.params.handle);
    return res.json({ company });
  } catch (err) {
    return next(err);
  }
});

/** PATCH /[handle] { fld1, fld2, ... } => { company }
 *
 * Patches company data.
 *
 * fields can be: { name, description, numEmployees, logo_url }
 *
 * Returns { handle, name, description, numEmployees, logo_url }
 *
 * Authorization required: login
 */

router.patch("/:handle", async function (req, res, next) {
  try {
    // const validator = jsonschema.validate(req.body, companyUpdateSchema);
    // if (!validator.valid) {
    //   const errs = validator.errors.map(e => e.stack);
    //   throw new BadRequestError(errs);
    // }
    const { handle } = req.params.handle
    const { data } = req.body
    const company = await Company.update(req.params.handle, req.body);
    return res.json({ company });
  } catch (err) {
    return next(err);
  }
});

/** DELETE /[handle]  =>  { deleted: handle }
 *
 * Authorization: login
 */

router.delete("/:handle", async function (req, res, next) {
  console.log(res.locals.user)
    // const adminUser = await db.query(`SELECT username, is admin FROM users`)
    const { handle } = req.params
  try {
    const deleted = await Company.remove(handle);
    return res.json({ "deleted": deleted});
  } catch (err) {
    return next(err);
  }
});

router.get("/", async function (req, res, next) {
  try {
    const companies = await Company.findAll();
    return res.json({ companies });
  } catch (err) {
    return next(err);
  }
});


router.get("/", async function (req, res, next) {
  try {
    const companies = await Company.filter(req.query)
    return res.json({ companies });
  } catch (err) {
    return next(err);
  }
});



module.exports = router;
