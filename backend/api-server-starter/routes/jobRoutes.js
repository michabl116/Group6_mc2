const express = require('express');
const router = express.Router();
const { createJob, getJob, getJobById, updateJob, deleteJob } = require('../controllers/jobControllers');


router.post('/', createJob);
router.get('/', getJob);
router.get('/:id', getJobById);
router.put('/:id', updateJob);
router.delete('/:id', deleteJob);

module.exports = router;