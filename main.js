var saveGame = JSON.parse(localStorage.getItem("SpaceIncrementalSave"))

var gameData = {
    iron: 100,
    ironPerClick: 1,
    ironPerSecond: 0,
    ironPerClickUpgradeCost: 10,
    ironPerSecondUpgradeCost: 100,
    lastTick: Date.now()
}

function update(id, content) {
  document.getElementById(id).innerHTML = content;
}

function mineIron() {
    gameData.iron += gameData.ironPerClick
    update("ironCount", format(gameData.iron, "scientific") + " Iron Mined")
}

function upgradeIronPerClick() {
    if (gameData.iron >= gameData.ironPerClickUpgradeCost) {
        gameData.iron -= gameData.ironPerClickUpgradeCost
        gameData.ironPerClick += 0.1
        gameData.ironPerClickUpgradeCost *= 1.1
        update("ironCount", format(gameData.iron, "scientific") + " Iron Mined")
        update("perClickUpgrade", "Upgrade Per Click (per Click " + format(gameData.ironPerClick, "scientific") + ")")
        update("perClickUpgradeButton", " Cost: " + format(gameData.ironPerClickUpgradeCost, "scientific") + " Iron")
    }
}

function upgradeIronPerSecond() {
    if (gameData.iron >= gameData.ironPerSecondUpgradeCost) {
        gameData.iron -= gameData.ironPerSecondUpgradeCost
        gameData.ironPerSecond += 1
        gameData.ironPerSecondUpgradeCost *= 1.1
        update("ironCount", format(gameData.iron, "scientific") + " Iron Mined")
        update("perSecondUpgrade", "Upgrade Per Second (per Second " + format(gameData.ironPerSecond, "scientific") + ")")
        update("perSecondUpgradeButton", " Cost: " + format(gameData.ironPerSecondUpgradeCost, "scientific") + " Iron")
    }
}

function format(number,type) {
    let exponent = Math.floor(Math.log10(number))
    let mantissa = number / Math.pow(10, exponent)
    if (exponent < 3) return number.toFixed(1)
    if (type == "scientific") return mantissa.toFixed(2) + "e" + exponent
    if (type == "engineering") return (Math.pow(10, exponent % 3) * mantissa).toFixed(2) + "e" + (Math.floor(exponent / 3) * 3)
}

function tab(tab) {
      // hide all your tabs, then show the one the user selected.
    document.getElementById("mineMenu").style.display = "none"
    document.getElementById("upgradeMenu").style.display = "none"
    document.getElementById(tab).style.display = "inline-block"
}
// go to a tab for the first time, so not all show
tab("mineMenu")

var mainGameLoop = window.setInterval(function() {
    diff = Date.now() - gameData.lastTick
    gameData.lastTick = Date.now()
    gameData.iron += gameData.ironPerSecond * (diff / 1000)
    update("ironCount", format(gameData.iron, "scientific") + " Iron Mined")
}, 1000)

var saveGameLoop = window.setInterval(function() {
    localStorage.setItem("SpaceIncrementalSave", JSON.stringify(gameData))
}, 15000)

if (typeof saveGame.iron !== "undefined") gameData.iron = saveGame.iron
if (typeof saveGame.ironPerClick !== "undefined") gameData.ironPerClick = saveGame.ironPerClick
if (typeof saveGame.ironPerClickUpgradeCost !== "undefined") gameData.ironPerClickUpgradeCost = saveGame.ironPerClickUpgradeCost
if (typeof saveGame.lastTick !== "undefined") gameData.lastTick = saveGame.lastTick
if (typeof saveGame.ironPerSecond !== "undefined") gameData.ironPerSecond = saveGame.ironPerSecond
if (typeof saveGame.ironPerSecondUpgradeCost !== "undefined") gameData.ironPerSecondUpgradeCost = saveGame.ironPerSecondUpgradeCost