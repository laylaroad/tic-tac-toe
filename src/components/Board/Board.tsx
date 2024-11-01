import React, { useState, useEffect } from 'react';
import Cell from '../Cell/Cell'
import ResetButton from '../ResetButton/ResetButton';
import styles from './Board.module.css';


type CellValue = 'X' | 'O' | null;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const Board: React.FC = () => {
    const [cells, setCells] = useState<CellValue[]>(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState<boolean>(true);
    const [gameStarted, setGameStarted] = useState(false);
    const [userIsX, setUserIsX] = useState<boolean | null>(null);
    const computerSymbol = userIsX === true ? 'O' : 'X';
    const userSymbol = userIsX === true ? 'X' : 'O';

    const checkWinner = (squares: CellValue[]): CellValue | null => {
        for (let i = 0; i < winningCombinations.length; i++) {
            const [a, b, c] = winningCombinations[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    };

    const handlePlayerChoice = (isX: boolean) => {
        setUserIsX(isX);
        setIsXNext(isX);
        setGameStarted(true);
    };

    const handleClick = (index: number) => {
        if (!cells[index] && !checkWinner(cells) && gameStarted && (isXNext === (userSymbol === 'X'))) {
            const newCells = [...cells];
            newCells[index] = userSymbol;
            setCells(newCells);
            setIsXNext(!isXNext);
        }
    };

    // функция для нахождения лучшего хода
    const findBestMove = (): number | null => {
        for (const combo of winningCombinations) {
            const [a, b, c] = combo;
            if (cells[a] === computerSymbol && cells[b] === computerSymbol && cells[c] === null) {
                return c;
            } else if (cells[a] === computerSymbol && cells[c] === computerSymbol && cells[b] === null) {
                return b;
            } else if (cells[b] === computerSymbol && cells[c] === computerSymbol && cells[a] === null) {
                return a;
            }
        }

        for (const combo of winningCombinations) {
            const [a, b, c] = combo;
            if (cells[a] === userSymbol && cells[b] === userSymbol && cells[c] === null) {
                return c;
            } else if (cells[a] === userSymbol && cells[c] === userSymbol && cells[b] === null) {
                return b;
            } else if (cells[b] === userSymbol && cells[c] === userSymbol && cells[a] === null) {
                return a;
            }
        }

        const availableCells = cells
            .map((cell, index) => (cell === null ? index : null))
            .filter(index => index !== null) as number[];
        return availableCells.length > 0 ? availableCells[Math.floor(Math.random() * availableCells.length)] : null;
    };

    const computerMove = () => {
        const bestMove = findBestMove();
        if (bestMove !== null) {
            const newCells = [...cells];
            newCells[bestMove] = computerSymbol;
            setCells(newCells);
            setIsXNext(!isXNext);
        }
    };

    useEffect(() => {
        if (gameStarted && (isXNext !== (userSymbol === 'X')) && !checkWinner(cells)) {
            computerMove();
        }
    }, [isXNext, gameStarted, cells]);

    const winner = checkWinner(cells);
    const status = winner
        ? `Победитель: ${winner}`
        : `Следующий ход: ${isXNext ? 'X' : 'O'}`;

    const resetGame = () => {
        setCells(Array(9).fill(null));
        setIsXNext(true);
        setGameStarted(false);
        setUserIsX(null);
    };

    return (
        <div className={styles.board}>
            {!gameStarted ? (
                <div className={styles.choiceScreen}>
                    <h2>Выберите, кто будет играть за "X"</h2>
                    <button onClick={() => handlePlayerChoice(true)}>Я играю за "X"</button>
                    <button onClick={() => handlePlayerChoice(false)}>Я играю за "O"</button>
                </div>
            ) : (
                <>
                    <div className={styles.status}>{status}</div>
                    <div className={styles.boardRow}>
                        <Cell value={cells[0]} onClick={() => handleClick(0)} />
                        <Cell value={cells[1]} onClick={() => handleClick(1)} />
                        <Cell value={cells[2]} onClick={() => handleClick(2)} />
                    </div>
                    <div className={styles.boardRow}>
                        <Cell value={cells[3]} onClick={() => handleClick(3)} />
                        <Cell value={cells[4]} onClick={() => handleClick(4)} />
                        <Cell value={cells[5]} onClick={() => handleClick(5)} />
                    </div>
                    <div className={styles.boardRow}>
                        <Cell value={cells[6]} onClick={() => handleClick(6)} />
                        <Cell value={cells[7]} onClick={() => handleClick(7)} />
                        <Cell value={cells[8]} onClick={() => handleClick(8)} />
                    </div>
                    <ResetButton onClick={resetGame} />
                </>
            )}
        </div>
    );
};

export default Board;
