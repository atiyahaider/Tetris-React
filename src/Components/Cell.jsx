import React from 'react';
import { TETROMINOS } from '../tetrominos';

const Cell = ({ value }) => {
    let color = TETROMINOS[value].color;
    const style = {
        border: value === 0 ? '0px solid' : '5px solid',
        backgroundColor: 'hsl(' + color[0] + ', ' + color[1] + '%, ' + (value !== 0 ? '55' : '0') + '%)',
        borderTopColor: 'hsl(' + color[0] + ', ' + color[1] + '%, 30%)',
        borderRightColor: 'hsl(' + color[0] + ', ' + color[1] + '%, 35%)',
        borderBottomColor: 'hsl(' + color[0] + ', ' + color[1] + '%, 67%)',
        borderLeftColor: 'hsl(' + color[0] + ', ' + color[1] + '%, 45%)'
    };

    return (  
        <div className='cell' style={style}></div>
    );
}
 
export default React.memo(Cell);