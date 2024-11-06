import React, { useState, useEffect } from 'react';
import Cell from '../Cell/Cell'
import ResetButton from '../ResetButton/ResetButton';
import styles from './Board.module.css';
import Button from '@mui/material/Button';

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
    const [winningCombination, setWinningCombination] = useState<number[] | null>(null);
    const [winner, setWinner] = useState<CellValue | null>(null);
    const [isDraw, setIsDraw] = useState<boolean>(false);

    const computerSymbol = userIsX === true ? 'O' : 'X';
    const userSymbol = userIsX === true ? 'X' : 'O';


    const checkWinner = (board: CellValue[]) => {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        return null;
    };


    const checkDraw = (board: CellValue[]) => {
        return board.every(cell => cell !== null);
    };

    const handlePlayerChoice = (isX: boolean) => {
        setUserIsX(isX);
        setIsXNext(true);
        setGameStarted(true);
    };

    const handleClick = (index: number) => {
        if (!cells[index] && !winner && gameStarted && (isXNext === (userSymbol === 'X'))) {
            const newCells = [...cells];
            newCells[index] = userSymbol;
            setCells(newCells);
            setIsXNext(!isXNext);
        }
    };

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
        const result = checkWinner(cells);
        if (result) {
            setWinner(result);
            const winningCombo = winningCombinations.find(([a, b, c]) =>
                cells[a] === result && cells[b] === result && cells[c] === result
            );
            if (winningCombo) setWinningCombination(winningCombo);
        } else if (checkDraw(cells)) {
            setIsDraw(true);
        }
    }, [cells]);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (gameStarted && !winner && (isXNext !== (userSymbol === 'X'))) {
            timer = setTimeout(() => {
                computerMove();
            }, 700);
        }

        return () => clearTimeout(timer);
    }, [isXNext, gameStarted, cells, winner, userSymbol]);

    const status = winner
        ? `The winner is: ${winner}`
        : isDraw
            ? `No winner. It's a draw!`
            : `Next move: ${isXNext ? 'X' : 'O'}`;

    const resetGame = () => {
        setCells(Array(9).fill(null));
        setIsXNext(true);
        setGameStarted(false);
        setUserIsX(null);
        setWinner(null);
        setWinningCombination(null);
        setIsDraw(false);
    };

    return (
        <div className={styles.board}>
            {!gameStarted ? (
                <div className={styles.choiceScreen}>
                    <h1>Hey! This is Tic-Tac-Toe</h1>
                    <span>Choose your side</span>
                    <div className={styles.buttons}>
                        <Button variant="contained" color="primary" onClick={() => handlePlayerChoice(true)}>
                            X
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={() => handlePlayerChoice(false)}>
                            O
                        </Button>
                    </div>
                </div>
            ) : (
                <>
                    <div className={styles.status}>{status}</div>
                    <div className={styles.boardGrid}>
                        {cells.map((value, index) => (
                            <Cell
                                key={index}
                                value={value}
                                onClick={() => handleClick(index)}
                                isWinningCell={winningCombination?.includes(index)}
                                className={`${styles.cell} ${winningCombination?.includes(index) ? styles.winningCell : ''}`}
                            />
                        ))}
                    </div>
                    <ResetButton onClick={resetGame} />
                </>
            )}
        </div>
    );
};

export default Board;
