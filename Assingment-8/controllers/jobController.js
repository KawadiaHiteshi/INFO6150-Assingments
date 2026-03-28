const Job = require("../models/Job");

// POST /create/job
const createJob = async (req, res) => {
  try {
    const { companyName, jobTitle, description, salary } = req.body;

    if (!companyName || !jobTitle || !description || !salary) {
      return res.status(400).json({
        error: "Company name, job title, description, and salary are required.",
      });
    }

    const newJob = new Job({
      companyName,
      jobTitle,
      description,
      salary,
    });

    await newJob.save();

    return res.status(201).json({
      message: "Job created successfully.",
      job: newJob,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Server error.",
      details: error.message,
    });
  }
};

// GET /jobs
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({});
    return res.status(200).json({ jobs });
  } catch (error) {
    return res.status(500).json({
      error: "Server error.",
      details: error.message,
    });
  }
};

module.exports = { createJob, getAllJobs };