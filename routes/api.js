'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {

  let sudokuSolver = new SudokuSolver();

  app.post('/api/solve',(req, res) => {
      try {
        if (!req.body.puzzle) throw new Error('Required field missing')

        sudokuSolver.build(req.body.puzzle);
        const solution =sudokuSolver.solve(); 
        if (!solution) throw new Error('Puzzle cannot be solved')

        res.json({ solution });
      } catch (error) {
        return res.json({ error: error.message });
      }

    });

  app.post('/api/check',(req, res) => {
      try {
        const { puzzle, coordinate, value } = req.body;
        if (!puzzle || !coordinate || !value) throw new Error('Required field(s) missing');

        sudokuSolver.build(puzzle);
        const check = sudokuSolver.checkCoordinatePlacement(coordinate, value);
        res.json({ ...check });
      } catch (error) {
        return res.json({ error: error.message });
      }
    })
}