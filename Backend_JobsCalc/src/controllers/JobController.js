const Job = require("../model/Job");
const Profile = require("../model/Profile");
const JobUtils = require("../utils/jobUtils");

module.exports = {
  create(req, res) {
    return res.render("job");
  },

  async save(req, res) {
    await Job.create({
      name: req.body.name,
      "daily-hours": req.body["daily-hours"],
      "total-hours": req.body["total-hours"],
      created_at: Date.now(),
    });

    return res.redirect("/");
  },

  async edit(req, res) {
    const jobId = req.params.id;
    const jobs = await Job.get();

    const job = jobs.find((job) => Number(job.id) === Number(jobId));

    if (!job) {
      return res.send("JOB NOT FOUND!");
    }

    const profile = await Profile.get();

    job.budget = JobUtils.calculateJobBudget(job, profile["value-hour"]);

    return res.render("job-edit", { job });
  },

  async update(req, res) {
    const jobId = req.params.id;

    const updatedJob = {
      name: req.body.name,
      "daily-hours": req.body["daily-hours"],
      "total-hours": req.body["total-hours"],
    };

    await Job.update(updatedJob, jobId);

    return res.redirect("/");
  },

  async delete(req, res) {
    const id = req.params.id;

    await Job.delete(id);

    return res.redirect("/");
  },
};
