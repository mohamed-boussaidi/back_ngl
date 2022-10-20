const express = require('express');
const router = express.Router()
const activite = require("../controllers/activite");
const auth = require("../middleware/auth");

/**-------------------------------- Activite Routes ------------------------**/

//Get all Method
router.post('/activite',auth,async (req, res) => {
    activite.add(req,res)
})
router.get('/activites',auth,async (req, res) => {
    activite.getAll(req,res)
})

//Get by ID Method
router.get('/activite/:id',auth, async (req, res) => {
    activite.getById(req,res)
})

//Update by ID Method
router.patch('/activite/:id',auth, async (req, res) => {
    activite.Update(req,res)
})
router.delete('/activite/:id',auth, async (req, res) => {
    activite.Delete(req,res)
})
router.get('/getActiviteByCode/:code',auth, async (req, res) => {
    activite.getActiviteByCode(req,res)
})
module.exports = router;