const express = require('express');
const router = express.Router()
const  sousprojet = require("../controllers/config/sousprojet");
const auth = require("../middleware/auth");

/**-------------------------------- Sous projet Routes ------------------------**/

//Get all Method
router.post('/sousprojet',auth,async (req, res) => {
    sousprojet.add(req,res)
})
router.get('/sousprojets',auth,async (req, res) => {
    sousprojet.getAll(req,res)
})

//Get by ID Method
router.get('/sousprojet/:id',auth, async (req, res) => {
    sousprojet.getById(req,res)
})

//Update by ID Method
router.patch('/sousprojet/:id',auth, async (req, res) => {
    sousprojet.Update(req,res)
})
router.delete('/sousprojet/:id',auth, async (req, res) => {
    sousprojet.Delete(req,res)
})

module.exports = router;