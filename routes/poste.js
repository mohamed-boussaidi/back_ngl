const express = require('express');
const router = express.Router()
const poste = require("../controllers/config/poste");
const auth = require("../middleware/auth");

/**-------------------------------- Poste Routes ------------------------**/

//Get all Method
router.post('/poste',auth,async (req, res) => {
    poste.add(req,res)
})
router.get('/postes',auth,async (req, res) => {
    poste.getAll(req,res)
})

//Get by ID Method
router.get('/poste/:id',auth, async (req, res) => {
    poste.getById(req,res)
})

//Update by ID Method
router.patch('/poste/:id',auth, async (req, res) => {
    poste.Update(req,res)
})

//Delete by ID Method
router.delete('/poste/:id',auth, async (req, res) => {
    poste.Delete(req,res)
})

module.exports = router;
