document.addEventListener('DOMContentLoaded', () => {
  const squares = document.querySelectorAll('.grid div')
  const scoreDisplay = document.getElementById('score')
  let score = 0
  let currentShooterIdx = 202
  let currentInvaderIdx = 0
  let laserIndex
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
    
    if(e.keyCode === 37 && currentShooterIdx % width !==0) {
      currentShooterIdx -= 1
    } else if (e.keyCode === 39 && currentShooterIdx % width < width - 1) {
      currentShooterIdx += 1
    }
    
    squares[currentShooterIdx].classList.add('shooter')

  }
  document.addEventListener('keydown', moveShooter)

  //move invaders according to current direction
  function moveInvaders() {
    // for(let i = 0; i<invaders.length; i++) {
    //   squares[invaders[i]].classList.remove('invader')
    //   // if (invaders[0] % width === 0 && direction === -1) {
    //   //   direction = width
    //   // }
    //   invaders[i] += invaderDirection
    // }
    // currentInvaderIdx = invaders[0]
    // drawInvaders()

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
    for(i in invaders) {
      squares[invaders[i]].classList.remove('invader')
    }
    for(i in invaders) {
      invaders[i] += invaderDirection
    }
    for(i in invaders) {
      squares[invaders[i]].classList.add('invader')
    }
  }

  moveInterval = setInterval(moveInvaders, 100) 

})