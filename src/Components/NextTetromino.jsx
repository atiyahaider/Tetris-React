import React from 'react';
import Cell from './Cell';

const NextTetromino = ({ tetromino }) => {

    // Add extra rows/columns to center different size tetrominos in a 5x5 grid
    let tetrominoCopy = JSON.parse(JSON.stringify(tetromino));
    switch (tetromino[0].length) {
        case 2: tetromino.forEach((_, i) => {
                    tetrominoCopy[i].unshift(0);
                    tetrominoCopy[i].push(0, 0);
                });
                tetrominoCopy.unshift(Array(5).fill(0));
                tetrominoCopy.push(Array(5).fill(0))
                tetrominoCopy.push(Array(5).fill(0))
                break;
        case 3: tetromino.forEach((_, i) => {
                    tetrominoCopy[i].unshift(0);
                    tetrominoCopy[i].push(0);
                    });
                tetrominoCopy.unshift(Array(5).fill(0));
                tetrominoCopy.push(Array(5).fill(0))
                break;
        case 4: tetromino.forEach((_, i) => {
                    tetrominoCopy[i].unshift(0);
                    });
                tetrominoCopy.push(Array(5).fill(0))
                break;
        default: 
                break;
    }

    return (  
        <div id='nextTetromino'>
            {tetrominoCopy.map((row,i) => 
                row.map((value,j) => (
                    <Cell key={i+'_'+j} value={value}/>
                )) 
            )}        
        </div>
    );
}
 
export default React.memo(NextTetromino);