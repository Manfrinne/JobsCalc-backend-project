const Job = require("../model/Job");
const Profile = require("../model/Profile");
const JobUtils = require("../utils/jobUtils")

module.exports = {
  index(req, res) {
    const jobs = Job.get();
    const profile = Profile.get();

    let statusCount = {
      progress: 0,
      done: 0,
      total: jobs.length,
    };

    // Total de horas por dia de cada Job
    let jobTotalHours = 0;

    const updatedJobs = jobs.map(job => {
      // Determinar status do serviço
      const remainingDays = JobUtils.remainingDays(job);
      const status = remainingDays <= 0 ? "done" : "progress";

      // Somar quantidade dos projetos(via status)
      statusCount[status] += 1;

      // Horas diárias de cada Job em aberto
      jobTotalHours = status == "progress" ? jobTotalHours + Number(job["daily-hours"]) : jobTotalHours;

      return {
        ...job,
        remainingDays,
        status,
        budget: JobUtils.calculateJobBudget(job, profile["value-hour"]),
      }
    })

    // Determinar horas livres no dia
    const freeHours = profile["hours-per-day"] - jobTotalHours

    return res.render("index", { jobs: updatedJobs, profile: profile, statusCount: statusCount, freeHours: freeHours });
  },
};
