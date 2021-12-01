document.addEventListener('DOMContentLoaded', () => {
  const squares = document.querySelectorAll('.grid div')
  const scoreDisplay = document.getElementById('score')
  let score = 0
  let currentShooterIdx = 202
  let currentInvaderIdx = 0
  let invadersDefeated = []
  let width = 15
  let invaderDirection = 1
  let moveInterval
  const invaders = [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
      15,16,17,18,19,20,21,22,23,24,
      30,31,32,33,34,35,36,37,38,39
    ]
  //draw invaders at starting positions
  invaders.forEach( invader => squares[currentInvaderIdx + invader].classList.add('invader'))

  //draw shooter at starting position
  squares[currentShooterIdx].classList.add('shooter');

  //move shooter along a line
  function moveShooter(e) {
    squares[currentShooterIdx].classList.remove('shooter')
    
    if((e.keyCode === 37 || this.id === "left-btn") && currentShooterIdx % width !==0) {
      currentShooterIdx -= 1
    } else if ((e.keyCode === 39 || this.id === "right-btn") && currentShooterIdx % width < width - 1) {
      currentShooterIdx += 1
    }
    
    squares[currentShooterIdx].classList.add('shooter')

  }
  document.addEventListener('keydown', moveShooter)

  //move invaders according to current direction
  function moveInvaders() {

    const leftEdge = invaders[0] % width === 0
    const rightEdge = invaders[invaders.length - 1] % width === width - 1

    if ((leftEdge && invaderDirection === -1) || (rightEdge && invaderDirection === 1)) {
      invaderDirection = width
    } else if (invaderDirection === width) {
      if (leftEdge) {
        invaderDirection = 1
      } else
      invaderDirection = -1
    }
    for(let i = 0; i < invaders.length; i++) {
      squares[invaders[i]].classList.remove('invader')
    }
    for(let i = 0; i < invaders.length; i++) {
      invaders[i] += invaderDirection
    }
    for(let i = 0; i < invaders.length; i++) {
      if(!invadersDefeated.includes(i)) {
        squares[invaders[i]].classList.add('invader')
      }
    }

    //check for collision with shooter
    if(squares[currentShooterIdx].classList.contains('invader')) {
      scoreDisplay.textContent = "Game Over"
      squares[currentShooterIdx].classList.add('boom')
      clearInterval(moveInterval)
      haltShooter()
    }
  
    //check for invaders reaching bottom of grid
    for(let i = 0 ; i < invaders.length; i++) {
      if(invaders[i] > squares.length - (width - 1)) {
        scoreDisplay.textContent = "Game Over"
        clearInterval(moveInterval)
        haltShooter()
      }
    }

    //check for win
    if(invadersDefeated.length === invaders.length) {
      scoreDisplay.textContent = "You Win!"
      clearInterval(moveInterval)
    }
  }

  function haltShooter() {
    document.removeEventListener('keydown', shoot)
    document.removeEventListener('keydown', moveShooter)
  }

  moveInterval = setInterval(moveInvaders, 500) 

  //shoot the laser
  function shoot(e) {
    let laserInterval
    let laserIndex = currentShooterIdx
    if(e.keyCode === 32 || this.id === "fire-btn") {
      laserInterval = setInterval(moveLaser, 100)
    }

    function moveLaser() {
      squares[laserIndex].classList.remove('laser')
      laserIndex -= width
      squares[laserIndex].classList.add('laser')
  
      //check for hit
      if (squares[laserIndex].classList.contains('invader')) {
        squares[laserIndex].classList.remove('invader') 
        squares[laserIndex].classList.remove('laser')
        squares[laserIndex].classList.add('boom')
        setTimeout( () => {
          squares[laserIndex].classList.remove('boom')
        }, 250)
        clearInterval(laserInterval) 
        const invaderDefeated = invaders.indexOf(laserIndex)
        invadersDefeated.push(invaderDefeated)
        score++
        scoreDisplay.textContent = score 
      }

      if(laserIndex < width) {
        clearInterval(laserInterval)
        setTimeout( () => squares[laserIndex].classList.remove('laser'), 100)
      }

    }

    
  }

  document.addEventListener('keydown', shoot)

  leftBtn = document.getElementById('left-btn')
  rightBtn = document.getElementById('right-btn')
  refreshBtn = document.getElementById('restart-btn')
  fireBtn = document.getElementById('fire-btn')

  leftBtn.addEventListener('click', moveShooter)
  rightBtn.addEventListener('click', moveShooter)
  refreshBtn.addEventListener('click', () => {
    window.location.href = window.location.href
  })
  fireBtn.addEventListener('click', shoot)
  


})