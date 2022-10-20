const express = require('express');
const router = express.Router()
const activitytask = require("../controllers/activitytask");
const auth = require("../middleware/auth");

/**-------------------------------- User Routes ------------------------**/

router.post('/activitytask',auth,async (req, res) => {
    activitytask.add(req,res)
})
router.get('/activitytasks',auth,async (req, res) => {
    activitytask.getAll(req,res)
})

router.get('/activitytask/:id',auth, async (req, res) => {
    activitytask.getById(req,res)
})
router.get('/getActicityTasksByPersonnelMatriculeOpened/:matricule',auth, async (req, res) => {
    activitytask.getActicityTasksByPersonnelMatriculeOpened(req,res)
})
router.get('/getActicityTasksByPersonnelMatricule/:matricule',auth, async (req, res) => {
    activitytask.getActicityTasksByPersonnelMatricule(req,res)
})
router.patch('/activitytask/:id',auth, async (req, res) => {
    activitytask.Update(req,res)
})
router.delete('/activitytask/:id',auth, async (req, res) => {
    activitytask.Delete(req,res)
})
router.get('/getActivityTasksOpened',auth, async (req, res) => {
    activitytask.getActivityTasksOpened(req,res)
})
module.exports = router;
