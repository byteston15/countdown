const express = require("express");
const router = express.Router();
const { ClockModel } = require("../models");

//routes
router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const clock = await ClockModel.findAll();
      res.status(200).json({ data: clock });
    } catch (err) {
      res.status(404).json(err.message);
      next();
    }
  })
  .post(async (req, res, next) => {
    try {
      console.log(req.body);
      const clock = await ClockModel.create(req.body);
      res.status(201).json({ "created data": req.body });
    } catch (err) {
      res
        .status(500)
        .json({ error: err.message, "failure to create": req.body });
      next();
    }
  }); //end of this "/" route

module.exports = router;
