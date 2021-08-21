module.exports = {
  remainingDays(job) {
    // Calcular tempo restante de trabalho
    const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed();

    const createdDate = new Date(job.created_at);
    const dueDay = createdDate.getDate() + Number(remainingDays);
    const dueDateInMs = createdDate.setDate(dueDay);

    const timeDiffInMs = dueDateInMs - Date.now();
    const dayInMs = 1000 * 60 * 60 * 24; // Transformar Milleseg. em Dias
    const dayDiff = Math.floor(timeDiffInMs / dayInMs);

    return dayDiff;
  },

  calculateJobBudget: (job, valueHour) => valueHour * job["total-hours"],
};
