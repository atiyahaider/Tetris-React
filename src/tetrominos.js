export const TETROMINOS = [
        {   shape: [0],
            color: [0, 0]
        },
        {   
            shape: [
                [0, 1, 0, 0], 
                [0, 1, 0, 0], 
                [0, 1, 0, 0], 
                [0, 1, 0, 0]
            ],
            color: [180, 100]  //cyan
        },
        {
            shape: [
                [0, 2, 0], 
                [0, 2, 0], 
                [2, 2, 0]
            ], 
            color: [220, 100]   //blue
        },
        {
            shape: [
                [0, 3, 0], 
                [0, 3, 0], 
                [0, 3, 3]
            ],
            color: [39, 100]    //orange
        },
        {
            shape: [
                [4, 4], 
                [4, 4]
            ], 
            color: [55, 100]   //yellow
        },
        {
            shape: [
                [0, 5, 5], 
                [5, 5, 0], 
                [0, 0, 0]
            ], 
            color: [120, 100]   //green
        },
        {
            shape: [
                [0, 0, 0], 
                [6, 6, 6], 
                [0, 6, 0]
            ],
            color: [300, 100]   //purple
        },
        {
            shape: [
                [7, 7, 0], 
                [0, 7, 7], 
                [0, 0, 0]
            ], 
            color: [0, 100]     //red
        }
];

export const randomTetromino = () => {
    return TETROMINOS[Math.floor(Math.random() * (TETROMINOS.length-1)) + 1].shape;
};