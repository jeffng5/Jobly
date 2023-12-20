"use strict";

const jsonschema = require("jsonschema");
const express = require("express");

const { BadRequestError } = require("../expressError");
const { ensureLoggedIn } = require("../middleware/auth");
const Company = require("../models/company");

const companyNewSchema = require("../schemas/companyNew.json");
const companyUpdateSchema = require("../schemas/companyUpdate.json");

const router = new express.Router();
app.use(express.json())


router.get("/", async function(req, res,next){
    try {
    const jobs = await Job.findAll();
    return res.json({jobs});
    } catch (err) {
    return next(err);
 }
})

router.post("/", async function(req, res, next){
    try{
        const createJob = await Job.create()
        return res.json({createJob});
    }catch (err) {
        return next(err);
    }
    })
router.get("/:handle", async function (req, res,next) {
    try {
        const job = await Job.get(req.params.handle);
        return res.json({ job });
    } catch (err) {
        return next(err);
    }
}
);


// router.patch("/:handle". ensureLoggedIn, async function (req, res, next) {
//     try {
//       const validator = jsonschema.validate(req.body, companyUpdateSchema);
//       if (!validator.valid) {
//       const errs = validator.errors.map(e => e.stack);
//       throw new BadRequestError(errs);
//     }
//       const job = await Job.update    
// }


// }

router.delete("/:handle", ensureLoggedIn, async function (req, res, next) {
    try{
      const deleted = await Job.remove(req.params.handle);
      return res.json({ deleted: deleted});
    } catch (err) {
        return next(err);}
    }

)


module.exports = router