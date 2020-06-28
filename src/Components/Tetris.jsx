import React, { useState } from 'react';
import { DROP_TIME } from '../constants';

//components
import Board from './Board';
import NextTetromino from './NextTetromino';
import GameStats from './GameStats';
import Footer from './Footer';

//hooks
import useBoard from '../Hooks/useBoard';
import useCurrentTetromino from '../Hooks/useCurrentTetromino';
import useInterval from '../Hooks/useInterval';
import useGameStats from '../Hooks/useGameStats';

const Tetris = () => {
    const [running, setRunning] = useState(false);
    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);

    const [currentTetromino, nextTetromino, updateTetrominoPos, updateTetrominoShape, getNextTetromino, resetCurrentTetromino] = useCurrentTetromino();
    const [board, resetBoard, validMove, rowsCleared, tetris, rowsClearedChanged] = useBoard(currentTetromino, getNextTetromino, nextTetromino);
    const [level, score, rows, resetGameStats] = useGameStats(rowsCleared, rowsClearedChanged);

    useInterval(() => {
        moveDown();
    }, dropTime);            

    const startPause = () => {
        if (running) {  //then pause
            setRunning(false);
            setDropTime(null);
        }
        else {  //start game
            if (gameOver) {
                resetGame();
            }
            if (currentTetromino.shape.length === 0) {
                getNextTetromino();
            }
            setRunning(true);      
            setDropTime(calculateDropTime());
        }
    }

    const calculateDropTime = () => {
        return DROP_TIME - (level * 200);
    }   

    const resetGame = () => {
        setGameOver(false);      
        resetBoard();
        resetCurrentTetromino();
        resetGameStats();      
    }

    const isGameOver = (newLength, curPos) => {
        if (newLength > curPos - rowsCleared)
            return true;
        else
            return false;
    }

    const moveHorizontal = dir => {
        if (validMove(currentTetromino, 0, dir)) 
            updateTetrominoPos(0, dir, false);
    }

    const moveDown = () => {
        if (validMove(currentTetromino, 1, 0)) 
            updateTetrominoPos(1, 0, false);
        else {  //collided
            updateTetrominoPos(0, 0, true); //mark as collided
            if (isGameOver(nextTetromino.length, currentTetromino.rowPos)) {
                setGameOver(true);
                setRunning(false);
                setDropTime(null);
            }
        }
    }

    const rotate = () => {
        let tetrominoCopy = JSON.parse(JSON.stringify(currentTetromino));

        //rotate tetromino and store new shape
        tetrominoCopy.shape = tetrominoCopy.shape[0].map((_, index) => tetrominoCopy.shape.map(row => row[index]).reverse());
        if (validMove(tetrominoCopy, 0, 0)) {
            //draw rotated shape if valid move
            updateTetrominoShape(tetrominoCopy.shape)
        }
    }

    const hardDrop = () => {
        let posX = 1;
        let originalPosX = currentTetromino.posX;
        while (validMove(currentTetromino, posX, 0)) {
            posX++;
        }
        updateTetrominoPos(posX-1, 0, true);

        if (isGameOver(nextTetromino.length, originalPosX + posX - 1)) {            
            setGameOver(true);
            setRunning(false);
            setDropTime(null);
        }
    }

    const moveTetromino = (e) => {
        if (running) {
            switch (e.keyCode) {
                case 37:   //left
                    moveHorizontal(-1);
                    break;
                case 39:   //right
                    moveHorizontal(1);
                    break;
                case 40:   //down
                    setDropTime(null);
                    moveDown();
                    break;
                case 32:   // hard drop
                    e.preventDefault(); //to stop spacebar from activating button click
                    setDropTime(null);
                    hardDrop();
                    break;
                case 38:   //up, rotate
                    rotate();
                    break;
                default:
                    return null;
            }
        }   
    }   

    const keyRelease = (e) => {
        if (running) {
            if (e.keyCode === 40 || e.keyCode === 32) {
                setDropTime(calculateDropTime());
            }
        }
    }

    return (  
        <div className='container' tabIndex='0' onKeyDown={moveTetromino} onKeyUp={keyRelease}>
            <h1 id='heading'>Tetris</h1>
            <div className='tetris'>
                <Board board={board}/>
                <div id='information'>
                    <NextTetromino tetromino={nextTetromino}/>
                    <GameStats startPause={startPause} level={level} score={score} rows={rows}/>
                    <div className='stats gameStatus'>
                        { gameOver ? 'Game Over!' :
                                    !running ? 'Press Start to continue' : 
                                    tetris ? 'Tetris!!' : 'Happy playing!'
                        }
                    </div>
                    <button onClick={startPause}>Start/Pause</button>
                </div>
            </div>
            <Footer />
        </div>
    );
}
 
export default Tetris;