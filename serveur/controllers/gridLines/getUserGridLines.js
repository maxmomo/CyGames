const db = require("../../config/database");

const getUserGridLines = async (req, res) => {
    const params = req.query;
    const grid_id = params['grid_id'];
    const user_id = params['user_id'];

    // Mapping function to calculate row and col based on index
    const calculateRowCol = (index) => {
        return {
            row: Math.floor((index - 1) / 3),
            col: (index - 1) % 3
        };
    };

    try {
        const lines = await db.query(
            "SELECT ri.*, ugl.index, ugl.correct, ug.awarded " +
            "FROM usersgridslines ugl " +
            "JOIN riders ri ON ri.id = ugl.riderId " +
            "JOIN usersgrids ug ON ug.userId = ugl.userId AND ug.gridId = ugl.gridId " +
            "WHERE " +
            "ugl.gridId = :grid_id AND " +
            "ugl.userId = :user_id",
            {
                type: db.SELECT,
                replacements: { 
                    grid_id: grid_id,
                    user_id: user_id,
                },
            }
        );

        // Modify each line to include the row and col fields
        const modifiedLines = lines[0].map(line => {
            const { row, col } = calculateRowCol(line.index);
            return {
                ...line,
                row: row,
                col: col
            };
        });

        // Initialize a 3x3 grid
        const grid = [[], [], []];

        // Populate the grid with the results
        modifiedLines.forEach(line => {
            const { row, col } = calculateRowCol(line.index);
            grid[row][col] = line;
        });

        res.json(grid);
    } catch (error) {
        throw error;
    }
};

module.exports = { getUserGridLines };