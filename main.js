var gameData = {
    iron: 0,
    ironPerClick: 1,
    ironPerClickUpgradeCost: 10,
    lastTick: Date.now()
}

function mineIron() {
    gameData.iron += gameData.ironPerClick
    document.getElementById("ironCount").innerHTML= gameData.iron + " Iron Mined"
}

function upgradeIronPerClick() {
    if (gameData.iron >= gameData.ironPerClickUpgradeCost) {
        gameData.iron -= gameData.ironPerClickUpgradeCost
        gameData.ironPerClick += 1
        gameData.ironPerClickUpgradeCost *= 2
        document.getElementById("ironCount").innerHTML = gameData.iron + " Iron Mined"
        document.getElementById("perClickUpgrade").innerHTML = "Upgrade Per Click (per Click " + gameData.ironPerClick + ") Cost: " + gameData.ironPerClickUpgradeCost + " Iron"
    }
}

var mainGameLoop = window.setInterval(function() {
    mineIron()
}, 1000)

var saveGameLoop = window.setInterval(function() {
    localStorage.setItem("SpaceIncrementalSave", JSON.stringify(gameData))
}, 15000)

var saveGame = JSON.parse(localStorage.getItem("SpaceIncrementalSave"))
if (saveGame !== null) {
    gameData = saveGame
}