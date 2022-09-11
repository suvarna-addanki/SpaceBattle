

class Ship {
    constructor(hull, firepower, accuracy){
        this.hull = hull;
        this.firepower = firepower;
        this.accuracy = accuracy;
        isDefeated: false;
    }
}
//function to randomise the numbers
function randomInt(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

//function to create alien ships with random properties
  function createAlienShip() {
    let hull = randomInt(3, 6)
    let firepower = randomInt(2, 4)
    let accuracy = (randomInt(6, 8)) / 10
    return new Ship(hull, firepower, accuracy)
    }

//creating alienarray 
  function createAlienArray(numShips) {
    let arr = []
      for (let i = 0; i < numShips; i++) {
        arr.push(createAlienShip())
      }
    return arr;
    }

//creating 6 alien ships
  let alienArray = createAlienArray(6)


  //player attacking enemy(alienArray[0]) function
function playerAttack(enemy) {
            if (Math.random() < USSHW.accuracy) {    //if the player attacks and alien dies so we shift first ship from the alienarray and move on to the next ship
                enemy.hull -= USSHW.firepower
                checkAlienStats(enemy)               //updating stats of the alien after alien was shot
                if(enemy.hull <= 0) {                //if the alien ship is shot and defeated we are immediately setting hull to zero to avoid displaying negative numbers and updating alien sats again
                    enemy.hull = 0;
                    checkAlienStats(enemy)           
                    setTimeout(() => {                 
                        alert(`You defeated the enemy! You dealt ${USSHW.firepower} damage`)
                            alienArray.shift()          //we are removing the first defeated alienship from array 
                            continueBattle(alienArray)  //continuing the battle with the next alienship
                }, '1000')
                 console.log(`You defeated the enemy! You dealt ${USSHW.firepower} damage`)       //console logging the same message                      
                }else { 
                   setTimeout(() =>{
                    alert(`Direct hit to the enemy! But still survived the attack! You dealt ${USSHW.firepower} damage`)     ///if the alien still survives afetr attack then they attack the player
                        alienAttack(enemy)                    
                   },'800')
                   console.log(`Direct hit to the enemy! But still survived the attack! You dealt ${USSHW.firepower} damage`)
                }
                                          
            }
            else {
                setTimeout(() => {
                    alert('You missed! Enemy evaded. Brace for impact')     ///if player dont hit the alien at all and miss the shot completly they attack the player
                        alienAttack(enemy)
                }, '800')
                console.log('You missed! Enemy evaded. Brace for impact')
            }
            
    }

//alien attack function
function alienAttack(hero) {
    if (Math.random() < hero.accuracy) {
        USSHW.hull -= hero.firepower
        checkPlayerStats()              //updating the stats of the player afetr the player was shot

        if(USSHW.hull <= 0){      //if the enemy attacks player and player dies
        USSHW.hull = 0;           //we are setting player's hull to zero to avoid displaying negative numbers
        checkPlayerStats()        //
            setTimeout(() => {
            alert(`Enemy dealt ${hero.firepower} damage. Your ship has been destroyed! You lost!`)
                //continueBattle()
        }, '1000')
            console.log(`Enemy dealt ${hero.firepower} damage. Your ship has been destroyed! You lost!`)
            alert("Thanks for playing the game!")
            console.log("Thanks for playing the game!")

        } 
        else {
            setTimeout(() =>{
                alert(`You have been directly hit by the enemy! But you survived! Enemy dealt ${hero.firepower} damage!`)  //if the player has been hit but still survives then player attacks again
                    playerAttack(hero)        
            }, '800')
            console.log(`You have been directly hit by the enemy! But you survived! Enemy dealt ${hero.firepower} damage!`)
            } 
    }
    else {setTimeout(() => {

                alert('Enemy missed you! Prepare to fire!')   //if alien missed the shot while attacking player then player attacks again
                     playerAttack(hero)
        }, '800')
        console.log('Enemy missed you! Prepare to fire!')
    }
}
//creating player ship
const USSHW = new Ship (20, 5, .7)

function battle(alienArray){ // in both battle and new battle functions player attacks the enemy
    playerAttack(alienArray[0])   
}

function continueBattle(){
    if(alienArray.length != 0){
        checkAlienStats(alienArray[0])
        setTimeout(() => {
            if (confirm('More enemies are on the way. Do you want to continue attacking?')){
                battle(alienArray)
            }else {
                confirm('Mission failed. There is no one left to defend the Earth!')
            }
        }, '1000')
    }else {
        alert('You defeated all the alienships! You win!')   //to do: give the user another chance to play again???
    }
}


//how to end the game
if (alienArray.length === 0 ){
    //gameover
    console.log('Mission Complete! Thanks for saving the Earth!')
}

let playerStats = document.querySelector(".playerStats")
let enemyStats = document.querySelector(".enemyStats")
 

//function to check player stats and update the DOM
function checkPlayerStats(){
    playerStats.innerHTML = `Hull: ${USSHW.hull}<br>Firepower: ${USSHW.firepower}<br>Accuracy: ${USSHW.accuracy}`
}
//function to check enemy stats and update the DOM
function checkAlienStats(enemy){
    enemyStats.innerHTML = `Hull: ${enemy.hull}<br>Firepower: ${enemy.firepower}<br>Accuracy: ${enemy.accuracy}`
}



///////////////////////////
//// Game Starts here///////


// give html time to load
setTimeout(() => {
    let startMessage = window.confirm('Earth has been attacked by a horde of aliens! You are the captain of the USS HelloWorld, on a mission to destroy every last alien ship.');
    if (startMessage) {
        startGame()
    }else {
        alert('You have doomed the Earth! Oh no! we will be invaded by aliens now!')
    }

}, '1000');
    

    


// function for starting the game
function startGame() {
    // start battle function
    if (confirm('Prepare for battle')) {
        battle(alienArray)
    }
    // else when player cancels
    else {
        confirm('You have doomed the Earth! Oh no! we will be invaded by aliens now!')
    }
}









