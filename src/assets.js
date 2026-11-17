/* ====== ASSET MANIFEST ======
   Drop images into public/backgrounds or public/sprites, then add a line here.
   Sprites should be transparent PNGs, all the same canvas size, so they line up. */
window.TWST_ASSETS = {
  backgrounds: [], // backgrounds are picked up automatically from public/backgrounds/
  sprites: [], // sprites are picked up automatically from public/sprites/<character>/
  // names that show up as suggestions in the speaker box
  characters: [
    { group: "Heartslabyul", names: ["Riddle", "Trey", "Cater", "Ace", "Deuce"] },
    { group: "Savanaclaw", names: ["Leona", "Ruggie", "Jack"] },
    { group: "Octavinelle", names: ["Azul", "Jade", "Floyd"] },
    { group: "Scarabia", names: ["Kalim", "Jamil"] },
    { group: "Pomefiore", names: ["Vil", "Epel", "Rook"] },
    { group: "Ignihyde", names: ["Idia", "Ortho"] },
    { group: "Royal Sword Academy", names: ["Rielle", "Minajael", "Chenya", "Neige", "Dominic", "Gran", "Hop", "Timmy", "Snick", "Toby", "Ambrose"] },
    { group: "Diasomnia", names: ["Malleus", "Lilia", "Silver", "Sebek"] },
    { group: "Others", names: ["Yuu", "Grim", "Crowley", "Crewel", "Trein", "Vargas", "Sam", "???", "Narrator"] }
  ]
};
