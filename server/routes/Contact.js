const express = require("express")
const router = express.Router()

const {createContact} = require("../controllers/Contact")

router.post("/contact",createContact)

module.exports = router
