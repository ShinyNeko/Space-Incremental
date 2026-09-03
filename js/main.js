var gameData = {
  wood: 100,
  
  woodPerClick: 1,
  woodPerSecond: 0,
  
  woodClickAmmount: 0,
  woodClickCost: 10,
  
  woodUpgrade1Amount: 0,
  woodUpgrade1Cost: 100,
  woodUpgrade1PerSecPer: 1,
  
  lastTick: Date.now(),
  version: "0.0.1",
};

var update = {
  amounts: function() {
    updateItem("", "woodCount", gameData.wood)
    updateItem("", "woodPerSec", gameData.woodPerSecond)
  },
  buyBottons: function() {
    updateItem("", "test1", gameData.woodClickAmmount)
    updateItem("", "perClickUpgradeCost", gameData.woodClickCost)

    updateItem("", "test2", gameData.woodUpgrade1Amount)
    updateItem("", "perSecondUpgradeCost", gameData.woodUpgrade1Cost)
  },
  
  all:function() {
    update.amounts()
    update.buyBottons()
  },
};

function updateItem(extraText, id, item) {
  document.getElementById(id).innerHTML = extraText + format(item, "scientific");
};

function calWoodPerSec() {
  gameData.woodPerSecond = (gameData.woodUpgrade1PerSecPer * gameData.woodUpgrade1Amount)
};

function gatherWood() {
  gameData.wood += gameData.woodPerClick;
  update.amounts();
};

function buyWoodClick() {
  if (gameData.wood >= gameData.woodClickCost) {
    gameData.wood -= gameData.woodClickCost;
    gameData.woodClickAmmount += 1;
    gameData.woodPerClick += 1;
    gameData.woodClickCost = (gameData.woodClickCost + 1.8) * 
    Math.pow(1.01, gameData.woodClickAmmount);
    update.amounts();
    update.buyBottons();
  };  
};

function buyWoodUpgradeOne() {
  if (gameData.wood >= gameData.woodUpgrade1Cost) {
    gameData.wood -= gameData.woodUpgrade1Cost;
    gameData.woodUpgrade1Amount += 1;
    gameData.woodUpgrade1Cost = (gameData.woodUpgrade1Cost + 10) * 
    Math.pow(1.01, gameData.woodUpgrade1Amount);
    calWoodPerSec();
    update.amounts();
    update.buyBottons();
  };
};

function format(number,type) {
  let exponent = Math.floor(Math.log10(number));
  let mantissa = number / Math.pow(10, exponent);
  if (exponent < 3) return number.toFixed(0);
  if (type == "scientific") return mantissa.toFixed(2) + "e" + exponent;
  if (type == "engineering") return (Math.pow(10, exponent % 3) * mantissa).toFixed(2) +
  "e" + (Math.floor(exponent / 3) * 3);
};

function tab(tab) {
  // hide all your tabs, then show the one the user selected.
  document.getElementById("mineMenu").style.display = "none";
  document.getElementById("upgradeMenu").style.display = "none";
  document.getElementById("researchMenu").style.display = "none";
  document.getElementById("optionsMenu").style.display = "none";
  document.getElementById(tab).style.display = "inline-block";
}
// go to a tab for the first time, so not all show
tab("mineMenu");

var mainGameLoop = window.setInterval(function() {
  diff = Date.now() - gameData.lastTick;
  gameData.lastTick = Date.now();
  gameData.wood += (gameData.woodPerSecond * (diff / 100) / 10);
  updateItem("", "woodCount", gameData.wood);
}, 100);

function wipeSave() {
  localStorage.removeItem("SpaceIncrementalSave");
  location.reload();
}

function manualSave() {
  localStorage.setItem("SpaceIncrementalSave", JSON.stringify(gameData));
}

var saveGameLoop = window.setInterval(function() {
  localStorage.setItem("SpaceIncrementalSave", JSON.stringify(gameData));
}, 15000);

var saveGame = JSON.parse(localStorage.getItem("SpaceIncrementalSave"));
if (saveGame !== null) {
  if (saveGame.version == "0.0.1") {
    gameData = saveGame
  }
  else{
    if (typeof saveGame.wood !== "undefined") gameData.wood = saveGame.wood;

    if (typeof saveGame.woodPerClick !== "undefined") gameData.woodPerClick = saveGame.woodPerClick;
    if (typeof saveGame.woodPerSecond !== "undefined") gameData.woodPerSecond = saveGame.woodPerSecond;

    if (typeof saveGame.woodClickAmmount !== "undefined") gameData.woodClickAmmount = saveGame.woodClickAmmount;
    if (typeof saveGame.woodClickCost !== "undefined") gameData.woodClickCost = saveGame.woodClickCost;

    if (typeof saveGame.woodUpgrade1Amount !== "undefined") gameData.woodUpgrade1Amount = saveGame.woodUpgrade1Amount;
    if (typeof saveGame.woodUpgrade1Cost !== "undefined") gameData.woodUpgrade1Cost = saveGame.woodUpgrade1Cost;
    if (typeof saveGame.woodUpgrade1PerSecPer !== "undefined") gameData.woodUpgrade1PerSecPer = saveGame.woodUpgrade1PerSecPer;

    if (typeof saveGame.lastTick !== "undefined") gameData.lastTick = saveGame.lastTick;
  } 
  update.all()
}
