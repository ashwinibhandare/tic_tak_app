import React from 'react';
import Square from './Square';
import { useState } from 'react';
import { calculateWinner } from '../helper';

const Board = () => {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [stepNumber, setStepNumber] = useState(0);
    const [xActive, setXActive] = useState(true);
    const winner = calculateWinner(history[stepNumber]);

    const handleclick = (key) => {
        const timeInHistory = history.slice(0, stepNumber + 1);
        const current = timeInHistory[stepNumber];
        const squares = { ...current };
        if (winner || squares[key]) return;

        if (xActive) {
            squares[key] = 'X';
            setXActive(false);
        } else {
            squares[key] = 'O';
            setXActive(true);
        }
        setHistory([...timeInHistory, squares]);
        setStepNumber(timeInHistory.length);
    }

    const jumpToMove = (step) => {
        setStepNumber(step);
        setXActive(step % 2 == 0);
    }

    return <>

        {
            Object.keys(history[stepNumber]).map(function (key, index) {
                return key % 3 === 0 ?
                    (<span key={key}><br /><Square onClick={() => handleclick(key)} value={history[stepNumber][key]} /></span>)
                    : <span key={key}><Square onClick={() => handleclick(key)} value={history[stepNumber][key]} /></span>
            })
        }
        <li>{winner ? "Winner: " + winner : "Next Player: " + (xActive ? "X" : "O")}</li>

        {
            history.map((_step, move) => {
                const destination = move ? `Go to move ${move}` : `Go to start`;
                return (
                    <li key={move}>
                        <button onClick={() => jumpToMove(move)}>{destination}</button>
                    </li>
                )
            })
        }
    </>
};

export default Board;
