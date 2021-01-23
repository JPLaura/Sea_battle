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
    const ShipArray = [
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
        }
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
        let ranomStart = Math.floor(Math.random()) * computerSquares.length - (ship.direction[0].length * direction)




        // checks is ship div taken or not
        const isTaken = corrent.some(index => computerSquares[randomStart + index].classList.add('taken', ship.name))
    }
})
