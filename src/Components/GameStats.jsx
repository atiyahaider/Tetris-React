import React from 'react';

const GameStats = ({ level, score, rows }) => {
    return (  
        <div className='stats'>
            <div className='statsElement'>Score: <span>{score}</span></div>
            <div className='statsElement'>Level: <span>{level}</span></div>
            <div className='statsElement'>Rows: <span>{rows}</span></div>
        </div>
    );
}
 
export default React.memo(GameStats);