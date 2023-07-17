// deklarowanie danych
let grid = JSON.parse(localStorage.getItem('grid')) || [
    [0, 0, 0], 
    [0, 0, 0],
    [0, 0, 0]
];
let fields = [
    ['.js-00', '.js-01', '.js-02'], 
    ['.js-10', '.js-11', '.js-12'], 
    ['.js-20', '.js-21', '.js-22']
];
let move = localStorage.getItem('move') || 'X';
let game = localStorage.getItem('game') || true;
game = JSON.parse(game);
let endTitle = localStorage.getItem('endTitles') || '';
let endTitle2 = localStorage.getItem('endTitles2') || '';
let score = JSON.parse(localStorage.getItem('score')) || {
    X : 0,
    O : 0
};
//


// tworzenie po resecie strony
document.querySelector('.js-title')
    .innerHTML = endTitle2;

if (!game) {
    document.querySelector('.js-ending')
        .innerHTML = endTitle;
    document.querySelector('.js-ending-button')
        .addEventListener('click', () => {
            reset();
    });
}

gameMap();
//


// Zaznaczanie wartosci na mapie
function playGame(field) {
    if (grid[Number(field[0])][Number(field[1])] === 0 && game) {
        if (move === 'X') {
            move = 'O';
            grid[Number(field[0])][Number(field[1])] = 1;
        } else {
            move = 'X';
            grid[Number(field[0])][Number(field[1])] = 2;
        }

        document.querySelector('.js-title')
            .innerHTML = `'${move}' moves`;
    }

    gameMap();
    endGame();

    localStorage.setItem('game', JSON.stringify(game));
    localStorage.setItem('endTitles', document.querySelector('.js-ending')
    .innerHTML);
    localStorage.setItem('endTitles2', document.querySelector('.js-title')
    .innerHTML);
    localStorage.setItem('grid', JSON.stringify(grid));
    localStorage.setItem('move', move);
}
//


// wyswietlanie rzeczy na ekreanie (mapa, zakonczenie, reset)
function gameMap() {
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            if (grid[row][col] === 1) {
                document.querySelector(`${fields[row][col]}`)
                    .innerHTML = 'X';
            } else if (grid[row][col] === 2) {
                document.querySelector(`${fields[row][col]}`)
                    .innerHTML = 'O';
            } else {
                document.querySelector(`${fields[row][col]}`)
                    .innerHTML = '';
            }
        }
    }
    document.querySelector('.js-score-X')
        .innerHTML = `'X': ${score.X}`;
    document.querySelector('.js-score-O')
        .innerHTML = `'O': ${score.O}`;
}

function endGame() {
    if (gameLogic() === 1) {
        game = false;
        document.querySelector('.js-title')
            .innerHTML = 'Congratulations!';
        
        document.querySelector('.js-ending')
            .innerHTML = `'X' wins <button class='ending-button js-ending-button'>play again</button>`;

        document.querySelector('.js-ending-button')
                .addEventListener('click', () => {
                    reset();
            });
        
        score.X++;
    } else if (gameLogic() === 2) {
        game = false;
        document.querySelector('.js-title')
            .innerHTML = 'Congratulations!';

        document.querySelector('.js-ending')
            .innerHTML = `'O' win <button class='ending-button js-ending-button'>play again</button>`;

        document.querySelector('.js-ending-button')
            .addEventListener('click', () => {
                reset();
        });

        score.O++;
    } else if (gameLogic() === 3) {
        game = false;
        document.querySelector('.js-title')
            .innerHTML = 'Well played!';

        document.querySelector('.js-ending')
            .innerHTML = `Draw <button class='ending-button js-ending-button'>play again</button>`;

        document.querySelector('.js-ending-button')
            .addEventListener('click', () => {
                reset();
        });
    }
    document.querySelector('.js-score-X')
        .innerHTML = `'X': ${score.X}`;
    document.querySelector('.js-score-O')
        .innerHTML = `'O': ${score.O}`;
    localStorage.setItem('score', JSON.stringify(score));
}

function reset() {
    grid = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    localStorage.setItem('grid', JSON.stringify(grid));
    move = 'X'
    localStorage.setItem('move', move);
    game = true;
    document.querySelector('.js-ending')
        .innerHTML = '';
    document.querySelector('.js-title')
        .innerHTML = `'X' starts`;
    localStorage.setItem('endTitles2', document.querySelector('.js-title')
    .innerHTML)
    gameMap();
    localStorage.setItem('game', JSON.stringify(game));
}
//


// logika gry (kiedy zwyciestwo, remis, porazka)
function gameLogic() {
    for (let i = 0; i < 3; i++) {
        if (JSON.stringify(grid[i]) === '[1,1,1]' || JSON.stringify(column(grid, i)) === '[1,1,1]'|| JSON.stringify(cross(grid, i)) === '[1,1,1]') {
            return 1;
        } else if (JSON.stringify(grid[i]) === '[2,2,2]' || JSON.stringify(column(grid, i)) === '[2,2,2]' || JSON.stringify(cross(grid, i)) === '[2,2,2]') {
            return 2;
        }
    }
    let test = 0;
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            if (grid[row][col] === 0) {
                test++;
            }
        }
    }
    if (test === 0) {
        return 3;
    }
    return 0;
}

const cross = (matrix, first) => {
    let cr = [];
    if (first === 0) {
        while (first < 3) {
            cr.push(matrix[first][first]);
            first++;
        }
    } else if (first === 2) {
        let second = 0;
        while (first >= 0) {
            cr.push(matrix[first][second]);
            first--;
            second++;
        }
    }
    return cr;
}

const column = (matrix, index) => {
    let col = [];
    for (let i = 0; i < 3; i++) {
        col.push(matrix[i][index]);
    }
    return col;
}
//


// podpiecie guzikow pod plansze
document.querySelector('.js-reset')
    .addEventListener('click', () => {
        reset();
        score.X = 0;
        score.O = 0;
        document.querySelector('.js-score-X')
            .innerHTML = `'X': ${score.X}`;
        document.querySelector('.js-score-O')
            .innerHTML = `'O': ${score.O}`;
        localStorage.removeItem('score');
    });

document.querySelector('.js-00')
    .addEventListener('click', () => {
        playGame('00');
    });
document.querySelector('.js-01')
    .addEventListener('click', () => {
        playGame('01');
    });
document.querySelector('.js-02')
    .addEventListener('click', () => {
        playGame('02');
    });

document.querySelector('.js-10')
    .addEventListener('click', () => {
        playGame('10');
    });
document.querySelector('.js-11')
    .addEventListener('click', () => {
        playGame('11');
    });
document.querySelector('.js-12')
    .addEventListener('click', () => {
        playGame('12');
    });

document.querySelector('.js-20')
    .addEventListener('click', () => {
        playGame('20');
    });
document.querySelector('.js-21')
    .addEventListener('click', () => {
        playGame('21');
    });
document.querySelector('.js-22')
    .addEventListener('click', () => {
        playGame('22');
    });
//