import { useState, useCallback } from 'react';
import { randomTetromino } from '../tetrominos';
import { START_ROW, START_COL } from '../constants';

const useCurrentTetromino = () => {
    const [currentTetromino, setCurrentTetromino] = useState({
                                                        shape: [],
                                                        rowPos: 0,
                                                        colPos: 0,
                                                        collided: false
                                                    });

    const [nextTetromino, setnextTetromino] = useState(randomTetromino());

    const updateTetrominoPos = (newX, newY, collided) => {
        setCurrentTetromino( prevState => ({
                                ...prevState, 
                                rowPos: prevState.rowPos + newX,
                                colPos: prevState.colPos + newY,
                                collided
                            })  
        )
    }
                                                
    const updateTetrominoShape = (newShape) => {
        setCurrentTetromino( prevState => ({
                                ...prevState, 
                                shape: newShape
                            })  
        )
    }

    const getNextTetromino = useCallback(() => {
        setCurrentTetromino({
                            shape: nextTetromino,
                            rowPos: START_ROW,// - nextTetromino.length + 1,
                            colPos: START_COL,
                            collided: false
        })
        
        setnextTetromino(randomTetromino())
    }, [nextTetromino])

    const resetCurrentTetromino = () => {
        let rand = randomTetromino();
        setCurrentTetromino({
                    shape: rand,
                    rowPos: START_ROW,// - rand.length + 1,
                    colPos: START_COL,
                    collided: false
        })

        setnextTetromino(randomTetromino())
    }

    return [currentTetromino, nextTetromino, updateTetrominoPos, updateTetrominoShape, getNextTetromino, resetCurrentTetromino];
}

export default useCurrentTetromino;
