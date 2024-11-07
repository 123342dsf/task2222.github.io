const log = document.getElementById("log");
const startButton = document.getElementById("startButton");
const restartButton = document.getElementById("restartButton");

// 创建一个标志，表示寻宝任务是否进行中
let isTreasureHuntInProgress = false;

// 清空日志并隐藏重启按钮
function clearLog() {
    log.innerHTML = "";
    restartButton.style.display = "none";
}

// 添加日志
function appendLog(message) {
    const p = document.createElement("p");
    p.classList.add("fade-in");
    p.textContent = message;
    log.appendChild(p);
}

// 模拟在神庙中找寻宝藏地图API
class TreasureMap {
    static getInitialClue() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("在古老的图书馆里找到了第一个线索...");
            }, 1000);
        });
    }
    
    static decodeAncientScript(clue) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!clue) {
                    reject("没有线索可以解码!");
                }
                resolve("解码成功!宝藏在一座古老的神庙中...");
            }, 1500);
        });
    }
    
    static searchTemple(location) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const random = Math.random();
                if (random < 0.3) {
                    reject("糟糕!遇到了神庙守卫!");
                }
                resolve("找到了一个神秘的箱子...");
            }, 2000);
        });
    }

    // 新增情节：解谜环节
static solvePuzzle() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // 提示谜题并等待用户输入
            const userAnswer = prompt("谜题：1 + 1 = ?");
            
            // 检查用户的回答
            if (userAnswer === "2") {
                resolve("谜题解开了！你获得了通往宝藏的线索...");
            } else {
                reject("你没有解开谜题，任务失败!");
            }
        }, 2000);
    });
}
    
    // 新增情节：危险的陷阱
    static avoidTrap() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const random = Math.random();
                if (random < 0.4) {
                    reject("不幸触发了陷阱，你受伤了!");
                }
                resolve("你成功避开了陷阱，继续前进...");
            }, 1500);
        });
    }

    // 新增情节：神秘人物的帮助
    static encounterMysteryPerson() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("你遇到了一位神秘人物，他给了你一个提示: '宝藏就在你眼前，但它被一层谜雾覆盖…'");
            }, 1200);
        });
    }

    static openTreasureBox() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("恭喜!你找到了传说中的宝藏!");
            }, 1000);
        });
    }
}

function findTreasureWithPromises() {
    // 如果正在寻宝，阻止再次启动
    if (isTreasureHuntInProgress) {
        alert("正在寻宝中，请等待当前任务完成！");
        return;
    }

    isTreasureHuntInProgress = true; // 标记任务为进行中
    clearLog(); // 清空日志
    restartButton.style.display = "none"; // 隐藏重启按钮

    TreasureMap.getInitialClue()
        .then(clue => {
            appendLog(clue);
            return TreasureMap.decodeAncientScript(clue);
        })
        .then(location => {
            appendLog(location);
            return TreasureMap.searchTemple(location);
        })
        .then(box => {
            appendLog(box);
            return TreasureMap.solvePuzzle();  // 解谜
        })
        .then(puzzleResult => {
            appendLog(puzzleResult);
            return TreasureMap.avoidTrap();  // 避免陷阱
        })
        .then(trapResult => {
            appendLog(trapResult);
            return TreasureMap.encounterMysteryPerson();  // 遇见神秘人物
        })
        .then(mysteryMessage => {
            appendLog(mysteryMessage);
            return TreasureMap.openTreasureBox();
        })
        .then(treasure => {
            appendLog(treasure);
            restartButton.style.display = "block"; // 显示重启按钮
        })
        .catch(error => {
            appendLog("任务失败: " + error);
            restartButton.style.display = "block"; // 显示重启按钮
        })
        .finally(() => {
            isTreasureHuntInProgress = false; // 任务完成，标记为不进行中
        });
}

// 重启寻宝的功能
function restartTreasureHunt() {
    findTreasureWithPromises();
}

startButton.addEventListener("click", findTreasureWithPromises);
restartButton.addEventListener("click", restartTreasureHunt);