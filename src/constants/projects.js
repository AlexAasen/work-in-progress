const grid1 = [
  {
    src: "/src/img/VIS_02.png",
    title: "Vården i Siffror",
    description: "Visualizing the statistics behind the healthcare in Sweden in a fun and interesting way",
    callback: (func) => func("/playground/vis")
  },
  {
    src: "/src/img/Capture.png",
    title: "Attributes bar chart",
    description: "Visualizing attributes in a d3 bar chart",
    callback: (func) => func("/playground/graphs/attributes")
  },
  {
    src: "/src/img/c3l.png",
    title: "Pixis",
    description: "Draw pixel art and export it as a png",
    callback: (func) => func("/playground/pixis")
  },
  {
    src: "/src/img/metg.png",
    title: "NOT REAL",
    description: "Visualizing attributes in a d3 bar chart",
    callback: (func) => func("/playground/attributes")
  }
]

const grid2 = [
  {
    src: "/src/img/wind-velocity.png",
    title: "WINDVELOCITY",
    description: "Graph visualizing wind-velocity and direction during a 12hour-span",
    callback: (func) => func("/playground/graphs/windvelocity")
  },
  {
    src: "/src/img/gameoflife.png",
    title: "Game of life",
    description: "Simulation game",
    callback: (func) => func("/playground/games/game-of-life")
  },
  {
    src: "/src/img/c3l.png",
    title: "NOT REAL",
    description: "Draw pixel art and export it as a png",
    callback: (func) => func("/playground/pixis")
  },
  {
    src: "/src/img/metg.png",
    title: "Spaceshooter",
    description: "Spaceshooter made with Phaser",
    callback: (func) => func("/playground/games/spaceshooter")
  },
  {
    src: "/src/img/isaidnofinalsmall_by_alexaasen-d9nbuz2.jpg",
    title: "Illustration",
    description: "Watercolors going digital",
    callback: (func) => func("/playground/illustration")
  },
  {
    src: "/src/img/mastermind.png",
    title: "Mastermind",
    description: "Remake of the classic boardgame",
    callback: (func) => func("/playground/games/mastermind")
  }
]

const visImgs = [
  "/src/img/measure-page.png",
  "/src/img/VIS_01.png",
  "/src/img/VIS_02.png",
  "/src/img/light-dashboard.png",
  "/src/img/dashoboard.png",
  "/src/img/measure-table.png",
  "/src/img/spider-chart.png"
]

const illustrationImgs = [
  "/src/img/isaidnofinalsmall_by_alexaasen-d9nbuz2.jpg",
  "/src/img/desperationsmall_by_alexaasen-d8qj6pp.jpg",
  "/src/img/Screen Shot 2016-06-07 at 21.30.18.png",
  "/src/img/eruption_by_alexaasen-da1ells.jpg",
  "/src/img/the_colors_of_the_wind_by_alexaasen-d8ki89o.jpg",
  "/src/img/entanglement_by_alexaasen-d9fvnbx.jpg",
  "/src/img/longing2small_by_alexaasen-d8rilae.jpg",
  "/src/img/lonelysmall10small_by_alexaasen-d9djtqk.jpg",
  "/src/img/tigersmall_by_alexaasen-d9fzolk.jpg",
  "/src/img/motherearthfinalsmall_by_alexaasen-d9a9lex.jpg"
]

module.exports = {
  visImgs,
  illustrationImgs,
  grid1,
  grid2
}
