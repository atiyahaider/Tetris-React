import React from 'react';
import Cell from './Cell';

const Board = ({ board }) => {
    return (  
        <div className='board'>
            {board.map((row,i) => 
                row.map((cell,j) => ( 
                    <Cell key={i+'_'+j} value={cell[0]}/>
                )) 
            )}        
        </div>

    );
}
 
export default Board;