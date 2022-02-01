/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/AI.js":
/*!*******************!*\
  !*** ./src/AI.js ***!
  \*******************/
/***/ ((__unused_webpack_module, exports) => {

eval("const computerPlay = (opponent) => {\n    let y = randomInteger(opponent);\n    let x = randomInteger(opponent);\n    while(opponent.getBoard().checkBoard()[y][x].hit === true) { //produce random values until it selects a coordinate that hasn't been hit\n        y = randomInteger(opponent);\n        x = randomInteger(opponent);\n    }\n    opponent.getBoard().receiveAttack(y, x);                     //attack opponent\n}\n\nconst computerPlace = (player) => {\n    const length = player.getShips().length; \n    const ships = player.getShips();    //array of ships\n    const board = player.getBoard();\n\n    let n = true\n    while (n) {\n        if (allShipsPlaced(ships)) {\n            n = false;\n        } else {\n            for (i = 0; i < length; i++) {  //loop through ship array\n                const random = Math.floor((Math.random() * 2) + 1); //randomly generates 1 or 2\n                if (random % 2 == 0) {\n                    ships[i].changeOrientation();\n                }\n                let y = randomInteger(player);\n                let x = randomInteger(player);\n                board.placeShip(ships[i], y, x);\n            }\n        }\n    }\n}\n\nfunction randomInteger(player) {\n    return Math.floor(Math.random() * player.getBoard().checkBoard().length); //return random number depending on size of gameboard\n}\n\nconst allShipsPlaced = (ships) => {\n    for (i = 0; i < ships.length; i++) {\n        if (!ships[i].placed()) { //if ship is placed\n            return false   \n        }\n    }\n    return true\n};\n\nconst randomTimeout = (min, max) => {\n    return Math.floor(Math.random() * (max - min + 1)) + min;\n}\n\n\nexports.play = computerPlay;\nexports.place = computerPlace;\nexports.allShipsPlaced = allShipsPlaced\nexports.timeout = randomTimeout;\n\n//# sourceURL=webpack://battleships/./src/AI.js?");

/***/ }),

/***/ "./src/DOM/gameLoopDOM.js":
/*!********************************!*\
  !*** ./src/DOM/gameLoopDOM.js ***!
  \********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("const gameboard = (player, boardContainer) => {\n    const cellArray = [];\n\n    const board = player.getBoard().checkBoard();\n    for (y = 0; y < board.length; y++) {   \n        for (x = 0; x < board[y].length; x++) {\n            const cell = document.createElement('div');\n            cell.className = 'cell';\n            cell.dataset.y = y; //y coordinate\n            cell.dataset.x = x; //x coordinate\n            boardContainer.appendChild(cell);\n\n            const ship = board[y][x].ship;\n\n            //if the ship is sunk\n            if (ship === null) { //if cell doesn't contain a ship\n                if (board[y][x].hit) {  //if cell is hit\n                    cell.style.background = 'grey';\n                }\n            } else {    //cell contains ship\n                if (ship.isSunk()) {\n                    cell.style.background = player.getColour();\n                } else if (board[y][x].hit) {\n                    cell.style.background = 'black';\n                }\n            }\n            \n            cellArray.push(cell);\n        };\n    };\n    return cellArray; //return array of cell DOMs for event listeners\n};\n\nconst winner = (opponent, playerContainer, opponentContainer) => {\n    //opponent always wins as winner is checked at beginning of players turn\n    const win = document.createElement('p');\n    win.innerHTML = opponent.getName() + ' wins';\n    win.style.color = opponent.getColour();\n\n    const lose = document.createElement('p');\n    lose.innerHTML = opponent.getName() + ' wins';\n    lose.style.color = opponent.getColour();\n\n    opponentContainer.appendChild(win);\n    playerContainer.appendChild(lose);\n\n    return {win: win, lose: lose};\n};\n\nconst restart = () => {\n    const button = document.createElement('button');\n    button.innerHTML = 'RESET';\n    button.className = 'restart';\n\n    content.appendChild(button);\n\n    return button;\n}\n\nconst cellHighlight = (player, board) => {\n    board.forEach(cell => {\n        cell.addEventListener('mouseenter', () => {\n            cell.style.boxShadow = '0 0 15px ' + player.getColour();\n            cell.style.zIndex = '5';\n        });\n        cell.addEventListener('mouseout', () => {\n            cell.style.boxShadow = null;\n            cell.style.zIndex = '2';\n        });\n    });\n};\n\nexports.board = gameboard;\nexports.winner = winner;\nexports.restart = restart;\nexports.cellHighlight = cellHighlight;\n\n//# sourceURL=webpack://battleships/./src/DOM/gameLoopDOM.js?");

/***/ }),

/***/ "./src/DOM/resetDOM.js":
/*!*****************************!*\
  !*** ./src/DOM/resetDOM.js ***!
  \*****************************/
/***/ ((module) => {

eval("const reset = (parent) => {\n    while (parent.firstChild) {\n        parent.removeChild(parent.firstChild);\n    }\n}\n\nmodule.exports = reset;\n\n//# sourceURL=webpack://battleships/./src/DOM/resetDOM.js?");

/***/ }),

