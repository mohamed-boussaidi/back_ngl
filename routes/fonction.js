const express = require('express');
const router = express.Router()
const fonction = require("../controllers/config/fonction");
const auth = require("../middleware/auth");

/**-------------------------------- Function Routes ------------------------**/

//Get all Method
router.post('/fonction',auth,async (req, res) => {
    fonction.add(req,res)
})
router.get('/fonctions',auth,async (req, res) => {
    fonction.getAll(req,res)
})

//Get by ID Method
router.get('/fonction/:id',auth, async (req, res) => {
    fonction.getById(req,res)
})

//Update by ID Method
router.patch('/fonction/:id',auth, async (req, res) => {
    fonction.Update(req,res)
})

//Delete by ID Method
router.delete('/fonction/:id',auth, async (req, res) => {
    fonction.Delete(req,res)
})

module.exports = router;

