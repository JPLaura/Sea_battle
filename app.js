// makes sure that all html is loaded
document.addEventListener('DOMContentLoaded', () => {

    // takes grids from html, brings it to js and saves it to variable
    const userGrid = document.querySelector('.grid-user')
    const computerGrid = document.querySelector('.grid-computer')
    const displayGrid = document.querySelector('.grid-display')
    const ship = document.querySelectorAll('.ship')
    const destroyer = document.querySelector('.destroyer-container')
    const submarine = document.querySelector('.submarine-container')
    const cruiser = document.querySelector('.cruiser-container')
    const battleship = document.querySelector('.battleship-container')
    const carrier = document.querySelector('.carrier-container')
    const StartButton = document.querySelector('#start')
    const rotateButton = document.querySelector('#rotate')
    const turnDisplay = document.querySelector('#whose-go')
    const infoDisplay = document.querySelector('#info')

    // div width what be using
    const width = 10
    // these hold divs (square)
    const userSquares = []
    const computerSquares = []

    // i added this bc then it will be easier to rotate ships
    let isHorizontal = true


    // create board
    function createBoard(grid, squares, width) {
        // generates divs with the same for loop as in teachers code
        for (let i = 0; i < width * width; i++) {
            const square = document.createElement('div')
            // adds divs (square) id of i
            square.dataset.id = i
            // putting divs (square) in userGrid
            grid.appendChild(square)
            // pushes divs (square) to userSquares
            // userSquares is for keeping track of divs (square)
            squares.push(square)
        }
    }
    // parameters from inside of createBoard and from previous variables (line 5 and 21)
    createBoard(userGrid, userSquares, width)
    // parameters from inside of createBoard and from previous variables (line 6 and 22)
    createBoard(computerGrid, computerSquares, width)

    // SHIPS
    const shipArray = [
        {
            name: 'destroyer',
            directions: [
                // HOW WOULD horisontal ship would look like (0, 1.. is like div ids)
                [0, 1],
                // HOW WOULD vertical ship would look like (0, width... is like div ids)
                // 'width' is always 10 bc of line 20
                // So ship would be in divs 0 and 10
                [0, width]
            ]
        },
        {
            name: 'submarine',
            directions: [
                // go back to line 50 for explanation
                [0, 1, 2],
                //  go back to line 52 for explanation
                // div ids would be 0, 10, 20
                [0, width, width * 2]
            ]
        },
        {
            name: 'cruiser',
            directions: [
                // go back to line 50 for explanation
                [0, 1, 2],
                //  go back to line 52 for explanation
                // div ids would be 0, 10, 20
                [0, width, width * 2]
            ]
        },
        {
            name: 'battleship',
            directions: [
                // go back to line 50 for explanation
                [0, 1, 2, 3],
                //  go back to line 52 for explanation
                // div ids would be 0, 10, 20...
                [0, width, width * 2, width * 3]
            ]
        },
        {
            name: 'carrier',
            directions: [
                // go back to line 50 for explanation
                [0, 1, 2, 3, 4],
                //  go back to line 52 for explanation
                // div ids would be 0, 10, 20...
                [0, width, width * 2, width * 3, width * 4]
            ]
        },
    ]




    // draw  computers ships in radom location

    function generate(ship) {
        // ship.directions.length: takes ship directions line 49 (horisontal or vertical)
        // Math.random(): random number
        // Math.floor: rounds a number
        // randoDirection can olny be 0 or 1 bc theres only 2 directions
        let randomDirection = Math.floor(Math.random() * ship.directions.length)
        // choosing the directions
        let current = ship.directions[randomDirection]

        // so we could show it on grid
        if (randomDirection == 0) direction = 1
        if (randomDirection == 1) direction = 10

        // random square on computerSquares with max length of 100
        // 100 bc theres 100 divs in grid-computer
        // ship.direction[0].length * direction bc ship woud not appear outside of the box
        // Math.abs returns absolute  value
        let randomStart = Math.abs(Math.floor(Math.random() * computerSquares.length - (ship.directions[0].length * direction)))




        // checks is ship div taken or not
        // corrent.some checks if some of the squares are not taken
        // in computerSquares takes random number and checks if any indexs has taken
        // if there is taken then isTaken = true
        const isTaken = current.some(index => computerSquares[randomStart + index].classList.contains('taken'))

        // checks if some of the ship square are in div with id 9 (if div id ends with 9 then its at right edge)
        const isAtRightEdge = current.some(index => (randomStart + index) % width === width - 1)
        // checks if dev id ends with 0
        const isAtLeftEdge = current.some(index => (randomStart + index) % width === 0)

        // ! : is not
        // .index Search for a given element
        // checks if its not isTaken, isAtLeftEdge or isAtRightEdge
        // then for current element takes randomStart and adds 'taken' and takes shipname in computerSquares (line 48)
        // randomStart: line 121
        if (!isTaken && !isAtRightEdge && !isAtLeftEdge) current.forEach(index => computerSquares[randomStart + index].classList.add('taken', ship.name))
        // generates new ship until we can we tag 'taken'
        else generate(ship)
    }

    console.log(shipArray)

    generate(shipArray[0])
    generate(shipArray[1])
    generate(shipArray[2])
    generate(shipArray[3])
    generate(shipArray[4])

    // rotate the ships
    function rotate() {
        if (isHorizontal == true) {
            // makes ships Horizontal if button is pressed
            // destroyer-container-vertical is in css
            destroyer.classList.toggle('destroyer-container-vertical')
            submarine.classList.toggle('submarine-container-vertical')
            cruiser.classList.toggle('cruiser-container-vertical')
            battleship.classList.toggle('battleship-container-vertical')
            carrier.classList.toggle('carrier-container-vertical')
            isHorizontal = false
            console.log(isHorizontal)
            return
        }
        if (!isHorizontal) {
            // makes ships vertical if button is pressed
            destroyer.classList.toggle('destroyer-container-vertical')
            submarine.classList.toggle('submarine-container-vertical')
            cruiser.classList.toggle('cruiser-container-vertical')
            battleship.classList.toggle('battleship-container-vertical')
            carrier.classList.toggle('carrier-container-vertical')
            isHorizontal = true
            console.log(isHorizontal)
            return
        }
    }
    // takes button called and adds EventListener
    // if button is clicked then it will trigger rotate function
    rotateButton.addEventListener('click', rotate)

    // drag user ship

    // i brought up those variable bc it would be easier to reuse them if needed
    // you can find what the do at
    // line 204
    let selectedShipNameWithIndex
    // line 214
    let draggedShip
    // line 215
    let draggedSipLength





    // adds mousedown EventListener for every user draggable ship
    ship.forEach(ship => ship.addEventListener('mousedown', (event) => {
        // if it detects mousedown then it will add its ships id to selectedShipNameWithIndex
        selectedShipNameWithIndex = event.target.id
        console.log(selectedShipNameWithIndex)
    }))


    function dragStart(event) {
        console.log(event.target)
        // even in this function is dragStart
        draggedShip = event.target
        draggedSipLength = draggedShip.childNodes.length
        console.log(draggedShip)
        console.log(draggedSipLength, '')

    }
    function dragOver(event) {
        event.preventDefault()
    }
    function dragEnter(event) {
        event.preventDefault()
    }
    function dragLeave() {
        console.log('dragLeave')
    }
    function dragDrop(event) {
        // takes lastChild (last index & div) id
        let shipNameWithLastId = draggedShip.lastChild.id
        // .slice(0, -2) removes last 2  letters and leaves only the shipClass (ship name)
        let shipClass = shipNameWithLastId.slice(0, -2)
        console.log(shipClass)
        // .substr(-1) takes the last letter from shipNameWithLastId (last letter is ships length)
        // shipNameWithLastId.substr(-1) will return string but i need to make it as int so i could add it to index
        let lastShipIndex = parseInt(shipNameWithLastId.substr(-1))
        console.log(lastShipIndex, 'lastShipIndex')
        // checks where the last ship div will be
        // lastShipIndex is still ships length and event.target.dataset.id takes gameboard id where your mouse last was
        let shipLastId = lastShipIndex + parseInt(event.target.dataset.id)
        console.log(shipLastId, 'where the last index will be')
        console.log(parseInt(event.target.dataset.id), 'mouse last ID on gameboard ')
    }
    function dragEnd(event) {

    }





    // for each ship it adds addEventListener and it listens dragstart event
    // all drags are js events
    ship.forEach(ship => ship.addEventListener('dragstart', dragStart))
    // same thing with ship but this time its userSquares
    userSquares.forEach(square => square.addEventListener('dragstart', dragStart))
    userSquares.forEach(square => square.addEventListener('dragover', dragOver))
    userSquares.forEach(square => square.addEventListener('dragenter', dragEnter))
    userSquares.forEach(square => square.addEventListener('dragleave', dragLeave))
    userSquares.forEach(square => square.addEventListener('drop', dragDrop))
    userSquares.forEach(square => square.addEventListener('dragend', dragEnd))
})
