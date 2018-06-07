const getTranslatedMonth = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
]

const getISODate = (date) => {
  return getTranslatedMonth[date.getUTCMonth()] + " " + date.getUTCFullYear()
}

const getRandom = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
}

const mathRadians = (degrees) => {
  return degrees * Math.PI / 180;
}

module.exports = {
  getISODate,
  getRandom,
  mathRadians,
  getTranslatedMonth
}
