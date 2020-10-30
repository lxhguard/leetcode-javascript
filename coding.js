/**
 * @param {number[][]} grid
 * @return {number}
 */
var islandPerimeter = function(grid) {
    const outOfGrid = (grid, row ,column) => 0 <= row && row < grid.length && 0 <= column && column < grid[0].length;
    const DFS = (grid, row ,column) => {
        if (outOfGrid(grid, row ,column)) return 1;
        if (grid[row][column] === 0) return 1;
        if (grid[row][column] !== 1) return 0;
        grid[r][c] = 2;
        return DFS(grid, row - 1, column)
            + DFS(grid, row + 1, column)
            + DFS(grid, row, column - 1)
            + DFS(grid, row, column + 1);
    }
    for (let row = 0; row < grid.length; row++) {
        for (let column = 0; column < grid[0].length; column++) {
            if (grid[row][column] == 1) {
                // 题目限制只有一个岛屿，计算一个即可
                return DFS(grid, row, column);
            }
        }
    }
    return 0;
};


let params = [[0,1,0,0],[1,1,1,0],[0,1,0,0],[1,1,0,0]];
let result = islandPerimeter(params);
console.log(result);