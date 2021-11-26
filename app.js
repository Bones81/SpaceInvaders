document.addEventListener('DOMContentLoaded', () => {
  const squares = document.querySelectorAll('.grid div')
  const scoreDisplay = document.getElementById('score')
  let score = 0
  let currentShooterIdx = 202
  let currentInvaderIdx = 0
  let invaders = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    15,16,17,18,19,20,21,22,23,24,
    30,31,32,33,34,35,36,37,38,39
  ]
  let width = 15
  let invaderDirection = 1
  let shooterDirection
  let moveInterval

  //draw invaders at starting positions
  function drawInvaders() {
    for (let i = 0; i < invaders.length; i++) {
      squares[invaders[i]].classList.add('invader')
    }
  }
  drawInvaders();

  //draw shooter at starting position
  squares[currentShooterIdx].classList.add('shooter');

  //move invaders according to current direction
  function moveInvaders() {
    for(let i = 0; i<invaders.length; i++) {
      squares[invaders[i]].classList.remove('invader')
      // if (invaders[0] % width === 0 && direction === -1) {
      //   direction = width
      // }
      invaders[i] += invaderDirection
    }
    currentInvaderIdx = invaders[0]
    drawInvaders()
  }

  // moveInterval = setInterval(moveInvaders, 1000) 

  function moveShooter(e) {
    if(e.keyCode === 37) {
      shooterDirection = -1
    } else if (e.keyCode === 39) {
      shooterDirection = 1
    }
    //hit the wall logic
    if(currentShooterIdx % width === 0 && shooterDirection === -1) {
      shooterDirection = 0
    } else if (currentShooterIdx % width === (width - 1) && shooterDirection === 1) {
      shooterDirection = 0
    } else {
      squares[currentShooterIdx].classList.remove('shooter')
      currentShooterIdx += shooterDirection
      squares[currentShooterIdx].classList.add('shooter')
    }
  }
  document.addEventListener('keydown', moveShooter)

})