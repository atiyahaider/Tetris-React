import { useState, useEffect } from 'react';
import { LEVEL_CHANGE } from '../constants';

const useGameStats = (rowsCleared, rowsClearedChanged) => {
    const [level, setLevel] = useState(0);
    const [score, setScore] = useState(0);
    const [rows, setRows] = useState(0);

    useEffect(() => {
        const calculateScore = (rowsCleared) => {
            const linePoints = [40, 100, 300, 1200];

            let tempRows = rowsCleared;
            let tempScore = 0;
            while (tempRows > 4) {  //if more than 4 rows cleared
                tempScore += linePoints[3] * (level + 1);    
                tempRows -= 4;
            }
            setScore(prev => prev + tempScore + (linePoints[tempRows - 1] * (level + 1)));
    
            // Increase level when player has cleared 10 rows
            if (rows + rowsCleared >= (level + 1) * LEVEL_CHANGE) 
                setLevel(prev => prev + 1);

            setRows(prev => prev + rowsCleared);
        }

        if (rowsCleared !== 0) 
            calculateScore(rowsCleared);

    }, [rowsClearedChanged, rowsCleared]);

    const resetGameStats = () => {
        setLevel(0);
        setScore(0);
        setRows(0);
    }

    const updateScore = (newScore) => {
        setScore(prev => prev + newScore);
    }

    return [level, score, rows, resetGameStats, updateScore];
}

export default useGameStats;