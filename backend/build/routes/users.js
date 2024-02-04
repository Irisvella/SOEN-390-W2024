"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
/* GET users listing. */
router.get("/", function (req, res, next) {
    return res.json({ message: "Currently on /users route" });
});
module.exports = router;
