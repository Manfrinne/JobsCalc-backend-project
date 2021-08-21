const Profile = require("../model/Profile");

module.exports = {
  index(req, res) {
    return res.render("profile", { profile: Profile.get() });
  },

  update(req, res) {
    // para pegar os dados via protocolo HTTP
    const data = req.body;

    // definir quantas semanas tem uma ano
    const weeksPerYear = 52;

    // especificar quantas semanas trabalhar no ano e,
    // de acordo com as semanas de férias, determinar
    // média mensal
    const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12;

    // determinar horas trabalhadas na semana
    const weeksTotalHours = data["hours-per-day"] * data["days-per-week"];

    // determinar horas trabalhadas no mês
    const monthTotalHours = weeksTotalHours * weeksPerMonth;

    // determinar valor da hora trabalhada
    const valueHour = data["monthly-budget"] / monthTotalHours;

    Profile.update({
      ...Profile.get(),
      ...req.body,
      "value-hour": valueHour,
    });

    return res.redirect("/profile");
  },
};
