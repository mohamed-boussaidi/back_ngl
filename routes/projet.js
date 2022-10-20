const express = require('express');
const router = express.Router()
const projet = require("../controllers/config/projet");
const auth = require("../middleware/auth");

/**-------------------------------- projet Routes ------------------------**/

//Get all Method
router.post('/projet',auth,async (req, res) => {
    projet.add(req,res)
})
router.get('/projets',auth,async (req, res) => {
    projet.getAll(req,res)
})

//Get by ID Method
router.get('/projet/:id',auth, async (req, res) => {
    projet.getById(req,res)
})

//Update by ID Method
router.patch('/projet/:id',auth, async (req, res) => {
    projet.Update(req,res)
})
router.delete('/projet/:id',auth, async (req, res) => {
    projet.Delete(req,res)
})

module.exports = router;