/***/ "./src/DOM/setupDOM.js":
/*!*****************************!*\
  !*** ./src/DOM/setupDOM.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("const AI = __webpack_require__(/*! ../AI */ \"./src/AI.js\");\n\nconst instructionsDom = (player, container, position) => {\n    const wrapper = document.createElement('div');\n    wrapper.className = 'infoWrapper ' + position\n\n    //create a container for name and button\n    const shownInfoWrapper = document.createElement('div');\n    shownInfoWrapper.className = 'instructions';\n\n    const playersSetup = document.createElement('p');\n    playersSetup.innerHTML = player.getName() + \" setup\";\n    playersSetup.style.color = player.getColour();\n    shownInfoWrapper.appendChild(playersSetup);\n\n    const moreInfo = document.createElement('button');\n    moreInfo.innerHTML = 'i';\n    shownInfoWrapper.appendChild(moreInfo);\n    \n    const hiddenInfoWrapper = document.createElement('div');\n    hiddenInfoWrapper.className = 'info';\n    hiddenInfoWrapper.style.display = 'none';\n    const p1 = document.createElement('p');\n    p1.innerHTML = 'drag and drop ships to place on board';\n    const p2 = document.createElement('p');\n    p2.innerHTML = 'click on unplaced ships to change orientation';\n    const p3 = document.createElement('p');\n    p3.innerHTML = 'click on placed ships to remove them from the board';\n    hiddenInfoWrapper.appendChild(p1);\n    hiddenInfoWrapper.appendChild(p2);\n    hiddenInfoWrapper.appendChild(p3);\n    \n    if (position === 'top') {\n        wrapper.appendChild(shownInfoWrapper);\n        wrapper.appendChild(hiddenInfoWrapper);\n    } else {\n        wrapper.appendChild(hiddenInfoWrapper);\n        wrapper.appendChild(shownInfoWrapper);\n    }\n    container.appendChild(wrapper);\n\n    moreInfo.addEventListener('click', () => {\n        if (hiddenInfoWrapper.style.display === 'none') {\n            hiddenInfoWrapper.style.display = 'block';\n        } else {\n            hiddenInfoWrapper.style.display = 'none';\n        };\n    });\n};\n\nconst displayShips = (shipContainer, player) => {\n    const harbor = player.getShips();\n    const ships = [];\n    for (i = 0; i < harbor.length; i++) {\n        if (!harbor[i].placed()) { //if ship is not placed display ship\n            const ship = document.createElement('div');\n            ship.className = 'ship';\n            ship.id = i;\n            ship.draggable = true;\n            ship.style.border = '1px solid '+ player.getColour();\n            \n            shipContainer.appendChild(ship);\n\n            if (harbor[i].isHorizontal()) { //style ships depending on orienation\n                ship.style.display = 'inline-flex';\n            } else {\n                ship.style.display = 'inline-block';\n            };\n            \n            for (n = 0; n < harbor[i].length(); n++) {\n                const part = document.createElement('div');\n                part.className = 'shipPart';\n                part.dataset.index = n;\n                part.style.border = '1px solid '+ player.getColour();\n                ship.appendChild(part);\n            };\n\n            ships.push(ship);\n        };\n    };\n    return ships; //return array of ship DOMs for event listeners\n};\n\nconst gameboard = (boardContainer, player) => {\n    const board = [];\n    for (y = 0; y < player.getBoard().checkBoard().length; y++) {   \n        for (x = 0; x < player.getBoard().checkBoard()[y].length; x++) {\n            const cell = document.createElement('div');\n            cell.className = 'cell';\n            cell.dataset.y = y; //y coordinate\n            cell.dataset.x = x; //x coordinate\n            boardContainer.appendChild(cell);\n\n            if (player.getBoard().checkBoard()[y][x].ship !== null) {\n                cell.style.background = player.getColour();\n            }\n            board.push(cell);\n        };\n    };\n    return board; //return array of cell DOMs for event listeners\n};\n\nconst continueButton = (player, container) => {\n    const harbor = player.getShips();\n    const nextPage = document.createElement('button');\n    if (AI.allShipsPlaced(harbor)) {\n        const wrapper = document.createElement('div');\n        wrapper.className = 'next';\n        container.appendChild(wrapper);\n        nextPage.innerHTML = 'continue';\n        nextPage.className = 'continue';\n        wrapper.appendChild(nextPage);\n    };\n    return nextPage\n};\n\nexports.instructions = instructionsDom;\nexports.gameboard = gameboard;\nexports.displayShips = displayShips;\nexports.contButton = continueButton;\n\n//# sourceURL=webpack://battleships/./src/DOM/setupDOM.js?");

/***/ }),

/***/ "./src/gameLoop.js":
/*!*************************!*\
  !*** ./src/gameLoop.js ***!
  \*************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const reset = __webpack_require__(/*! ./DOM/resetDOM */ \"./src/DOM/resetDOM.js\");\nconst DOM = __webpack_require__(/*! ./DOM/gameLoopDOM */ \"./src/DOM/gameLoopDOM.js\");\nconst AI = __webpack_require__(/*! ./AI */ \"./src/AI.js\");\n\nconst gameLoop = (player1, player2, computer) => {\n\n    reset(content);\n    const containerTop = document.createElement('div');\n    containerTop.className = 'container';\n    content.appendChild(containerTop);\n\n    const containerBottom = document.createElement('div');\n    containerBottom.className = 'container';\n    content.appendChild(containerBottom);\n\n    const gameboardP1 = document.createElement('div');     \n    gameboardP1.className = 'gameboard';\n    gameboardP1.style.border = '2px solid ' + player1.getColour();\n    containerBottom.appendChild(gameboardP1);\n\n    const gameboardP2 = document.createElement('div');     \n    gameboardP2.className = 'gameboard';\n    gameboardP2.style.border = '2px solid ' + player2.getColour();\n    containerTop.appendChild(gameboardP2);\n\n\n    function loop(player, opponent, playerContainer, opponentContainer) {\n        reset(playerContainer);\n        reset(opponentContainer);\n        playerContainer.style.boxShadow = null;\n        opponentContainer.style.boxShadow = null;\n\n        //display boards\n        DOM.board(player, playerContainer);                     //only need to display players board\n        const opponentBoard = DOM.board(opponent, opponentContainer);   //need to return values of opponents board for event listeners\n        \n        //game conditions + listeners\n        if (player.getBoard().checkLose()) {    //check if player has lost\n            const winner = DOM.winner(opponent, playerContainer, opponentContainer);\n            if (opponent === player2) {\n                if (computer) { //looks nicer when playing vs computer\n                    winner.lose.innerHTML = '';\n                    winner.win.className = 'winLose'\n                } else {\n                    winner.win.className = 'winLose top'\n                }\n                winner.lose.className = 'winLose'\n                \n            } else {\n                winner.win.className = 'winLose'\n                winner.lose.className = 'winLose top'\n                if (computer) {\n                    winner.lose.innerHTML = '';\n                };\n            };\n\n            const restart = DOM.restart();\n            restart.addEventListener('click', () => {\n                const initializePage = __webpack_require__(/*! ./initialize */ \"./src/initialize.js\"); //don't know why but have to import this here for instead with the other imports for this to work\n                initializePage(player1.getName(), player1.getColour(), player2.getName(), player2.getColour());\n            });\n            \n        } else if (computer && player === player2) {    //if player 2 is a computer and it's there turn\n            opponentContainer.style.boxShadow = boxShadow + player.getColour();\n            setTimeout(() => {\n                AI.play(opponent);\n                loop(opponent, player, opponentContainer, playerContainer);\n            }, AI.timeout(500, 1500));\n        } else { //players play\n            DOM.cellHighlight(player, opponentBoard); //highlights position mouse is over\n            opponentContainer.style.boxShadow = boxShadow + player.getColour();\n            opponentBoard.forEach(cell => {\n                cell.addEventListener('click', () => {\n                    const board = opponent.getBoard()\n                    const y = cell.dataset.y;\n                    const x = cell.dataset.x;\n\n                    if (!board.checkBoard()[y][x].hit) { //if the board has not been hit\n                        board.receiveAttack(y, x);\n                        loop(opponent, player, opponentContainer, playerContainer); //reset loop with player/opponent swapped\n                    }\n                });\n            });\n\n        \n\n        };\n    };\n    loop(player1, player2, gameboardP1, gameboardP2);\n}\n\nconst boxShadow = '0 0 15px '\n\n\n\nmodule.exports = gameLoop;\n\n\n//# sourceURL=webpack://battleships/./src/gameLoop.js?");

/***/ }),

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((module) => {

eval("const Gameboard = (size) => {\n    const board = createArray(size); //create 2D array to store coordinates of size x size grid\n    const checkBoard = () => board;\n\n    const placeShip = (battleShip, y, x) => {\n        if ((battleShip.isHorizontal()) &&  //check ship orientation, horizontal\n        (x + battleShip.length() <= size) && //check ship doesn't overflow border\n        (locationsFreeX(battleShip, y, x, board)) &&   //check all spaces are free\n        (!battleShip.placed())) {  //check ship hasn't already been placed\n            for (i = x; i < (x + battleShip.length()); i++) {\n                board[y][i].ship = battleShip;\n                battleShip.place();\n            }\n        } else if ((!battleShip.isHorizontal()) && //vertical\n        (y + battleShip.length() <= size) && //check ship doesn't overflow border\n        (locationsFreeY(battleShip, y, x, board)) &&   //check all spaces are free\n        (!battleShip.placed())) {  //check ship hasn't already been placed\n            for (i = y; i < (y + battleShip.length()); i++) {\n                board[i][x].ship = battleShip;\n                battleShip.place();\n            };\n        };\n    };\n\n    const removeShip = (y, x) => {\n        if (board[y][x].ship !== null) { //if the board contains a ship at position y x\n            const ship = board[y][x].ship;\n            for (i = 0; i < board.length; i++) {\n                for (n = 0; n < board[i].length; n++) {\n                    if (board[i][n].ship == ship) {\n                        board[i][n].ship.remove();\n                        board[i][n].ship = null;\n                    };\n                };\n            };\n        };\n    };\n\n    const receiveAttack = (y, x) => {\n        if (board[y][x].hit === false) {    //check if coordinate has been hit\n            if (board[y][x].ship === null) {    // check if coordinate doesn't contain a ship\n                board[y][x].hit = true;\n            } else {\n                board[y][x].ship.hit();\n                board[y][x].hit = true;\n            }\n        }\n    }\n\n    const checkLose = () => {\n        for (y = 0; y < size; y++) {\n            for (x = 0; x < size; x++) {\n                if (board[y][x].ship !== null && board[y][x].hit === false) { //if any position contains a ship section that has not been hit\n                    return false\n                }\n            }\n        }\n        return true;\n    }\n    return {checkBoard, placeShip, receiveAttack, checkLose, removeShip};\n}\n\nfunction createArray(size) {\n    const outerArray = [];\n    for (i = 0; i < size; i++) {\n        const innerArray = [];\n        for (n = 0; n < size; n++) {\n            const object = {ship: null, hit: false};\n            innerArray.push(object);\n        } outerArray.push(innerArray)\n    }\n    return outerArray;\n}\n\nfunction locationsFreeX(ship, y, x, board) {  \n    if (y < 0 || x < 0) {\n        return false;\n    }\n    const length = ship.length();\n    for (i = x; i < (x + length); i++) {\n        if (board[y][i].ship !== null) { //if where the ship is going to be placed already contains a ship\n            return false\n        }\n    } return true\n}\n\nfunction locationsFreeY(ship, y, x, board) {\n    if (y < 0 || x < 0) {\n        return false;\n    }\n    const length = ship.length();\n    for (i = y; i < (y + length); i++) {\n        if (board[i][x].ship !== null) {\n            return false\n        }\n    } return true\n}\n\nmodule.exports = Gameboard\n\n//# sourceURL=webpack://battleships/./src/gameboard.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ \"./src/style.css\");\n\nconst initializePage = __webpack_require__(/*! ./initialize */ \"./src/initialize.js\");\n\ninitializePage('Player 1', '#FF0000', 'Player 2', '#0000FF');\n\n\n\n\n\n//# sourceURL=webpack://battleships/./src/index.js?");

/***/ }),

/***/ "./src/initialize.js":
/*!***************************!*\
  !*** ./src/initialize.js ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const reset = __webpack_require__(/*! ./DOM/resetDOM */ \"./src/DOM/resetDOM.js\");\nconst setup = __webpack_require__(/*! ./setup */ \"./src/setup.js\");\n\nconst initializePage = (player1Name, player1Colour, player2Name, player2Colour) => {\n    reset(content);\n\n    //create top bar\n    const topBar = document.createElement('div');\n    topBar.id = 'topbar';\n    const header = document.createElement('h1');\n    header.innerHTML = 'BATTLESHIP';\n    topBar.appendChild(header);\n    content.appendChild(topBar);\n\n    const bottomBar = document.createElement('p');\n    bottomBar.id = 'bottombar';\n    bottomBar.innerHTML = 'Created by Perry Baran';\n    content.appendChild(bottomBar);\n    \n\n    //create players\n    const info1 = createPlayer(player1Name, player1Colour);\n    const info2 = createPlayer(player2Name, player2Colour);\n    \n    //player 2 is computer option\n    let computer = true;\n\n    const container = document.createElement('div');\n    container.className = \"computerInput\";\n    const option = document.createElement('button');\n    option.innerHTML = 'player vs computer';\n    container.appendChild(option);\n    content.appendChild(container);\n\n    option.onclick = () => {\n        if (computer) {\n            computer = false;\n            option.innerHTML = 'player vs player'\n        } else {\n            computer = true;\n            option.innerHTML = 'player vs computer';\n        }\n    }\n   \n    //start button\n    const startWrapper = document.createElement('div');\n    startWrapper.id = 'start';\n    const start = document.createElement('button');\n    start.innerHTML = 'START';\n    startWrapper.appendChild(start);\n    content.appendChild(startWrapper);\n\n    start.addEventListener('click', () => {\n        setup(info1, info2, computer);\n    })\n}\n\nfunction createPlayer(nameValue, colorValue) {\n    const container = document.createElement('div');\n    container.className = 'player'\n    content.appendChild(container);\n\n    const name = document.createElement('input');\n    name.value = nameValue;\n    name.className = 'nameInput'\n    name.maxLength = '9';\n    container.appendChild(name);\n\n    const wrapper = document.createElement('div');\n    wrapper.className = 'colorPicker'\n    const color = document.createElement('input');\n    color.type = 'color';\n    color.value = colorValue;\n\n    wrapper.style.background = color.value;\n    name.style.color = color.value;\n    \n    color.addEventListener('input', () => {\n        wrapper.style.background = color.value;\n        name.style.color = color.value;\n    });\n\n    wrapper.appendChild(color);\n    container.appendChild(wrapper);\n\n    \n    return {name: name, color: color}\n}\n    \n\n\n\nmodule.exports = initializePage;\n\n\n//# sourceURL=webpack://battleships/./src/initialize.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Gameboard = __webpack_require__(/*! ./gameboard */ \"./src/gameboard.js\");\nconst ShipFactory = __webpack_require__(/*! ./shipFactory */ \"./src/shipFactory.js\");\n\nconst Player = (nameInput, colourInput, gameBoardSize) => {\n    const board = Gameboard(gameBoardSize);             //debated hardcoding gameBoardSize as 10 to reduce inputs but settled on variable as it makes it easier to test\n    const getBoard = () => board;\n    const ships = ShipFactory([5, 4, 3, 3, 2]);\n    const getShips = () => ships;\n    const name = nameInput;\n    const getName = () => name;\n    const colour = colourInput;\n    const getColour = () => colour;\n    return {getBoard, getName, getColour, getShips}\n}\n\nmodule.exports = Player;\n\n//# sourceURL=webpack://battleships/./src/player.js?");

/***/ }),

/***/ "./src/setup.js":
/*!**********************!*\
  !*** ./src/setup.js ***!
  \**********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Player = __webpack_require__(/*! ./player */ \"./src/player.js\");\nconst reset = __webpack_require__(/*! ./DOM/resetDOM */ \"./src/DOM/resetDOM.js\");\nconst setupDOM = __webpack_require__(/*! ./DOM/setupDOM */ \"./src/DOM/setupDOM.js\");\nconst AI = __webpack_require__(/*! ./AI */ \"./src/AI.js\");\nconst gameLoop = __webpack_require__(/*! ./gameLoop */ \"./src/gameLoop.js\");\nconst listeners = __webpack_require__(/*! ./setupListeners */ \"./src/setupListeners.js\");\n\nconst setup = (info1, info2, computer) => {\n    //create players\n    const player1 = Player(info1.name.value, info1.color.value, 10);\n    const player2 = Player(info2.name.value, info2.color.value, 10);\n\n    //DOM\n    reset(content);\n    const container1 = document.createElement('div');\n    container1.className = 'container';\n    content.appendChild(container1);\n\n    const container2 = document.createElement('div');\n    container2.className = 'container';\n    content.appendChild(container2);\n\n    function setupP1(player) {\n        reset(container1);\n        reset(container2);\n        const dock = document.createElement('dock');\n        dock.className = 'harbor top';\n        container1.appendChild(dock);\n        const gameboard = document.createElement('div');    \n        gameboard.style.border = '2px solid ' + player.getColour(); \n        gameboard.className = 'gameboard';\n        container2.appendChild(gameboard);\n\n        setupDOM.instructions(player, container1, 'top');\n\n        const fleet = setupDOM.displayShips(dock, player); //array of ship DOM elements\n        const board = setupDOM.gameboard(gameboard, player); //array of gameboard cells \n        const contButton = setupDOM.contButton(player, container1);\n\n        //event listeners\n        listeners.ships(fleet, player, setupP1);\n        listeners.board(board, player, setupP1);\n\n        contButton.addEventListener('click', () => {\n            if (computer) {\n                AI.place(player2);\n                gameLoop(player1, player2, true);\n            } else {\n                setupP2(player2);\n            }\n        });\n    };\n\n    function setupP2(player) {\n        reset(container1);\n        reset(container2);\n        const dock = document.createElement('dock');\n        dock.className = 'harbor bottom';\n        container2.appendChild(dock);\n        const gameboard = document.createElement('div');     \n        gameboard.className = 'gameboard';\n        container1.appendChild(gameboard);\n\n        setupDOM.instructions(player, container2, 'bottom');\n\n        const fleet = setupDOM.displayShips(dock, player); //array of ship DOM elements\n        const board = setupDOM.gameboard(gameboard, player); //array of gameboard cells \n        const contButton = setupDOM.contButton(player, container2);\n\n        listeners.ships(fleet, player, setupP2);\n        listeners.board(board, player, setupP2);\n\n        contButton.addEventListener('click', () => {\n            gameLoop(player1, player2, false);\n        });\n    };\n\n    setupP1(player1);\n    \n};\n\nmodule.exports = setup;\n\n//# sourceURL=webpack://battleships/./src/setup.js?");

/***/ }),

/***/ "./src/setupListeners.js":
/*!*******************************!*\
  !*** ./src/setupListeners.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports) => {

eval("const fleetEventListeners = (fleet, player, reset) => { \n    fleet.forEach(ship => {\n        //change orientation on click\n        ship.addEventListener('click', () => {\n            player.getShips()[ship.id].changeOrientation();\n            reset(player);\n        });\n\n        //desktop drag\n        let partIndex = null; //var to pass part id to data transfer and datatransfer can't be set by mousedown\n        parts = Array.from(ship.childNodes);\n        parts.forEach(part => {\n            part.addEventListener('mousedown', e => {\n                partIndex = part.dataset.index;\n            });\n        });\n        ship.addEventListener('dragstart', e => {\n            e.dataTransfer.setData('shipID', ship.id);\n            e.dataTransfer.setData('partID', partIndex);\n        });\n        ship.addEventListener('dragend', () => {\n            reset(player)\n        });\n\n        //mobile drag\n        ship.addEventListener('touchmove', e => {\n            e.preventDefault()\n            const touchLocation = e.targetTouches[0];\n            ship.style.position = 'fixed';\n            ship.style.left = touchLocation.pageX - 25 + 'px';\n            ship.style.top = touchLocation.pageY - 25 + 'px';\n        });\n\n        ship.addEventListener('touchend', e => {\n            ship.style.position = 'static';\n            ship.style.left = null;\n            ship.style.top =  null;\n            const changedTouch = e.changedTouches[0];\n            const cell = document.elementFromPoint(changedTouch.clientX, changedTouch.clientY);\n            const currentShip = player.getShips()[ship.id];\n            const y = parseInt(cell.dataset.y);\n            const x = parseInt(cell.dataset.x);\n            player.getBoard().placeShip(currentShip, y, x);\n            reset(player);\n        });\n        \n    });\n}\n\nconst boardEventLiseners = (board, player, reset) => {\n    board.forEach(cell => {\n        //desktop drag and drop\n        cell.addEventListener('dragover', e => {\n            e.preventDefault();\n        });\n        cell.addEventListener('drop', e => {\n            e.preventDefault();\n            const shipID = e.dataTransfer.getData('shipID');\n            const partID = e.dataTransfer.getData('partID');\n\n            const ship = player.getShips()[shipID];\n            if (ship.isHorizontal()) {\n                const y = parseInt(cell.dataset.y);\n                const x = parseInt(cell.dataset.x - partID);\n                player.getBoard().placeShip(ship, y, x);\n            } else if (!ship.isHorizontal()) {\n                const y = parseInt(cell.dataset.y - partID);\n                const x = parseInt(cell.dataset.x);\n                player.getBoard().placeShip(ship, y, x);\n            }\n            reset(player);\n        });\n\n        //remove ships from board\n        cell.addEventListener('click', () => {\n            const y = parseInt(cell.dataset.y);\n            const x = parseInt(cell.dataset.x);\n            player.getBoard().removeShip(y, x);\n            reset(player);\n        });\n    });\n};\n\nexports.ships = fleetEventListeners;\nexports.board = boardEventLiseners;\n\n\n\n//# sourceURL=webpack://battleships/./src/setupListeners.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((module) => {

eval("const Ship = (size) => {\n    const length = () => size;\n    let health = size;\n    let sunk = false;\n    let horizontal = true;\n    const hit = () => {\n        health--;\n        if (health === 0) {\n            sunk = true;\n        }\n    }\n    const isSunk = () => sunk;\n    const isHorizontal = () => horizontal;\n    const changeOrientation = () => horizontal = (horizontal ? false : true);\n    var isPlaced = false;\n    const place = () => isPlaced = true;\n    const remove = () => isPlaced = false;\n    const placed = () => isPlaced;\n    return {length, hit, isSunk, isHorizontal, changeOrientation, place, remove, placed}\n}\n\nmodule.exports = Ship;\n\n//# sourceURL=webpack://battleships/./src/ship.js?");

/***/ }),

/***/ "./src/shipFactory.js":
/*!****************************!*\
  !*** ./src/shipFactory.js ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Ship = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\n\n//used to create ships and store in an array\nconst ShipFactory = (array) => {            \n    const harbor = [];\n    for (i = 0; i < array.length; i++) {\n        const ship = Ship(array[i]);\n        harbor.push(ship);\n    }\n    return harbor;\n}\n\nmodule.exports = ShipFactory;\n\n//# sourceURL=webpack://battleships/./src/shipFactory.js?");

/***/ }),

/***/ "../../node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*****************************************************************!*\
  !*** ../../node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*****************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"../../node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"../../node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \"* {\\n    box-sizing: border-box;\\n    margin: auto;\\n    font-family: Arial, Helvetica, sans-serif;\\n    -webkit-tap-highlight-color:  rgba(255, 255, 255, 0);\\n    overflow: hidden;\\n}\\n\\n:root{\\n    --dark-blue: rgb(1, 60, 128);\\n    --darker-blue: rgb(1, 28, 59);\\n}\\n\\nbutton {\\n    cursor:pointer;\\n}\\n\\n\\n\\n/*initial screen*/\\n#topbar {\\n    background: var(--dark-blue);\\n    height: 60px;\\n}\\n\\nh1 {\\n    color: white;\\n    position: absolute;\\n    top: 17px;\\n    left: 5px;\\n    font-size: 3rem;\\n}\\n\\n#bottombar {\\n    position: absolute;\\n    bottom: -100px;\\n    background: var(--dark-blue);\\n    height: 120px;\\n    width: 100%;\\n    padding-top: 2px;\\n    color: white;\\n    text-align: center;\\n}\\n\\n.player {\\n    border: 2px solid var(--dark-blue);\\n    border-radius: 2px;\\n    margin-top: 15%;\\n    height: fit-content;\\n    width: 380px;\\n}\\n\\n.nameInput {\\n    display: inline-block;\\n    margin: 5px;\\n    margin-bottom: 10px;\\n    font-size: 3rem;\\n    width: 300px;\\n    border-radius: 2px;\\n    border: 1px solid black;\\n}\\n\\n.colorPicker {\\n    display: inline-block;\\n    aspect-ratio: 1/1;\\n    height: 50px;\\n    border-radius: 100px;\\n    border: 2px solid black;\\n    margin: 5px;\\n    position: relative;\\n    top: 10px;\\n}\\n\\ninput[type=\\\"color\\\"] {\\n    -webkit-appearance: none;\\n    border-radius: 100px;\\n    aspect-ratio: 1/1;\\n    height: 50px;\\n    overflow: hidden;\\n    opacity: 0;\\n    cursor: pointer;\\n}\\n\\n.computerInput {\\n    display: flex;\\n    justify-content: center;\\n    align-items: center;\\n    margin-top: 10%;\\n    width: 100%;\\n}\\n\\n.computerInput > button {\\n    display: inline-block;\\n    font-size: 2rem;\\n    background-color: none;\\n    color: var(--dark-blue);\\n    border: 2px solid var(--dark-blue);\\n    border-radius: 2px;\\n}\\n\\n#start {\\n    display: flex;\\n    justify-content: center;\\n    align-items: center;\\n    margin-top: 10%;\\n}\\n\\n#start > button {\\n    width: 200px;\\n    height: 60px;\\n    font-size: 3rem;\\n    margin: auto;\\n    background-color: var(--dark-blue);\\n    color: white;\\n    border: 2px solid var(--darker-blue);\\n    border-radius: 10px;\\n}\\n\\n/*setup screen*/\\n.container {\\n    position: relative;\\n    width: 100vw;\\n    height: 50vh;\\n}\\n\\n.next {\\n    width: 100%;\\n    height: 100%;\\n    text-align: center;\\n}\\n\\n.continue {\\n    position: absolute;\\n    inset: 0;\\n    width: 200px;\\n    height: 60px;\\n    font-size: 3rem;\\n    background-color: var(--dark-blue);\\n    color: white;\\n    border: 2px solid var(--darker-blue);\\n    border-radius: 10px;\\n}\\n\\n.harbor {\\n    display: block;\\n    position: absolute; \\n    width: 100%;\\n    text-align: center;\\n}\\n\\n.harbor.top {\\n    bottom: 0;\\n}\\n\\n.harbor.bottom {\\n    top: 0;\\n}\\n\\n.ship {\\n    margin: 10px;\\n    z-index: 25;\\n}\\n\\n.shipPart {\\n    aspect-ratio: 1/1;\\n    height: calc(45vh / 10);\\n    cursor: pointer;\\n}\\n\\n.rotate {\\n    position: absolute;\\n    bottom: 5px;\\n    right: 20px;\\n    aspect-ratio: 1;\\n    height: 30px;\\n    border-radius: 100px;\\n    border: 1px solid var(--darker-blue);\\n    background-color: var(--dark-blue);\\n}\\n\\n.infoWrapper {\\n    position: absolute;\\n    width: 100%;\\n    text-align: center;\\n}\\n\\n.infoWrapper.top {\\n    top: 0;\\n}\\n\\n.infoWrapper.bottom {\\n    bottom: 0;\\n}\\n\\n.instructions {\\n    position: relative;\\n}\\n\\n.instructions > p {\\n    display: inline-block;\\n    font-size: 3rem;\\n    width: calc(100% - 40px);\\n    margin-right:40px;\\n    padding-top: 5px;\\n}\\n\\n.instructions > button {\\n    position: absolute;\\n    top: 18px;\\n    right: 10px;\\n    display: inline-block;\\n    font-size: 1.8rem;\\n    font-weight: bold;\\n    aspect-ratio: 1;\\n    height: 35px;\\n    border-radius: 100px;\\n    color: white;\\n    background: var(--dark-blue);\\n    border: none;\\n    margin-left: 20px;\\n    cursor: help;\\n}\\n\\n.info {\\n    background: var(--dark-blue);\\n    color: white;\\n    font-size: 1rem;\\n}\\n\\n.info > p {\\n    margin-top: 3px;\\n    margin-bottom: 3px;\\n}\\n\\n/*gameboard*/\\n.gameboard {\\n    display: grid;\\n    grid-template-columns: repeat(10, 1fr);\\n    aspect-ratio: 1/1;\\n    height: 45vh;\\n    position: absolute;\\n    inset: 0;\\n    border: 1px solid rgb(192, 192, 192);\\n}\\n\\n.cell {\\n    background-color: white;\\n    aspect-ratio: 1/1;\\n    width: 100%;\\n    border: 1px solid rgb(192, 192, 192);\\n    cursor: pointer;\\n}\\n\\n/*end screen*/\\n.winLose {\\n    display: flex;\\n    background-color: rgba(255, 255, 255, 0.6);\\n    font-size: 3rem;\\n    font-weight: bold;\\n    position: absolute;\\n    inset: 0;\\n    width: 100%;\\n    text-align: center;\\n    align-items:center;\\n    justify-content:center;\\n    z-index: 10;\\n}\\n\\n.winLose.top {\\n    transform: rotate(180deg);\\n}\\n\\n.restart {\\n    display: flex;\\n    justify-content: center;\\n    align-items: center;\\n    position: absolute;\\n    inset: 0;\\n    width: 200px;\\n    height: 60px;\\n    font-size: 3rem;\\n    margin: auto;\\n    background-color: var(--dark-blue);\\n    color: white;\\n    border: 2px solid var(--darker-blue);\\n    border-radius: 2px;\\n    z-index: 20;\\n}\", \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://battleships/./src/style.css?../../node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "../../node_modules/css-loader/dist/runtime/api.js":
/*!*********************************************************!*\
  !*** ../../node_modules/css-loader/dist/runtime/api.js ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\nmodule.exports = function (cssWithMappingToString) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = \"\";\n      var needLayer = typeof item[5] !== \"undefined\";\n\n      if (item[4]) {\n        content += \"@supports (\".concat(item[4], \") {\");\n      }\n\n      if (item[2]) {\n        content += \"@media \".concat(item[2], \" {\");\n      }\n\n      if (needLayer) {\n        content += \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\");\n      }\n\n      content += cssWithMappingToString(item);\n\n      if (needLayer) {\n        content += \"}\";\n      }\n\n      if (item[2]) {\n        content += \"}\";\n      }\n\n      if (item[4]) {\n        content += \"}\";\n      }\n\n      return content;\n    }).join(\"\");\n  }; // import a list of modules into the list\n\n\n  list.i = function i(modules, media, dedupe, supports, layer) {\n    if (typeof modules === \"string\") {\n      modules = [[null, modules, undefined]];\n    }\n\n    var alreadyImportedModules = {};\n\n    if (dedupe) {\n      for (var k = 0; k < this.length; k++) {\n        var id = this[k][0];\n\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n\n    for (var _k = 0; _k < modules.length; _k++) {\n      var item = [].concat(modules[_k]);\n\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        continue;\n      }\n\n      if (typeof layer !== \"undefined\") {\n        if (typeof item[5] === \"undefined\") {\n          item[5] = layer;\n        } else {\n          item[1] = \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\").concat(item[1], \"}\");\n          item[5] = layer;\n        }\n      }\n\n      if (media) {\n        if (!item[2]) {\n          item[2] = media;\n        } else {\n          item[1] = \"@media \".concat(item[2], \" {\").concat(item[1], \"}\");\n          item[2] = media;\n        }\n      }\n\n      if (supports) {\n        if (!item[4]) {\n          item[4] = \"\".concat(supports);\n        } else {\n          item[1] = \"@supports (\".concat(item[4], \") {\").concat(item[1], \"}\");\n          item[4] = supports;\n        }\n      }\n\n      list.push(item);\n    }\n  };\n\n  return list;\n};\n\n//# sourceURL=webpack://battleships/../../node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "../../node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!******************************************************************!*\
  !*** ../../node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \******************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\nmodule.exports = function (i) {\n  return i[1];\n};\n\n//# sourceURL=webpack://battleships/../../node_modules/css-loader/dist/runtime/noSourceMaps.js?");

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"../../node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"../../node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"../../node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"../../node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!./style.css */ \"../../node_modules/css-loader/dist/cjs.js!./src/style.css\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\n\n      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\n    \noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://battleships/./src/style.css?");

/***/ }),

/***/ "../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!********************************************************************************!*\
  !*** ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \********************************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\nvar stylesInDOM = [];\n\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n\n  for (var i = 0; i < stylesInDOM.length; i++) {\n    if (stylesInDOM[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n\n  return result;\n}\n\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var indexByIdentifier = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3],\n      supports: item[4],\n      layer: item[5]\n    };\n\n    if (indexByIdentifier !== -1) {\n      stylesInDOM[indexByIdentifier].references++;\n      stylesInDOM[indexByIdentifier].updater(obj);\n    } else {\n      var updater = addElementStyle(obj, options);\n      options.byIndex = i;\n      stylesInDOM.splice(i, 0, {\n        identifier: identifier,\n        updater: updater,\n        references: 1\n      });\n    }\n\n    identifiers.push(identifier);\n  }\n\n  return identifiers;\n}\n\nfunction addElementStyle(obj, options) {\n  var api = options.domAPI(options);\n  api.update(obj);\n\n  var updater = function updater(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {\n        return;\n      }\n\n      api.update(obj = newObj);\n    } else {\n      api.remove();\n    }\n  };\n\n  return updater;\n}\n\nmodule.exports = function (list, options) {\n  options = options || {};\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDOM[index].references--;\n    }\n\n    var newLastIdentifiers = modulesToDom(newList, options);\n\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n\n      var _index = getIndexByIdentifier(_identifier);\n\n      if (stylesInDOM[_index].references === 0) {\n        stylesInDOM[_index].updater();\n\n        stylesInDOM.splice(_index, 1);\n      }\n    }\n\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://battleships/../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "../../node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!************************************************************************!*\
  !*** ../../node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \************************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\nvar memo = {};\n/* istanbul ignore next  */\n\nfunction getTarget(target) {\n  if (typeof memo[target] === \"undefined\") {\n    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself\n\n    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n      try {\n        // This will throw an exception if access to iframe is blocked\n        // due to cross-origin restrictions\n        styleTarget = styleTarget.contentDocument.head;\n      } catch (e) {\n        // istanbul ignore next\n        styleTarget = null;\n      }\n    }\n\n    memo[target] = styleTarget;\n  }\n\n  return memo[target];\n}\n/* istanbul ignore next  */\n\n\nfunction insertBySelector(insert, style) {\n  var target = getTarget(insert);\n\n  if (!target) {\n    throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n  }\n\n  target.appendChild(style);\n}\n\nmodule.exports = insertBySelector;\n\n//# sourceURL=webpack://battleships/../../node_modules/style-loader/dist/runtime/insertBySelector.js?");

/***/ }),

/***/ "../../node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**************************************************************************!*\
  !*** ../../node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/* istanbul ignore next  */\nfunction insertStyleElement(options) {\n  var element = document.createElement(\"style\");\n  options.setAttributes(element, options.attributes);\n  options.insert(element, options.options);\n  return element;\n}\n\nmodule.exports = insertStyleElement;\n\n//# sourceURL=webpack://battleships/../../node_modules/style-loader/dist/runtime/insertStyleElement.js?");

/***/ }),

/***/ "../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**************************************************************************************!*\
  !*** ../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\n/* istanbul ignore next  */\nfunction setAttributesWithoutAttributes(styleElement) {\n  var nonce =  true ? __webpack_require__.nc : 0;\n\n  if (nonce) {\n    styleElement.setAttribute(\"nonce\", nonce);\n  }\n}\n\nmodule.exports = setAttributesWithoutAttributes;\n\n//# sourceURL=webpack://battleships/../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js?");

/***/ }),

/***/ "../../node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!*******************************************************************!*\
  !*** ../../node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \*******************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/* istanbul ignore next  */\nfunction apply(styleElement, options, obj) {\n  var css = \"\";\n\n  if (obj.supports) {\n    css += \"@supports (\".concat(obj.supports, \") {\");\n  }\n\n  if (obj.media) {\n    css += \"@media \".concat(obj.media, \" {\");\n  }\n\n  var needLayer = typeof obj.layer !== \"undefined\";\n\n  if (needLayer) {\n    css += \"@layer\".concat(obj.layer.length > 0 ? \" \".concat(obj.layer) : \"\", \" {\");\n  }\n\n  css += obj.css;\n\n  if (needLayer) {\n    css += \"}\";\n  }\n\n  if (obj.media) {\n    css += \"}\";\n  }\n\n  if (obj.supports) {\n    css += \"}\";\n  }\n\n  var sourceMap = obj.sourceMap;\n\n  if (sourceMap && typeof btoa !== \"undefined\") {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  } // For old IE\n\n  /* istanbul ignore if  */\n\n\n  options.styleTagTransform(css, styleElement, options.options);\n}\n\nfunction removeStyleElement(styleElement) {\n  // istanbul ignore if\n  if (styleElement.parentNode === null) {\n    return false;\n  }\n\n  styleElement.parentNode.removeChild(styleElement);\n}\n/* istanbul ignore next  */\n\n\nfunction domAPI(options) {\n  var styleElement = options.insertStyleElement(options);\n  return {\n    update: function update(obj) {\n      apply(styleElement, options, obj);\n    },\n    remove: function remove() {\n      removeStyleElement(styleElement);\n    }\n  };\n}\n\nmodule.exports = domAPI;\n\n//# sourceURL=webpack://battleships/../../node_modules/style-loader/dist/runtime/styleDomAPI.js?");

/***/ }),

/***/ "../../node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*************************************************************************!*\
  !*** ../../node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/* istanbul ignore next  */\nfunction styleTagTransform(css, styleElement) {\n  if (styleElement.styleSheet) {\n    styleElement.styleSheet.cssText = css;\n  } else {\n    while (styleElement.firstChild) {\n      styleElement.removeChild(styleElement.firstChild);\n    }\n\n    styleElement.appendChild(document.createTextNode(css));\n  }\n}\n\nmodule.exports = styleTagTransform;\n\n//# sourceURL=webpack://battleships/../../node_modules/style-loader/dist/runtime/styleTagTransform.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;