const Job = require('../models/jobModel.js'); // Corrección aquí

// Create a new job - Luo uusi työ
const createJob = async (req, res) => {
  try {
    const { title, type, location, description, salary, company: { name, description: companyDescription, contactEmail, contactPhone } } = req.body;
    const newJob = new Job({ title, type, location, description, salary, company: { name, description: companyDescription, contactEmail, contactPhone } });
    await newJob.save();
    res.status(201).json({ message: 'Job created successfully', job: newJob });
  } catch (error) {
    res.status(500).json({ message: 'Error creating job', error });
  }
};

// Get all jobs - Hae kaikki työt
const getJob = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving jobs', error });
  }
};

// Get a job by ID - Hae työ ID:n perusteella
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving job', error });
  }
};

// Update a job - Päivitä työ
const updateJob = async (req, res) => {
  try {
    const { title, type, location, description, salary, company: { name, description: companyDescription, contactEmail, contactPhone } } = req.body;
    const job = await Job.findByIdAndUpdate(req.params.id, { title, type, location, description, salary, company: { name, description: companyDescription, contactEmail, contactPhone } }, { new: true });
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json({ message: 'Job updated successfully', job }); 
  } catch (error) {
    res.status(500).json({ message: 'Error updating job', error });
  }
};

// Delete a job - Poista työ
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id); 
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting job', error });
  }
};

module.exports = { createJob, getJob, getJobById, updateJob, deleteJob };