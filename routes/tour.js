const express = require('express');
const router = express.Router()
const tour = require("../controllers/config/tour");
const auth = require("../middleware/auth");

/**-------------------------------- Tour Routes ------------------------**/

router.post('/tour',auth,async (req, res) => {
    tour.add(req,res)
})
router.get('/tours',auth,async (req, res) => {
    tour.getAll(req,res)
})

router.get('/tour/:id',auth, async (req, res) => {
    tour.getById(req,res)
})
router.get('/getByResponsableId/:id',auth, async (req, res) => {
    tour.getByResponsableId(req,res)
})
router.patch('/tour/:id',auth, async (req, res) => {
    tour.Update(req,res)
})
router.delete('/tour/:id',auth, async (req, res) => {
    tour.Delete(req,res)
})

module.exports = router;