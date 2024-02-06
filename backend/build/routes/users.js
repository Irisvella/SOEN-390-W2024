"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
const router = express.Router();
/* GET users listing. */
router.get("/", function (req, res, next) {
    return res.json({ message: "Currently on /users route" });
});
exports.default = router;
