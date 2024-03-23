const { StatusCodes } = require("http-status-codes");
const Job = require("../models/Job");
const { NotFoundError, BadRequestError } = require("../errors");
const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userID }).sort("createdAt");
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};
const getJob = async (req, res) => {
  const user = req.user.userID;
  const id = req.params.id;
  const job = await Job.findOne({
    _id: id,
    createdBy: user,
  });
  if (!job) {
    throw new NotFoundError(`No job with id ${id}`);
  }
  res.status(StatusCodes.OK).json({ job });
};
const createJob = async (req, res) => {
  req.body.createdBy = req.user.userID;
  const job = await Job.create(req.body);
  console.log(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};
const updateJob = async (req, res) => {
  const user = req.user.userID;
  const id = req.params.id;
  const { company, position } = req.body;
  if (company === "" || position === "") {
    throw new BadRequestError("Company or position fields cannot be empty");
  }
  const job = await Job.findByIdAndUpdate(
    { _id: id, createdBy: user },
    req.body,
    { new: true, runValidators: true }
  );
  console.log(job);
  if (!job) {
    throw new NotFoundError(`No job with id ${id}`);
  }
  res.status(StatusCodes.OK).json({ job });
};
const deleteJob = async (req, res) => {
  const id = req.params.id;
  const user = req.user.userID;
  const job = await Job.findByIdAndRemove({
    _id: id,
    createdBy: user,
  });
  if (!job) {
    throw new NotFoundError(`No job found with id ${id}`);
  }
  res.status(StatusCodes.OK).send();
};
module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob };
