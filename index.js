const {prefix, token} = require("./config.json")
const Discord = require("discord.js")

const client = new Discord.Client()
let rePut = /\#[p|P]ut \d$/
let defVal = ":white_medium_square:"
let pVal = ":regional_indicator_x:" // Player symbol - X
let bVal = ":o2:"   // Bot symbol - O
let pTurn = true
let msg = null
let game = [defVal, 
            defVal, 
            defVal, 
            defVal, 
            defVal, 
            defVal, 
            defVal, 
            defVal, 
            defVal]
let winStates = [[0, 1, 2], 
                [3, 4, 5], 
                [6, 7, 8], 
                [0, 4, 8], 
                [1, 4, 7], 
                [2, 5, 8], 
                [0, 3, 6], 
                [2, 4, 6]]


client.once("ready", () => {
    console.log("BOT READY")
})


client.on("message", message => {
    if (message.content.startsWith("#hello")) {
        message.channel.send(`Hello ${message.author.username}.\nI bet you can not win against me in tic-tac-toe - I am undefeated. 
Type #play to play tic-tac-toe, if you're not a scaredy-cat:sunglasses:`)
    
    } else if (message.content == "#play") {
        message.channel.send(`You play **X**, and go first, so you have the advantage. 
Type "#put **a**" to play your turn, where **a** is a number between 1 and 9. 
Type #example to get an example. 
Type #reset to restart the game. 
The game automatically restarts when the game is over, so you can instantly type a #put command.
You do not have to type #play before starting a new game or turn.`)

    } else if (message.content == "#example") {
        message.channel.send(`Each square has a number, ranging from 1-9, from upper left corner, to lower right corner:`)
        printGame(message)
        message.channel.send(`After you do "#put 1", and I do "#put 6":`)
        game[0] = pVal
        game[5] = bVal
        printGame(message)
        resetGame()
    
    } else if (rePut.test(message.content)) {
        let num = (message.content.split(" ")[1])
        putVal(message, num-1)
        message.delete()

    } else if (message.content == "#reset"){
        resetGame()
        message.channel.send("Game has been reset")
    }
})


async function printGame(message){
    if (msg == null){
        msg = await message.channel.send(`${game[0]}${game[1]}${game[2]}\n${game[3]}${game[4]}${game[5]}\n${game[6]}${game[7]}${game[8]}\n`)
    } else {
        msg.edit(`${game[0]}${game[1]}${game[2]}\n${game[3]}${game[4]}${game[5]}\n${game[6]}${game[7]}${game[8]}\n`)
    }
}


function resetGame(){
    pTurn = true
    msg = null
    game = [defVal, 
        defVal, 
        defVal, 
        defVal, 
        defVal, 
        defVal, 
        defVal, 
        defVal, 
        defVal]
}


function putVal(message, num){
    if (game[num] != defVal){
        message.channel.send(`That square is already occupied. Pick another.`)
    } else {
        if (pTurn) {
            game[num] = pVal
            if (isGameOver()){
                cheat()
                message.channel.send(`Game over. I win again. LOSER :sunglasses:`)
                printGame(message)
                resetGame()
                return
            } else {
                pTurn = !pTurn
                putVal(message, botResponse())
            }
        } else {
            game[num] = bVal
            if (isGameOver()){
                message.channel.send(`Game over. I win again. LOSER :sunglasses:`)
                printGame(message)
                resetGame()
                return
            } else {
                pTurn = !pTurn
                printGame(message)
            }
        }
    }
}


function botResponse(){
    // Same as in findCheat(), however, we don't override the player's tiles
    for (let i = 0; i < winStates.length; i++){
        if (game[winStates[i][0]] == bVal && game[winStates[i][1]] == bVal && game[winStates[i][2]] == defVal){
            return winStates[i][2]
        } else if (game[winStates[i][1]] == bVal && game[winStates[i][2]] == bVal && game[winStates[i][0]] == defVal){
            return winStates[i][0]
        } else if (game[winStates[i][0]] == bVal && game[winStates[i][2]] == bVal && game[winStates[i][1]] == defVal){
            return winStates[i][1]
        } else if (game[4] == defVal){
            return 4    // The middle tile
        }
    }

    let remVal = getRemVal()
    let x = Math.floor(Math.random() * remVal.length)
    return remVal[x]
}


// Returns remaining available tiles
function getRemVal(){
    let remVal = []
    for (let i = 0; i < game.length; i++){
        if (game[i] == defVal){
            remVal.push(i)
        }
    }
    return remVal
}


function isGameOver(){
    if (getRemVal().length == 0){
        return true
    } else {
        for (let i = 0; i < winStates.length; i++){
            if (game[winStates[i][0]] != defVal){
                if ((game[winStates[i][0]] == game[winStates[i][1]] && game[winStates[i][1]] == game[winStates[i][2]])){
                    return true
                }
            }
        }
    }

    return false
}


function cheat(){
    let pCount = 0
    // Plan A: shortest path to a win - if just missing one tile
    for (let i = 0; i < winStates.length; i++){
        if (game[winStates[i][0]] == bVal && game[winStates[i][1]] == bVal){
            game[winStates[i][2]] = bVal
            cleanUp(i)
            return
        } else if (game[winStates[i][1]] == bVal && game[winStates[i][2]] == bVal){
            game[winStates[i][0]] = bVal
            cleanUp(i)
            return
        } else if (game[winStates[i][0]] == bVal && game[winStates[i][2]] == bVal){
            game[winStates[i][1]] = bVal
            cleanUp(i)
            return
        }
    }

    // Plan B: pick a random win configuration and force it
    // Check if player won - copy-paste from isGameOver(), but specific for the player
    let winIdx = Math.floor(Math.random() * winStates.length)
    for (let i = 0; i < 3; i++){
        if (game[winStates[winIdx][i]] == pVal){
            pCount++
        }
        game[winStates[winIdx][i]] = bVal
    }

    cleanUp(winIdx, pCount)

    return
}


// Make cheat bot seems slightly less unfair
function cleanUp(winIdx, c = 2){
    for (let i = 0; i < game.length; i++){
        if (!winStates[winIdx].includes(i) && c > 0){
            game[i] = pVal
            c--
        }
    }

    for (let i = 0; i < winStates.length; i++){
        if (game[winStates[i][0]] == pVal && game[winStates[i][1]] == pVal && game[winStates[i][2]] == pVal){
            let x = Math.floor(Math.random() * winStates[i].length)
            game[winStates[i][x]] = defVal
        }
    }

    return
}


client.login(token)