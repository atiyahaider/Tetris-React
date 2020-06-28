import { useState, useEffect } from 'react';
import { HEIGHT, WIDTH } from '../constants';

const useBoard = (curTetromino, getNextTetromino, nextTetromino) => {
    const clearBoard = () => {
        return Array(HEIGHT).fill().map(() => Array(WIDTH).fill([0, '']));
    }

    const [board, setBoard] = useState(clearBoard);
    const [rowsCleared, setRowsCleared] = useState(0);
    const [rowsClearedChanged, setRowsClearedChanged] = useState(0);
    const [tetris, setTetris] = useState(false);

    useEffect(() => {
        const drawTetromino = (prevBoard) => {
            //clear the previous position of the current tetromino
            let boardCopy = prevBoard.map(row => row.map(cell => cell[1] === '' ? [0, ''] : cell));

            for (let i = 0; i < curTetromino.shape.length; i++) {
                for (let j = 0; j < curTetromino.shape[i].length; j++) {
                    if (curTetromino.shape[i][j] !== 0) {
                        boardCopy[i + curTetromino.rowPos][j + curTetromino.colPos] = [curTetromino.shape[i][j], curTetromino.collided ? 'taken' : ''];
                    }
                }
            }

            if (curTetromino.collided) {
                boardCopy = clearRows(boardCopy);       //sweep completed rows
                if (nextTetromino.length <= curTetromino.rowPos - rowsCleared) //check if not Game Over
                    getNextTetromino();
            }

            return boardCopy;
        }

        setBoard(prevBoard => drawTetromino(prevBoard));

    }, [curTetromino, getNextTetromino, nextTetromino, rowsCleared]);

    const resetBoard = () => {
        setBoard(clearBoard());
        setRowsCleared(0);
        setRowsClearedChanged(0);
        setTetris(false);
    }

    const clearRows = (board) => {
        let rows = 0;
        let boardCopy = board.reduce((resultArr, row) => {
                        if (row.every(e => e[0] !== 0)) {                  //if the row has all non-zero values
                            rows++;
                            resultArr.unshift(Array(WIDTH).fill([0, '']));    //add a new empty row on the top
                            return resultArr;
                        }
                        resultArr.push(row);        //else push the incomplete row in the result
                        return resultArr
                    }, []);

        setRowsCleared(rows);
        if (rows >= 4)
            setTetris(true);
        else
            setTetris(false);

        //added rowsClearedChanged to force render when any row has cleared
        if (rows > 0) 
            setRowsClearedChanged(prev => prev + 1);

        return boardCopy;
    }

    const validMove = (tetromino, newX, newY) => {
        for (let i = 0; i < tetromino.shape.length; i++) {
            for (let j = 0; j < tetromino.shape[i].length; j++) {
                if (tetromino.shape[i][j] !== 0) {
                    if (
                        //check if the move is beyond the bottom of the board
                        (i + tetromino.rowPos + newX > HEIGHT - 1) ||
                        //or if the move is beyond the width of the board
                        (j + tetromino.colPos + newY < 0) || (j + tetromino.colPos + newY > WIDTH - 1)  ||
                        //or if the cell is already occupied
                        board[i + tetromino.rowPos + newX][j + tetromino.colPos + newY][1] === 'taken'
                       )
                       {
                            return false;   //move not valid
                       }
                }
            }
        }

        //valid move
        return true; 
    }

    return [board, resetBoard, validMove, rowsCleared, tetris, rowsClearedChanged];
}

export default useBoard;