const Job = require("../model/Job");

module.exports = {
  create(req, res) {
    return res.render("job");
  },
  save(req, res) {
    const job = Job.get();
    const lastId = job[job.length - 1]?.id || 0;

    job.push({
      id: lastId + 1,
      name: req.body.name,
      "daily-hours": req.body["daily-hours"],
      "total-hours": req.body["total-hours"],
      created_at: Date.now(),
    });

    return res.redirect("/");
  },
};
